


const request =require("request");

// const geocode=(address,boxinstuction)=>{
// const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoicm9tYW41Nzc3IiwiYSI6ImNrc2VwMm9hNDEyZmIycG1jemJ1NXBlMzYifQ.Sx5BlQeQz-HaaDFUta9S2w"
// request({url,json:true},(error,response)=>{
// if (error){
//    boxinstuction('unable to connect',undefined)
// }
// else if (response.body.features.length === 0){
//     boxinstuction('unable to find location',undefined)
// }
// else{
//     boxinstuction("not found",{
//         location:response.body.features[0].place_name,
//         latitude:response.body.features[0].center[0],
//         longitude:response.body.features[0].center[1]
//     })
  
// }

// })
// }

const geocode=(address,callback) => {
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoicm9tYW41Nzc3IiwiYSI6ImNrc2VwMm9hNDEyZmIycG1jemJ1NXBlMzYifQ.Sx5BlQeQz-HaaDFUta9S2w";
     request({url,json:true},(err,res)=>{
        if(err){
            callback("no connection",undefined)
        }
        else if(res.body.features[0]===0){
            callback("location not found",undefined)
        }
        else{
            callback(undefined,{
                latitude:res.body.features[0].center[1],
                longitude:res.body.features[0].center[0],
                location:res.body.features[0].place_name
            })
        }
    })
}









module.exports=geocode