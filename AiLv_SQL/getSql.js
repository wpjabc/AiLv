const mysql = require('mysql');     
const md5 = require('md5');       //用于MD5加密的模块

const connection = mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:"root",
    database:"AiLv"
})

//连接数据库
connection.connect(error => {
    if(error){
        console.log("   数据库连接失败："+error);
        return;
    }
    console.log('   数据库连接成功');
})

module.exports = {

    //添加用户信息   
    addUser(obj,callback){
        var phone = obj.phone;
        var password = md5(md5(obj.password)+'英俊');
        var name = obj.name;
        let sql = 'insert into `userinfo` (phone,password,name) values (?,?,?)';
        var params = [phone,password,name]
        connection.query(sql,params,(error, result) => {
            if(error){
                console.log('   添加用户信息失败：'+error)
            }else{
                callback(result);
            }
        })
    },

    //检查用户是否存在
    checkUser(phone,callback){
        let sql = 'select * from userinfo where phone = ?';
        params = [phone]
        connection.query(sql,params, (error, result) => {
            if(error){
                console.log('   获取用户信息失败：'+error);
                return;
            }
                callback(result);
        })
    },

    // 检查用户登录
    checkLogin(obj,callback){
        let phone = obj.phone;
        let password = md5(md5(obj.password)+'英俊');
        let sql = 'select * from userinfo where phone = ? and password = ?'
        params = [phone,password];
        connection.query(sql,params, (error, result) => {
            if(error){
                console.log('   获取用户信息失败：'+error);
                return;
            }
                callback(result);
        })
    },

    // 修改用户信息
    upDate(obj,callback){
        var id = obj.id;
        var sex = obj.sex;
        var address = obj.address;
        var birthday = obj.birthday;
        var email = obj.email;
        var school = obj.school;
        var work = obj.work;
        var idcard = obj.idcard;

        var sql = 'UPDATE `userinfo` SET`sex`= ?,`birthday`= ?,`email`= ?,'
                +'`address`= ?,`school`= ?,`work`= ?,`idcard`= ? WHERE id = ?';
        var params = [sex, birthday, email, address, school, work, idcard, id];

        connection.query(sql,params, (error, result) => {
            if(error){
                console.log('   获取用户信息失败：'+error);
                return;
            }
            callback(result);
        })

    },

    //获取用户信息
    getUser(obj,callback){
        let id = obj.id;
        let sql = 'select * from userinfo where id = ?'
        params = [id];
        connection.query(sql,params, (error, result) => {
            if(error){
                console.log('   获取用户信息失败：'+error);
                return;
            }
                callback(result);
        })
    }
}