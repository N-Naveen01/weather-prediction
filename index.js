
const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const api="c528e3bc6c909a596dba41fb28******";

weatherform.addEventListener("submit",async event=>{

    event.preventDefault();
    const city = cityinput.value;

    if(city){
        try{
            const weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);
        }
        catch(error){
            console.error("Please Enter Valid City");
            displayerror("Please Enter Valid City");
        }
    }
    else{
        displayerror("Please enter a city");
    }
});


async function getweatherdata(city) {
    
    const apiurl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

    const response = await fetch(apiurl);
    console.log(response);

    if(!response.ok){
        throw new error("Could not fetch weather data");
    }

    return await response.json();
}

function displayweatherinfo(data){

    const {name: city , 
           main: {temp,humidity}, 
           weather: [{description,id}]} = data;
    
    card.textContent="";
    card.style.display="flex";
    
    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

    citydisplay.textContent=city;
    tempdisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
    humiditydisplay.textContent=`Humidity: ${humidity}%`;
    descdisplay.textContent=description;
    weatheremoji.textContent=getweatheremoji(id);


    citydisplay.classList.add("city")
    tempdisplay.classList.add("temp")
    humiditydisplay.classList.add("humidity");
    descdisplay.classList.add("desc");
    weatheremoji.classList.add("weatheremoji");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatheremoji);
}

function getweatheremoji(weatherid){

    switch(true){
        case (weatherid>=200 && weatherid<300):
            return "⚡";
            break;

        case (weatherid>=300 && weatherid<400):
            return "🌦️";
            break;  
            
        case (weatherid>=500 && weatherid<600):
            return "⛈️";
            break;     
            
        case (weatherid>=600 && weatherid<700):
            return "☃️";
            break;    
            
        case (weatherid>=700 && weatherid<800):
            return "🌫️";
            break;    
            
        case (weatherid===800):
            return "🌞";
            break; 
            
        case (weatherid>=801 && weatherid<810):
            return "⛅";
            break; 
            
        default:
            return "?";
            break;    
    }
}

function displayerror(message){

    const errordis = document.createElement("p");
    errordis.textContent=message;
    errordis.classList.add(".errordisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordis);
}
