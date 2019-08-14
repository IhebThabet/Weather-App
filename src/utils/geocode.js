const request=require("request")

const geocode=(adress,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+adress+".json?access_token=pk.eyJ1IjoiaWhlYnRoYWJldDE4IiwiYSI6ImNqejY5eTR3MTAzZGczam1tdGdtZW4xNTYifQ.Qq9blt5enA7Vze1WOyDlBQ&limit=1";
    request({url,json:true},(error,{body})=>{
        if(error){callback("not able to fetch data")}
        else if (body.features.length===0){callback("location not found")}
        else{
            const data={
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name}
            callback(data)
            }
        })
    }


module.exports=geocode;