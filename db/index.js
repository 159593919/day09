const mysql=require("mysql")
let conncetion=mysql.createConnection({
    host:"localhost",
    user:"root",
    post:"3306",
    password:"root",
    database:"1705d"
})
conncetion.connect((error)=>{
if(error){
    console.log("连接失败")
}else{
    console.log("连接成功")
}
})
module.exports=conncetion