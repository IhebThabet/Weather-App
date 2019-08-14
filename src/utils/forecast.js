const request=require("request")

const forecast=(longitude,latitude,callback)=>{
    const url="https://api.darksky.net/forecast/d579b3ac08abf80df9edf21d2d965a7b/"+longitude+","+latitude
    request({url,json:true},(error,{body})=>{
        if(error){callback("connexion problem")}
        else if(body.error){callback("wrong coordinates")}
        else{callback(body.currently)}
    })
}
module.exports=forecast