module.exports = {
  //配置项: 配置值
  port: 8360, //监听的端口
  db_type: 'mysql', // 数据库类型
  db_host: '127.0.0.1', // 服务器地址
  db_port: '', // 端口
  db_name: 'ey', // 数据库名
  db_user: 'root', // 用户名
  db_pwd: '123456', // 密码
  db_prefix: 'ey_', // 数据库表前缀
  post_max_file_size: 1024 * 1024 * 1024, // 上传文件大小限制，默认 1G
  post_max_fields: 100, // 最大表单数，默认为 100
  post_max_fields_size: 2 * 1024 * 1024, // 单个表单长度最大值，默认为 2MB
  post_file_upload_path: APP_PATH + '/Runtime/Temp', // 文件上传的临时目录 
  call_controller: "Home:Index:error",   //404页面
};
