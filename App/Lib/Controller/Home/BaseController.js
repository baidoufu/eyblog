/**
 * Home模块Controller基类
 */
module.exports = Controller(function() {
  'use strict';
  return {
    //初始化
    init: function(http) {
      var self = this;
      self.super("init", http);
      //最新心情
      var mood = D("Moods").getNew().then(function(data) {
        self.assign("newMood", data);
      });
      //标签
      var tag = D("Tags").getList().then(function(data) {
        self.assign("tagList", data);

      });
      //返回一个 promise。后续操作在此之后执行
      return Promise.all([mood, tag]).then(function() {
        self.getConfig();
      });
    },
    //获取配置
    getConfig: function() {
      var self = this;
      var data = readFile(CONF_PATH + "/config.json");
      data = JSON.parse(data);
      self.assign("_web", data);
    }
  }
})