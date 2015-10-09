/**
 * Home模块Controller基类
 */
module.exports = Controller(function(){
  'use strict';
  return {
    init: function(http){				//初始化
    	var self=this;
    	//获取标签
    	D('Tags').getList().then(function(data){
    		self.assign("tagList", data);
    	});
    	//获取分类
    	D('Categorys').getList().then(function(data){
    		self.assign("cateList",data);
    	});
    	//最新文章
    	D('Contents').getNew(10).then(function(data){
    		self.assign("newList",data);
    	})
      	self.super("init", http);
    },
  }
})