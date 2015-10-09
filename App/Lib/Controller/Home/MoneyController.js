/**
 * index控制器
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){					//首页
		var self=this;
        //当月
        var myDate=new Date();
        var dates=myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-01"; 
        dates=time(dates);
        var map={};
        map.addtime=["gt",dates];
        var rs={
            month:(myDate.getMonth()+1),
            sum:0,
            income:0
        };
        return D('Money').where(map).select().then(function(data){
            for(var k in data){
                if(data[k].cate==1){
                    rs.sum+=data[k].sum;
                }else if(data[k].cate==2){
                    rs.income+=data[k].sum;
                }
            }
            self.end({status:1,data:rs});
        })
    },
    addAction:function(){                       //添加记录
    	var self=this;
    	var data={};
    	data.sum=self.post('sum');
    	data.cate=self.post('cate');
    	data.type=self.post('type');
    	data.remark=self.post('remark');
    	data.addtime=time();
    	return D('Money').add(data).then(function(insertId){
    		if(insertId){
    			return self.success({msg:"添加记录成功"});
    		}else{
    			return self.error(1001,"添加记录失败");
    		}
    	});
    },
    listAction:function(){                      //列表
        var self=this;
        return D('Money').order("addtime desc").select().then(function(data){
            for(var k in data){
                data[k]['addtime']=formatDate("y-m-d",data[k]['addtime']);
            }
            var list={
                data:data
            }
            self.end({status:1,data:list});
        });
    }
  };
});