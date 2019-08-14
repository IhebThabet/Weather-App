
document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault();
    document.querySelector("h2").textContent="Loading ..."
    const address=document.querySelector("input").value;
    fetch("/weather?search="+address).then((response)=>{
        response.json().then((response)=>{
            const location=document.querySelector("h2")
            const temperature=document.querySelector(".p1")
            const status=document.querySelector(".p2")
            const precip=document.querySelector(".p3")
            const humidity=document.querySelector(".p4")
            if(response.error){
                location.textContent=response.error
                temperature.textContent=""
                status.textContent=""
                precip.textContent=""
                humidity.textContent=""
            }
            else{
                location.textContent=response.location
                temperature.textContent="Temperature : "+response.temperature+" F"
                status.textContent="Status : "+response.summary
                precip.textContent="Precipitation : "+response.precipProbability+ "%"
                humidity.textContent="Humidity : "+response.humidity
            }
        })
    })
    
})