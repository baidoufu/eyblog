// 留言模型
module.exports = Model(function(){
    return {
        //获取留言列表
        getList:function(){
            var self=this;
            return self.select().then(function(data){
                return data;
            });
        },
        //获取总数
        getCount:function(){
            var self=this;
            return self.count().then(function(data){
                return data;
            });        	
        }
    }
})