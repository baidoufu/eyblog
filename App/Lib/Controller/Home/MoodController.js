/**
 * index控制器
 */
 module.exports = Controller("Home/BaseController", function(){
 	"use strict";									//使用严格模式
 	return {
 		indexAction:function(){
 			var self=this;
 			self.assign("title","心情");
 			//获取心情列表
 			var page=self.get('page')?self.get('page'):1;
 			var data=D("Moods").getList(page);
			self.assign("list",data);
			self.display();
 		}
 	}
 });