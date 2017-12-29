const getSql = require('./getSql.js');
const formidable = require('formidable')
const send = require('./send.js')

module.exports = {
	// 检查
	checkuser(req,res,next){
		//得到用户填写的东西
	    var form = new formidable.IncomingForm();
	    form.parse(req, function (err, fields, files){
	    	var phone = fields.phone;

	    	getSql.checkUser(phone,result => {
	    		if(result.length == 0){
	    			send(res,{
	    				status:200
	    			})		//用户不存在，可以注册
	    			return;
	    		}
	    		send(res,{
	    			status:404
	    		});		//用户已存在
	    	})
	    }) 
	},

	// 添加用户
	adduser(req,res,next){
		//得到用户填写的东西
	    var form = new formidable.IncomingForm();
	    form.parse(req, function (err, fields, files){

	    	getSql.addUser(fields,result => {
	    		send(res,{
	    			status:200	//注册成功
	    		})		
	    	})
	    }) 
	},

	// 检查用户登录
	checklogin(req,res,next){
		//得到用户填写的东西
	    var form = new formidable.IncomingForm();
	    form.parse(req, function (err, fields, files){

	    	getSql.checkLogin(fields,result => {
	    		if(result.length == 0){
	    			send(res,{
	    				status:404		//用户不存在
	    			})
	    			return;
	    		}
	    		send(res,{
	    			status:200,		//登录成功
	    			result:{
	    				id:result[0].id, //用户唯一ID
	    				name:result[0].name
	    			}  	
	    		})		
	    	})
	    }) 
	},

	// 更新用户信息
	update(req,res,next){
		var form = new formidable.IncomingForm();
	    form.parse(req, function (err, fields, files){

	    	getSql.upDate(fields,result => {
	    		send(res,{
	    			status:200,
	    			result:result
	    		})		
	    	})
	    })
	},

	// 获取用户信息
	getuser(req,res,next){
		var form = new formidable.IncomingForm();
	    form.parse(req, function (err, fields, files){
	    	getSql.getUser(fields,result => {
	    		send(res,{
	    			status:200,
	    			result:result
	    		})		
	    	})
	    })
	}
}