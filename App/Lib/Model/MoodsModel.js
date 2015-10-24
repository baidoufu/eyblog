// 心情模型
module.exports = Model(function(){
    return {
        //获取心情列表
        getList:function(page){
            var self=this;
            return self
                .page(page,10)
                .field("ey_users.user,ey_moods.*")
                .join("ey_users ON ey_moods.uid=ey_users.id")
                .order("ey_moods.time desc")
                .countSelect()
                .then(function(data){
                    //日期处理
                    for(var k in data['data']){
                        data['data'][k]['time']=formatDate("y-m-d h:i:s",data['data'][k]['time']);
                    }                    
                    return data;
            });
        },
        //获取总数
        getCount:function(){
            var self=this;
            return self.count().then(function(data){
                return data;
            });        	
        },
        //获取最新心情
        getNew:function(nums){
            var self=this;
            return self.order("time desc").find().then(function(data){
                return data;
            });
        }
    }
})