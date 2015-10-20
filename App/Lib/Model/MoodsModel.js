// 心情模型
module.exports = Model(function(){
    return {
        //获取心情列表
        getList:function(page){
            var self=this;
            return self
                .page(page,5)
                .countSelect()
                .then(function(data){
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
            return self.find().then(function(data){
                return data;
            });
        }
    }
})