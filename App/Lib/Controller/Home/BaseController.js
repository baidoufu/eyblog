/**
 * Home模块Controller基类
 */
module.exports = Controller(function(){
  'use strict';
  return {
    init: function(http){				//初始化
    	var self=this;
      //最新心情
      D("Moods").getNew().then(function(data){
        self.assign("newMood",data);
      });
      //标签
      D("Tags").getList().then(function(data){
        self.assign("tagList",data);
      });      
    	//网站配置
    	D("Web").getOne().then(function(data){
    		self.assign("_web",data);
    	});
      self.super("init", http);
    }
  }
})