// 网站信息模型
module.exports = Model(function(){
    return {
        //获取PV
        getPV:function(){
            var self=this;
            return self.getField('pv',true).then(function(data){
                return data;
            });            
        },
        //获取配置
        getOne:function(){
        	var self=this;
        	return self.find().then(function(data){
        		return data;
        	});
        }
    }
})