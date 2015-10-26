// 文章模型
module.exports = Model(function() {
    return {
        // 获取文章列表
        getList: function(map, page) {
            var self = this;
            return self.where(map)
                .page(page, 6)
                .join("ey_users ON ey_contents.uid=ey_users.id")
                .join("ey_tags ON ey_contents.tid=ey_tags.id")
                .field("ey_contents.*,ey_users.user,ey_users.img,ey_tags.name as tag")
                .order("ey_contents.id desc")
                .countSelect()
                .then(function(data) {
                    //日期处理
                    for (var k in data['data']) {
                        data['data'][k]['m'] = formatDate("m", data['data'][k]['time']);
                        data['data'][k]['d'] = formatDate("d", data['data'][k]['time']);                        
                        data['data'][k]['time'] = formatDate("y-m-d h:i:s", data['data'][k]['time']);
                    }
                    return data;
                });
        },
        //获取文章详情
        getOne: function(map) {
            var self = this;
            return self
                .where(map)
                .join("ey_tags ON ey_contents.tid=ey_tags.id")
                .field("ey_contents.*,ey_tags.name as tag")
                .find()
                .then(function(data) {
                    data['d'] = formatDate("d", data['time']);
                    data['m'] = formatDate("m", data['time']);
                    return data;
                });
        },
        //获取最新文章
        getNew: function(nums) {
            var self = this;
            var map = {
                status: 1,
                ispage: 1
            };
            var nums = nums ? nums : 5;
            return self.where(map).field('id,title').order('id desc').limit(nums).select().then(function(data) {
                return data;
            });
        },
        //获取文章总数
        getCount: function() {
            var self = this;
            return self.count().then(function(data) {
                return data;
            });
        }
    }
})