var prod = true;
prod = false;
var root = '';
if (prod) {
  root = ''; // 生产环境
} else {
  root = ''; // 小辉付测试环境
}

var config = {
  root,
  isProd: prod, // 是否是正式环境
  login: `${root}/sys/login`, //(例子) 
}

export default config;