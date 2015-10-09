// 分类模型
module.exports = Model(function(){
    return {
        //获取分类列表
        getList:function(){
            var self=this;
            return D('Categorys').where({tid:1}).select().then(function(data){
                return data;
            });
        }
    }
})