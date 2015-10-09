// 标签模型
module.exports = Model(function(){
    return {
        //获取标签列表
        getList:function(){
            var self=this;
            return D('Tags').where({tid:1}).select().then(function(data){
                return data;
            });
        }
    }
})