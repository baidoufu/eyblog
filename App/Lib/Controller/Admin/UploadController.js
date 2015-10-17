/**
* 文件上传控制器
* @return
*/
module.exports = Controller(function(){
	return {
		indexAction:function(){
			var self=this;
			var info=self.file("file");
			var fs = thinkRequire('fs'); //引入fs处理文件
			//文件名
			var arr=[];
			arr=info.originalFilename.split(".");
			var filename="";
			for(i=0;i<arr.length-1 ;i++ ){
				filename+=arr[i];
			}
			console.log(arr[arr.length-1]);
    		fs.readFile(info.path, function (err, data) {
		      var newPath = RESOURCE_PATH + '/resource/upload/'+md5(filename)+"."+arr[arr.length-1];
		      fs.writeFile(newPath, data, function (err) {
		      		if(err){
		      			self.end("0");
		      		}else{
		      			self.end('/resource/upload/'+md5(filename)+"."+arr[arr.length-1]);
		      		}
		      });
   			});
		}
	}
});