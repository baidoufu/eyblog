/**
 * 标签内容控制器
 * @return
 */
module.exports = Controller("Admin/BaseController", function() {
	"use strict";
	return {
		addAction: function() {
			var self = this;
			var data = {
				name: self.post('tag'),
				tid: 1
			};
			if (!isEmpty(self.post('id')) && self.post('id') != "0") {
				//更新
				var rs = D('tags').where({
					id: self.post('id')
				}).update(data);
			} else {
				//新增
				var rs = D('tags').add(data);
			}
			rs.then(function(id) {
				if (id) { //成功
					return self.redirect("/admin/content/tag");
				} else { //失败
					return self.redirect("/admin/content/tag");
				}
			})
		},
		getAction: function() {
			var self = this;
			var id = self.get('id');
			return D('tags').where({
				id: id
			}).find().then(function(data) {
				self.json(data);
			});
		},
		deleteAction: function() {
			var self = this;
			var id = self.get('id');
			return D('tags').where({
				id: id
			}).delete().then(function(data) {
				if (data) {
					return self.redirect("/admin/content/tag");
				} else {
					return self.redirect("/admin/content/tag");
				}
			});
		}
	}
});