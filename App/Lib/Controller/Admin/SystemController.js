/**
* 系统设置控制器
* @return
*/
module.exports = Controller("Admin/BaseController", function(){
	"use strict";
	return{
		indexAction:function(){
			var self=this;
			if(self.isGet()){
				self.assign("model","system");
				self.assign("action","index");
				D('web').getOne().then(function(){
					self.display();
				});				
			}else{
				var data={
					title:self.post("title"),
					keyword:self.post("keyword"),
					description:self.post("description"),
					url:self.post("url")
				}
				return D('web').where({id:1}).update(data).then(function(row){
					if(row){	//成功
						return self.redirect("/admin/system");
					}else{		//失败
						return self.redirect("/admin/system");
					}
				});
			}
		},
	};
});