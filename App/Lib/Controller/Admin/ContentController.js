/**
* 文章内容控制器
* @return
*/
module.exports = Controller("Admin/BaseController", function(){
	"use strict";
	return {
		indexAction: function(){		//首页
			var self=this;
			self.assign("model","content");
			self.assign("action","index");
			var page=self.get('p')?self.get('p'):1;
			return D('contents').getList({},page).then(function(data){
				self.assign("list",data);
				self.display();
			});
		},
		addAction:function(){			//添加和编辑
			var self=this;
			self.assign("model","content");
			self.assign("action","add");			
			if(self.isGet()){
				var tag=self.getTag();
				var cate=self.getCategory();
				if(self.get('id')){
					//编辑状态查询文章详情
					var content=D('Contents').getOne({'ey_contents.id':self.get('id')}).then(function(data){
						self.assign('content',data);
					});
					var promiseList=[tag,cate,content];
				}else{
					//新增状态将文章内容赋值为空
					self.assign('content',{});
					var promiseList=[tag,cate];
				}
				return Promise.all(promiseList).then(function(){
					return self.display();
				});				
			}else{
				var data={};
				data.title=self.post('title');
				data.cid=self.post('category');
				data.tid=self.post('tag');
				data.text=self.post('content');
				data.abscontent=subStr(removeTag(self.post('content')),200);
				data.status=self.post('status')||0;
				data.iscomment=self.post('iscomment')||0;
				console.log(data);
				return self.session('userInfo').then(function(user){
					data.uid=user.id;
					if(self.post('id')){
						//编辑
						var rs=D('Contents').where({id:self.post('id')}).update(data);
					}else{
						data.time=time();
						//新增
						var rs=D('Contents').add(data);
					}
					rs.then(function(insertId){
						if(insertId){
							return self.redirect("/admin/content");
						}else{
							//保存失败提示
						}
					})
					.catch(function(err){
						console.log(err);
					})
				});
			}
		},
		deleteAction:function(){		//删除
			var self=this;
			var id=self.get('id');
			var map={};
			//是否批量操作
			if(self.isPost()){
				var _post = thinkRequire('querystring').parse(self.http.payload);
				if(!isEmpty(_post.id)){
					map.id=['in',_post.id];
				}
			}else{
				map.id=id;
			}
			if(!isEmpty(map)){
				return D('contents')
				.where(map)
				.delete()
				.then(function(affectedRows){
					return self.redirect("/admin/content");
				})
			}else{
				return self.redirect("/admin/content");
			}
		},
		cateAction:function(){			//分类管理
			var self=this;
			self.assign("model","content");
			self.assign("action","cate");
			if(self.isGet()){			//get请求渲染模板
				var cate=self.getCategory();
				return Promise.all([cate]).then(function(){
					return self.display();
				});				
				self.display();
			}else{						//处理数据
				
			}		
		},
		tagAction:function(){			//标签管理
			var self=this;
			self.assign("model","content");
			self.assign("action","tag");
			if(self.isGet()){			//get请求渲染模板
				var tag=self.getTag();
				return Promise.all([tag]).then(function(){
					return self.display();
				});				
				self.display();
			}else{						//处理数据

			}						
		},
		moodAction:function(){			//标签管理
			var self=this;
			self.assign("model","content");
			self.assign("action","mood");
			if(self.isGet()){			//get请求渲染模板
				var tag=self.getTag();
				var page=self.get('page')?self.get('page'):1;
				var data=D('Moods').getList(page);
				self.assign("list",data);				
				self.display();
			}else{						//处理数据

			}						
		}		
	};
});
