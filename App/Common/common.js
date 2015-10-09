'use strict';
/*****项目函数库*******/

//时间戳格式化
global.formatDate=function (formatStr, fdate){
	var fTime, fStr = 'ymdhis';
	if (!formatStr){
		formatStr= "y-m-d h:i:s";
	}
	if (fdate){
		fTime = new Date(parseInt(fdate)*1000);	//10位数时间戳
	}
	else{
		fTime = new Date();
	}
	var formatArr = [
	fTime.getFullYear().toString(),
	(fTime.getMonth()+1).toString(),
	fTime.getDate().toString(),
	fTime.getHours().toString(),
	fTime.getMinutes().toString(),
	fTime.getSeconds().toString()
	]
	for (var i=0; i<formatArr.length;i++)
	{
		formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
	}
	return formatStr;
}
//获取10位数时间戳
global.time=function(str){
	var date;
	if(str){
	    date = new Date(Date.parse(str.replace(/-/g, "/")));
	    date = (date.getTime())/1000;
	}else{
		date=(new Date().getTime())/1000
	}
	
	return parseInt(date);
}
