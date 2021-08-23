


   const weatherform=document.querySelector('form');
   

   const input=document.querySelector('input');
   
const weather=document.querySelector('.weather')
const forecast=document.querySelector('.forecast')
  weatherform.addEventListener('submit',(e)=>{
       e.preventDefault();
       
   url=`http://localhost:3000/weather?address=${input.value}`;
   fetch(url).then((res)=>res.json()).then((data)=>{
    if(data.error){
        console.log(data.error) 
    }
    else{
        weather.innerHTML=`the weather in ${data.location}.observation time:${data.observation_time}`
        forecast.innerHTML=`temperature:${data.temperature}.feels like ${data.feelslike}. ${data.weather_descriptions}`
        console.log(data)
        input.value=""
    }
   })
   })
