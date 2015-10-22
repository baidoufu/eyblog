/**
 * index控制器
 */
module.exports = Controller("Home/BaseController", function() {
	"use strict"; //使用严格模式
	return {
		//首页
		indexAction: function() {
			var self = this;
			self.assign('title', "首页");
			var page = self.get('page') ? self.get('page') : 1;
			var map = {};
			map.status = 1;
			if (self.post('keyword')) { //关键词
				map = {
					'ey_contents.title': ['like', '%' + self.post('keyword') + '%']
				};
				self.assign('title', "搜索");
			}
			if (self.get('tag')) { //标签
				map = {
					'ey_contents.tid': self.get('tag')
				};
				self.assign('title', "标签");
			}
			if (self.get('cate')) { //分类
				map = {
					'ey_contents.cid': self.get('cate')
				};
				self.assign('title', "分类");
			}
			map.ispage = 1;
			var data = D('Contents').getList(map, page);
			self.assign('list', data);
			self.display();
		},
		//文章详情页
		pageAction: function() {
			var self = this;
			var map = {
				'ey_contents.id': self.get('id'),
				//ispage:1,
				status: 1,
			};
			var data = D('Contents').getOne(map).then(function(rs) {
				self.assign("title", rs.title); //页面标题
				return rs;
			});
			self.assign('data', data);
			self.display();
		},
		//归档
		archivesAction: function() {
			var self = this;
			self.assign("title","归档");
			return D("Contents")
				.where("ispage=1")
				.field("id,title,time")
				.order("time desc")
				.select()
				.then(function(data) {
                    //日期处理
                    for (var k in data) {
                        data[k]['time'] = formatDate("y-m-d h:i:s", data[k]['time']);
                    }					
					self.assign("data", data);
					self.display();
				});
		},
		//登录
		loginAction: function() {
			var self = this;
			//处理
			if (self.isGet()) {
				self.assign('title', "登录到后台");
				D('web').getOne().then(function() {
					return self.display();
				});
			} else {
				var map = {
					user: self.post('user'),
					pass: self.post('pass')
				};
				return D('Users').login(map).then(function(data) {
					if (data) { //成功
						self.session('userInfo', data);
						self.redirect("/admin");
					} else { //失败				
						self.redirect("/login");
					}
				});
			}
		},
		//退出登录
		loginoutAction: function() {
			var self = this;
			return self.session().then(function(data) {
				self.redirect("/");
			});
		}
	};
});