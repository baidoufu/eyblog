/**
 * index控制器
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";									//使用严格模式
  return {
  	//首页
    indexAction: function(){
		var self=this;
		self.assign('title',"首页");
		var page=self.get('page')?self.get('page'):1;
		var map={};
		map.status=1;
		if(self.post('keyword')){				//关键词
			map.title=['like','%'+self.post('keyword')+'%'];
			self.assign('title',"搜索");
		}
		if(self.get('tag')){					//标签
			map.tid=self.get('tag');
			self.assign('title',"标签");
		}
		if(self.get('cate')){					//分类
			map.cid=self.get('cate');
			self.assign('title',"分类");
		}		
		map.ispage=1;
		var data=D('Contents').getList(map,page);
		self.assign('list',data);
		self.display();
    },
    //文章详情页
	pageAction:function(){
		var self=this;
		var map={
			id:self.get('id'),
			//ispage:1,
			status:1,
		};
		var data=D('Contents').getOne(map).then(function(rs){
			self.assign("title",rs.title);		//页面标题
			return rs;
		});
		self.assign('data',data);
		self.display();
	},
	//登录
	loginAction:function(){	
		var self=this;
		self.assign('title',"登录到后台");
		//处理
		if(self.isGet()){
			return self.display();
		}else{
			var map={
				user:self.post('user'),
				pass:self.post('pass')
			};
			return D('Users').login(map).then(function(data){
				if(data){						//成功
					self.session('userInfo',data);
					self.redirect("/admin");
				}else{							//失败
					self.redirect("/login");
				}
			});			
		}
	},
	//退出登录
	loginoutAction:function(){
		var self=this;
		return self.session().then(function(data){
			self.redirect("/");
		});
	}
  };
});