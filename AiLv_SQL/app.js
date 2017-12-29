const express = require('express');
const app = express();
const router = require('./router.js')

app.post("/checkuser",router.checkuser)
app.post("/adduser",router.adduser)
app.post("/checklogin",router.checklogin)
app.post("/update",router.update)
app.post("/getuser",router.getuser)

app.listen(3000,function(){
	console.log('	服务器已经开启，http://192.168.1.186:3000')
});

