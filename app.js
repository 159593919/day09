const koa=require("koa")

const app=new koa();

const static=require("koa-static")

const path=require("path")

const bodyparser=require("koa-bodyparser")

const router=require("koa-router")();

const query=require("./db/query")

app.use(bodyparser())

app.use(router.routes())

app.use(static(path.join(process.cwd(),"public")))

router.get("/api/list",async ctx=>{
let data=await query("select * from zdm")
ctx.body=data
})

router.post("/api/add",async ctx=>{
    let {name,age}=ctx.request.body;
    if(name&&age){
        let user=await query("select * from zdm where age=?",[age])
        if(user.data.length){
            ctx.body={
                code:0,
                msg:"此人已存在"
            }
        }else{
            try{
                let create_time=new Date();
                let data=await query("insert into zdm(name,age,create_time) values(?,?,?)" ,[name,age,create_time])
                ctx.body={
                    code:1,
                    msg:"添加成功"
                }
            }catch(e){
                ctx.body={
                    code:0,
                    msg:e
                }
            }
         
        }
    }else{
        ctx.body={
            code:2,
            msg:"参数缺失"
        }
    }
})
//删除

router.get('/api/del',async ctx=>{
    let {id}=ctx.query
    if(id||id===0){
        try{
            await query('delete from zdm where id=?',[id])
            ctx.body={
                code:1,
                msg:"删除成功"
            }

        }catch(e){
ctx.body={
    code:0,
    msg:e
}
        }

    }else{
ctx.body={
    code:2,
    msg:"参数缺失"
}
    }
})
router.post("/api/edit",async ctx=>{
    let {name,age,id}=ctx.request.body;
    if(name&&age&&id){
        try{
            await query("update zdm set name=?,age=? where id=?"[name,age,id])
            ctx.body={
                code:1,
                msg:"修改成功"
            }


        }catch(e){
     ctx.body={
         code:0,
         msg:e
     }
        }
    }else{
        ctx.body={
            code:2,
            msg:"参数缺失"
        }
    }
})



app.listen(process.env.PORT||3000,()=>{
    console.log("服务启动成功")
})