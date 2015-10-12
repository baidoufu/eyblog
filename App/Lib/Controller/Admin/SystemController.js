/**
* 系统设置控制器
* @return
*/
module.exports = Controller("Admin/BaseController", function(){
	"use strict";
	return{
		indexAction:function(){
			var self=this;
			self.assign("model","system");
			self.assign("action","index");
			//网站配置			
			self.display();
		},
	};
});