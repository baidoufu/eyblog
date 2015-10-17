/**
 * Admin模块Controller基类
 */
module.exports = Controller(function() {
	'use strict';
	return {
		init: function(http) {
			var self = this;
			self.super("init", http);
			self.assign("title", "后台管理");
			//网站配置
			D('web').getOne().then(function(data) {
				self.assign("_web", data);
			});
			//判断是否登录
			return self.session("userInfo").then(function(data) {
				if (isEmpty(data)) {
					return self.redirect("/login");
				} else {
					return self.assign("userInfo", data);
				}
			});
		},
		getTag: function() { //获取全部标签
			var self = this;
			return D('Tags').getList().then(function(data) {
				self.assign("tag", data);
			});
		},
		getCategory: function() { //获取全部分类
			var self = this;
			return D('Categorys').getList().then(function(data) {
				self.assign("category", data);
			});
		}
	}
});