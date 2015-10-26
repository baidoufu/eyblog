/**
* 系统设置控制器
* @return
*/
module.exports = Controller("Admin/BaseController", function(){
	"use strict";
	return{
		//系统设置
		indexAction:function(){
			var self=this;
			if(self.isGet()){
				self.assign("model","system");
				self.assign("action","index");
				self.display();			
			}else{
				var data=readFile(CONF_PATH + "/config.json");
				data={
					title:self.post("title"),
					keyword:self.post("keyword"),
					description:self.post("description"),
					url:self.post("url")
				}
				writeFile(CONF_PATH + "/config.json",JSON.stringify(data),function(rs){
					if(rs){	//成功
						return self.redirect("/admin/system");
					}else{		//失败
						return self.redirect("/admin/system");
					}
				});
			}
		},
		//访问限制
		bannedAction:function(){
			var self=this;
			if(self.isGet()){
				self.assign("model","system");
				self.assign("action","banned");
				self.display();
			}else{

			}
		}
	};
});