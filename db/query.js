const conncetion=require("./index")
module.exports=(sql,params=[])=>{
    return new Promise((resolove,reject)=>{
        conncetion.query(sql,params,(error,data)=>{
if(error){
    reject(error)
}else{
    resolove(data)
}
        })

    })

}
