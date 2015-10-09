// 用户模型
module.exports = Model(function(){
    return {
    	//登录检校
    	login:function(map){
    		var self=this;
    		map.pass=md5(map.pass+'eyblog');
    		return self.where(map).find().then(function(data){
    			return data;
    		});
    	}
    }
})