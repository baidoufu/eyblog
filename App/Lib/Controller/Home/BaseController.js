/**
 * Home模块Controller基类
 */
module.exports = Controller(function() {
  'use strict';
  return {
    init: function(http) { //初始化
      var self = this;
      //最新心情
      var mood = D("Moods").getNew().then(function(data) {
        self.assign("newMood", data);
      });
      //标签
      var tag = D("Tags").getList().then(function(data) {
        self.assign("tagList", data);

      });
      Promise.all([mood, tag]).then(function() {
        self.getConfig();
      });
      self.super("init", http);
    },
    getConfig:function(){
      var self=this;
        //获取配置
        var data = readFile(CONF_PATH + "/config.json");
        data = JSON.parse(data);
        self.assign("_web", data);      
    }
  }
})