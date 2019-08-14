const express=require("express")
const path=require("path")
const app=express()
const hbs=require("hbs")
const geocode=require("./utils/geocode.js")
const forecast=require("./utils/forecast.js")
const port=process.env.PORT || 3000
//define express paths for config
const viewsPath=path.join(__dirname,"../templates/views")
const publicPath=path.join(__dirname,"../public")
const partialsPath=path.join(__dirname,"../templates/partials")


//setup handlebars
app.set("views",viewsPath)
app.set("view engine","hbs")
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))

//
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About"
    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help"
    })
})
app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
    })
})

app.get("/weather",(req,res)=>{
    if(req.query.search){
        geocode(req.query.search,(data)=>{
            if(typeof(data)==="object"){
                forecast(data.longitude,data.latitude,(data2)=>{
                    if(typeof(data2)==="object"){
                        data2.location=data.location
                        res.send(data2)
                    }
                    else{res.send({error:data2})}
                })
            }
            else{res.send({error:data})}
        })
    }
    else{res.send({error:"you  must provide search adress"})}
})


app.get("/help/*",(req,res)=>{
    res.render("error",{
        msg:"Help article not found"
    })
})
app.get("*",(req,res)=>{
    res.render("error",{
        msg:"Page not found"
    })
})


app.listen(port,()=>{
    console.log("server is running at port "+port)
})
