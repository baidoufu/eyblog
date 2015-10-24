/**
* 心情内容控制器
* @return
*/
module.exports = Controller("Admin/BaseController", function(){
	"use strict";
	return {
		addAction:function(){
			var self=this;
			if(self.isPost()){
				self.session("userInfo")
					.then(function(data){
						var datas={
							uid:data.id,
							mood:self.post("mood"),
							time:time()
						}
						if(!isEmpty(self.post('id')) && self.post('id')!="0"){
							//更新
							var rs=D('Moods').where({id:self.post('id')}).update(datas);
						}else{
							//新增
							var rs=D('Moods').add(datas);
						}						
						rs.then(function(data){
							if(data){		//成功
								return self.redirect("/admin/content/mood");
							}else{			//失败
								return self.redirect("/admin/content/mood");
							}
						});
					});
			}
		},
		getAction:function(){
			var self=this;
			var id=self.get('id');
			return D('Moods').where({id:id}).find().then(function(data){
				self.json(data);
			});
		},		
	}
});