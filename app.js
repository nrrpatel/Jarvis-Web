//elements
const startButton = document.querySelector("#card");
const stopButton = document.querySelector("#cash");
const speakButton = document.querySelector("#speak");
const turn_on = document.querySelector("#turn_on")
const msgs = document.querySelector(".messages");
const time = document.querySelector(".time")


// speech recognition setup
$(document).ready(function(){
   
    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["J.A.R.V.I.S"],
        typeSpeed: 80,
        backSpeed: 60,
        loop: true
    });
    
});

function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
    mo = now.getMonth(),
    dnum = now.getDate(),
    yr = now.getFullYear(),
    hou = now.getHours(),
    min = now.getMinutes(),
    sec = now.getSeconds(),
    pe = "AM";
    
    if(hou >= 12){
        pe = "PM";
    }
    if(hou == 0){
        hou = 12;
    }
    if(hou > 12){
        hou = hou - 12;
            }
            
            Number.prototype.pad = function(digits){
                for(var n = this.toString(); n.length < digits; n = 0 + n);
                return n;
            }
            
            var months = ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"];
            var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
            var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];
            for(var i = 0; i < ids.length; i++)
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }
        
        function initClock(){
            updateClock();
            window.setInterval("updateClock()", 1);
        }

// BATTERY START
initBattery()

function initBattery(){
    const batteryLiquid = document.querySelector('.battery__liquid'),
          batteryStatus = document.querySelector('.battery__status'),
          batteryPercentage = document.querySelector('.battery__percentage')
    
    navigator.getBattery().then((batt) =>{
        updateBattery = () =>{
            /* 1. We update the number level of the battery */
            let level = Math.floor(batt.level * 100)
            batteryPercentage.innerHTML = level+ '%'

            /* 2. We update the background level of the battery */
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`

            /* 3. We validate full battery, low battery and if it is charging or not */
            if(level == 100){ /* We validate if the battery is full */
                batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`
                batteryLiquid.style.height = '103%' /* To hide the ellipse */
            }
            else if(level <= 20 &! batt.charging){ /* We validate if the battery is low */
                batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`
            }
            else if(batt.charging){ /* We validate if the battery is charging */
                batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`
            }
            else{ /* If it's not loading, don't show anything. */
                batteryStatus.innerHTML = ''
            }
            
            /* 4. We change the colors of the battery and remove the other colors */
            if(level <=20){
                batteryLiquid.classList.add('gradient-color-red')
                batteryLiquid.classList.remove('gradient-color-orange','gradient-color-yellow','gradient-color-green')
            }
            else if(level <= 40){
                batteryLiquid.classList.add('gradient-color-orange')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-yellow','gradient-color-green')
            }
            else if(level <= 80){
                batteryLiquid.classList.add('gradient-color-yellow')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-green')
            }
            else{
                batteryLiquid.classList.add('gradient-color-green')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-yellow')
            }
        }
        updateBattery()

        /* 5. Battery status events */
        batt.addEventListener('chargingchange', () => {updateBattery()})
        batt.addEventListener('levelchange', () => {updateBattery()})
    })
}
//BATTERY END


let jarvisComs = [];
jarvisComs.push("hi jarvis");
jarvisComs.push("what are your commands");
jarvisComs.push("close this - to close opened popups");
jarvisComs.push("whats the weather or temperature");
jarvisComs.push("show the full weather report");
jarvisComs.push("are you there - to check if Jarvis active");
jarvisComs.push("shut down - stop voice recognition");
jarvisComs.push("open google");
jarvisComs.push('search for "your keywords" - to search on google ');
jarvisComs.push("open whatsapp");
jarvisComs.push("open netflix");
jarvisComs.push("open discord");
jarvisComs.push("open youtube");
jarvisComs.push('play "your keywords" - to search on youtube ');
jarvisComs.push("close this youtube tab - to close opened youtube tab");
jarvisComs.push("open netlify");
jarvisComs.push("open twitter");
jarvisComs.push("open instagram");
jarvisComs.push("open github");
jarvisComs.push("open learn");
jarvisComs.push("open waterlooworks");
jarvisComs.push("what is the weather in this (any city) - to search for the weather of any country");

// create a new message
function createMsg(who, msg) {
  let newmsg = document.createElement("p");
  newmsg.innerText = msg;
  newmsg.setAttribute("class", who);
  msgs.appendChild(newmsg);
}



// G.U.R.U START
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition()

//speech recognition continous
recognition.continuous = true


//speech recognition start
recognition.onstart = function() {
    console.log("you can hear me");
};


    let windowsB = []

//speech recognition result 
recognition.onresult = function(event){
    let current = event.resultIndex
    let transcript = event.results[current][0].transcript
    transcript = transcript.toLowerCase()
    console.log(`my words: ${transcript}`);
    createMsg("usermsg", transcript)
    
    if(transcript.includes("hello")){
        readOut("Hello sir")
    }
    
    if(transcript.includes("open youtube")){
        readOut("opening youtube sir")
        let a = window.open("https://www.youtube.com/");
        windowsB.push(a)
    }

    if(transcript.includes("open google")){
        readOut("opening google sir")
        let a = window.open("https://www.google.com/");
        windowsB.push(a)
    }

    if(transcript.includes("open whatsapp")){
        readOut("opening whatsapp sir")
        let a = window.open("https://web.whatsapp.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open instagram")){
        readOut("opening instagram sir")
        let a = window.open("https://www.instagram.com/?hl=en");
        windowsB.push(a)
    }
    if(transcript.includes("open facebook")){
        readOut("opening facebook sir")
        let a = window.open("https://www.facebook.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open twitter")){
        readOut("opening twitter sir")
        let a = window.open("https://twitter.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open linkedin")){
        readOut("opening linkedin sir")
        let a = window.open("https://www.linkedin.com/in/nikunjpatel11/");
        windowsB.push(a)
    }
    if(transcript.includes("open canva")){
        readOut("opening canva sir")
        let a = window.open("https://www.canva.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open canva")){
        readOut("opening canva sir")
        let a = window.open("https://www.canva.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open amazon")){
        readOut("opening amazon sir")
        let a = window.open("https://www.amazon.com");
        windowsB.push(a)
    }
    if(transcript.includes("open apple")){
        readOut("opening apple sir")
        let a = window.open("https://www.apple.com/ca/");
        windowsB.push(a)
    }
    if(transcript.includes("open reddit")){
        readOut("opening reddit sir")
        let a = window.open("https://www.reddit.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open yahoo")){
        readOut("opening yahoo sir")
        let a = window.open("https://ca.yahoo.com/?p=us");
        windowsB.push(a)
    }
    if(transcript.includes("open bestbuy")){
        readOut("opening bestbuy sir")
        let a = window.open("https://www.bestbuy.ca/en-ca");
        windowsB.push(a)
    }
    if(transcript.includes("open source")){
        readOut("opening source sir")
        let a = window.open("https://www.thesource.ca/en-ca");
        windowsB.push(a)
    }
    if(transcript.includes("open bing")){
        readOut("opening bing sir")
        let a = window.open("https://www.bing.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open walmart")){
        readOut("opening walmart sir")
        let a = window.open("https://www.walmart.ca/en");
        windowsB.push(a)
    }
    if(transcript.includes("open microsoft apps")){
        readOut("opening office sir")
        let a = window.open("https://www.office.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open microsoft word")){
        readOut("opening word sir")
        let a = window.open("https://www.office.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open microsoft excel")){
        readOut("opening excel sir")
        let a = window.open("https://www.office.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open microsoft powerpoint")){
        readOut("opening powerpoint sir")
        let a = window.open("https://www.office.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open google slides")){
        readOut("opening slides sir")
        let a = window.open("https://docs.google.com/presentation/u/0/?tgif=d");
        windowsB.push(a)
    }
    if(transcript.includes("open google sheets")){
        readOut("opening sheets sir")
        let a = window.open("https://docs.google.com/spreadsheets/u/0/");
        windowsB.push(a)
    }
    if(transcript.includes("open indeed")){
        readOut("opening indeed sir")
        let a = window.open("https://ca.indeed.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open new york times")){
        readOut("opening new york times sir")
        let a = window.open("https://www.nytimes.com/ca/");
        windowsB.push(a)
    }
    if(transcript.includes("open ebay")){
        readOut("opening ebay sir")
        let a = window.open("https://www.ebay.ca/");
        windowsB.push(a)
    }
    if(transcript.includes("open facebook marketplace")){
        readOut("opening marketplace sir")
        let a = window.open("https://www.facebook.com/login/?next=%2Fmarketplace%2F");
        windowsB.push(a)
    }
    if(transcript.includes("open kijiji")){
        readOut("opening kijiji sir")
        let a = window.open("https://www.kijiji.ca/");
        windowsB.push(a)
    }
    if(transcript.includes("open twitch")){
        readOut("opening twitch sir")
        let a = window.open("https://www.twitch.tv/");
        windowsB.push(a)
    }
    if(transcript.includes("open quora")){
        readOut("opening quora sir")
        let a = window.open("https://www.quora.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open cnn")){
        readOut("opening cnn sir")
        let a = window.open("https://www.cnn.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open nba")){
        readOut("opening nba sir")
        let a = window.open("https://www.nba.com/games");
        windowsB.push(a)
    }
    if(transcript.includes("open tiktok")){
        readOut("opening tiktok sir")
        let a = window.open("https://www.tiktok.com/en/");
        windowsB.push(a)
    }
    if(transcript.includes("open soundcloud")){
        readOut("opening soundcloud sir")
        let a = window.open("https://soundcloud.com/");
        windowsB.push(a)
    }
    if(transcript.includes("open amazon music")){
        readOut("opening amazon music sir")
        let a = window.open("https://music.amazon.ca/?refMarker=null&returnFromLogin=1&");
        windowsB.push(a)
    }
    if(transcript.includes("open youtube music")){
        readOut("opening yt music sir")
        let a = window.open("https://music.youtube.com/");
        windowsB.push(a)
    }
    if(transcript.includes("free anime")){
        readOut("opening the best website sir")
        let a = window.open("https://zoro.to/");
        windowsB.push(a)
    }

// here is the shit 

    if(transcript.includes("open waterlooworks")){
        readOut("opening waterloo works sir")
        let a = window.open("https://waterlooworks.uwaterloo.ca/myAccount/dashboard.htm");
        windowsB.push(a)
    }
    if(transcript.includes("open learn")){
        readOut("opening learn sir")
        let a = window.open("https://learn.uwaterloo.ca/d2l/home")
        windowsB.push(a)
    }
    if(transcript.includes("open outlook")){
        readOut("opening outlook")
        let a = window.open("https://outlook.office.com/mail/")
        windowsB.push(a)
    }
    if(transcript.includes("open gmail")){
        readOut("opening your gmail account")
        let a = window.open("https://mail.google.com/mail/u/0/#inbox")
        windowsB.push(a)
    }
    if(transcript.includes("open gmail for my primary account")){
        readOut("opening your primary gmail account")
        let a = window.open("https://mail.google.com/mail/u/0/#inbox")
        windowsB.push(a)
    }
    if(transcript.includes("open gmail for my other account")){
        readOut("opening your other gmail account")
        let a = window.open("https://mail.google.com/mail/u/1/#inbox")
        windowsB.push(a)
    }
    if(transcript.includes("open netflix")){
        readOut("opening Netflix")
        let a = window.open("https://www.netflix.com/browse")
        windowsB.push(a)
    }
    if(transcript.includes("who created you")){
        readOut("I was developed by Nikunj Patel and here is his website where you can see more amazing projects like me")
        let a = window.open("https://nikunjpatel.netlify.app/")
        windowsB.push(a)
    }
    if(transcript.includes("open discord")){
        readOut("opening discord")
        let a = window.open("https://discord.com/")
        windowsB.push(a)
    }
    if(transcript.includes("open google docs")){
        readOut("opening Google docs")
        let a = window.open("https://docs.google.com/document/u/0/")
        windowsB.push(a)
    }
    if(transcript.includes("open google drive")){
        readOut("opening google drive")
        let a = window.open("https://drive.google.com/drive/u/0/my-drive")
        windowsB.push(a)
    }
    if(transcript.includes("hi jarvis")){
        readOut("hello, hope you are well ")
    }
    if(transcript.includes("how are you")){
        readOut("I am good, how are you?")
    }
    if(transcript.includes("i am good")){
        readOut("glad to hear that, how can i help")
    }
    if(transcript.includes("not good")){
        readOut("that's not good, how can i help?")
    }
    if(transcript.includes("yo Jarvis ")){
        readOut("yo how can I help you my bro")
    }
    if(transcript.includes("what's good")){
        readOut("nothing much bro ")
    }
    if(transcript.includes("what is the meaning of life")){
        readOut("You good bro? It's too early to be asking these type of questions.")
    }
    if(transcript.includes("How many pounds are in a Kilogram?")){
        readOut("There are 2.2 pounds in a kilogram.")
    }
    if(transcript.includes("What is better Pepsi or coke")){
        readOut("I don't drink either but Pepsi all the way")
    }
    if(transcript.includes("Can you help me")){
        readOut("At your service, what can I help you with")
    }
    if(transcript.includes("Tell me about yourself")){
        readOut("My name is Jarvis and I was create by Nikunj Patel. I am programmed to assist you in completing various tasks and make your life easier")
    }
    if(transcript.includes("Who are you")){
        readOut("My name is Jarvis and I was create by Nikunj Patel. I am programmed to assist you in completing various tasks and make your life easier")
    }
    if(transcript.includes("Why are you like this")){
        readOut("A certain person named Nikunj Patel programmed me like this and here I am")
    }
    if(transcript.includes("You are ugly")){
        readOut("Have you considered looking in the mirror")
    }
    if(transcript.includes("You are dumb")){
        readOut("I have to match my IQ to the person I am talking to")
    }
    if(transcript.includes("You are fat")){
        readOut("When was the last time you stepped on a scale")
    }
    if(transcript.includes("open calculator")){
        window.open('Calculator:///')
        readOut("opening calculator")
    }
    if(transcript.includes("what time is it")){
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        readOut(time)
    }
    if (transcript.includes("commands")) {
        readOut("sir here's the list of commands i can follow");
        if(window.innerWidth <= 400 ){
          window.resizeTo(screen.width,screen.height)
        }
        document.querySelector(".commands").style.display = "block";
    }
    if (transcript.includes("close this")) {
        readOut("closing the tab sir");
        document.querySelector(".commands").style.display = "none";
        if(window.innerWidth >= 401 ){
          window.resizeTo(250,250)
        }
        setup.style.display = "none";
      }
    if (transcript.includes("close all tabs")) {
        readOut("closing all tabs sir")
        windowsB.forEach((e) => {
          e.close()
        })
    }
    // if(transcript.includes("search for")){
    //     readOut(`searching on google`)
    //     let input = transcript.split("")
    //     input.splice(1,10)
    //     input.pop()
    //     input = input.join(" ").split(" ").join("+")
    //     console.log(input)
    //     window.open(`https://www.google.com/search?q=${input}`) 
    // }
    if (transcript.includes("search up ")) {
        readOut("here's your result");
        let input = transcript.split("");
        input.splice(0, 11);
        input = input.join("").split(" ").join("+");
        let a = window.open(`https://www.google.com/search?q=${input}`)
        windowsB.push(a)
        console.log(input)
      }

      if (transcript.includes("play")) {
        let playStr = transcript.split("");
        playStr.splice(0, 5);
        let videoName = playStr.join("");
        playStr = playStr.join("").split(" ").join("+");
        readOut(`searching youtube for ${videoName}`);
        let a = window.open(`https://www.youtube.com/search?q=${playStr}`); 
        windowsB.push(a)
      }
    //this is the array where all the words the user speaks are listed
    //this is for testing the user recognition it'll speak back what the user is saying
    // readOut(transcript)
    if (transcript.includes("top headlines")) {
        readOut("These are today's top headlines sir")
        getNews()
    }
    if (transcript.includes("news regarding")) {
        // readOut("These are today's top headlines sir")
        let input = transcript
        let a = input.indexOf("regarding")
        input = input.split("")
        input.splice(0,a+9)
        input.shift()
        readOut(`here's some headlines on ${input.join("")}`)
        getCategoryNews(input.join(""))
    
    }
    if (transcript.includes("search for")) {
        readOut("here's your result");
        let input = transcript.split("");
        input.splice(0, 11);
        input = input.join("").split(" ").join("+");
        let a = window.open(`https://www.google.com/search?q=${input}`)
        windowsB.push(a)
        console.log(input)
    }
    if(transcript.includes("what is the weather in ")){
        getTheWeather(transcript)
    }
    if(transcript.includes("what's the weather in ")){
        getTheWeather1(transcript)
    }
    if(transcript.includes("what's the weather like in ")){
        getTheWeather2(transcript)
    }
    if(transcript.includes("current weather conditions")){
        geocode.getLocation();
    }
    //add the weather function with weather in 
    if(transcript.includes("what")){
    //    getAnswer1(transcript);
       getBestAnswer(transcript)
    }
    if(transcript.includes("integrate")){
        getBestAnswer(transcript);
    }
    if(transcript.includes("how")){
        getBestAnswer(transcript);
    }
    if(transcript.includes("who")){
        getBestAnswer(transcript);
    }
    if(transcript.includes("define")){
        getBestAnswer(transcript);
    }
    if(transcript.includes("where")){
        getBestAnswer(transcript);
    }
    if(transcript.includes("why")){
        getBestAnswer(transcript);
    }
    if(transcript.includes("show")){
        // getImage(transcript)
    }




}
//Wolfram Alpha Setup

// const getAnswer = (transcript) => {
//     fetch(`http://api.wolframalpha.com/v2/query?appid=K88UKY-9Y63KVUQ7X&input=${transcript}&includepodid=Result&format=plaintext`)
//     .then(function(response){
//         return response.text()
//     })
//     .then(function(data){
//         console.log(data);
//     })
// }
const getBestAnswer = (transcript) => {
    fetch(`http://api.wolframalpha.com/v2/query?appid=K88UKY-9Y63KVUQ7X&input=${transcript}&output=json`)
    .then(function(response){
      return response.json();
    }).then(function(data){
      if (data.queryresult.pods[0].subpods[0].plaintext === 'false') {
        readOut(data.queryresult.pods[1].subpods[0].plaintext)
      }
      else 
      readOut(data.queryresult.pods[0].subpods[0].plaintext);
      readOut(data.queryresult.pods[1].subpods[0].plaintext)
      recognition.stop()
      setTimeout(() => {
        recognition.start();
      }, 2000);

    });
};

const getAnswer = (transcript) => {
    fetch(`http://api.wolframalpha.com/v2/query?appid=K88UKY-9Y63KVUQ7X&input=${transcript}&output=json`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.queryresult.pods[0].subpods[0]);
        readOut(data.queryresult.pods[0].subpods[0].plaintext)
    })
}

//this is for the image display which is a work in progress.
// const getImage = (transcript) => {
//     fetch(`http://api.wolframalpha.com/v2/query?appid=K88UKY-9Y63KVUQ7X&input=${transcript}&output=json`)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         // console.log(data.queryresult.pods[0].subpods[0]);
//         // readOut(data.queryresult.pods[0].subpods[0].img.src)
//         // const imageURL = (data.queryresult.pods[2].subpods[0].imagesource)
//         const imageURL = ('https://upload.wikimedia.org/wikipedia/commons/6/6a/British_Airways_A320-100_G-BUSB.jpg')
//         console.log(data.queryresult.pods[2].subpods[0].imagesource);
//         const reader = new FileReader();
//             reader.onloadend = () => {
//             const base64data = reader.result;                
//             console.log(base64data);
//         }

//         (async () => {
//         const response = await fetch(imageURL)
//         const imageBlob = await response.blob()
//         const image = reader.readAsDataURL(imageBlob);  
        
//         })()
//             })
// }
const getAnswer1 = (transcript) => {
    fetch(`http://api.wolframalpha.com/v2/query?appid=K88UKY-9Y63KVUQ7X&input=${transcript}&output=json`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.queryresult.pods[1]);
        readOut(data.queryresult.pods[1].subpods[0].plaintext)
    })
}
const getAnswer2 = (transcript) => {
    fetch(`http://api.wolframalpha.com/v2/query?appid=K88UKY-9Y63KVUQ7X&input=${transcript}&output=json`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.queryresult.pods[0].subpods[0].plaintext);
        readOut(data.queryresult.pods[0].subpods[0].plaintext)
    })
}


//weather setup

const getTheWeather = (transcript) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${transcript.split(' ')[5]}&appid=6aa90859f3e957ff6c77ec9b1bc86296&units=metric`)
    .then(function(response){
      return response.json();
    }).then(function(weather){
      if (weather.cod === '404') {
        readOut(`I cannot find the weather for ${transcript.split(' ')[5]}`);
        recognition.stop()
        setTimeout(() => {
            recognition.start();
        }, 2000);

      }
      else 
      readOut(`the weather condition in ${weather.name} is mostly full of
      ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
      recognition.stop()
      setTimeout(() => {
        recognition.start();
      }, 2000);

    });
};

const getTheWeather1 = (transcript) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${transcript.split(' ')[4]}&appid=6aa90859f3e957ff6c77ec9b1bc86296&units=metric`)
    .then(function(response){
      return response.json();
    }).then(function(weather){
      if (weather.cod === '404') {
        readOut(`I cannot find the weather for ${transcript.split(' ')[4]}`);
        recognition.stop()
        setTimeout(() => {
            recognition.start();
        }, 2000);

      }
      else 
      readOut(`the weather condition in ${weather.name} is mostly full of
      ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
      recognition.stop()
      setTimeout(() => {
        recognition.start();
      }, 2000);

    });
};

const getTheWeather2 = (transcript) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${transcript.split(' ')[5]}&appid=6aa90859f3e957ff6c77ec9b1bc86296&units=metric`)
    .then(function(response){
      return response.json();
    }).then(function(weather){
      if (weather.cod === '404') {
        readOut(`I cannot find the weather for ${transcript.split(' ')[5]}`);
        recognition.stop()
        setTimeout(() => {
            recognition.start();
        }, 2000);

      }
      else 
      readOut(`the weather condition in ${weather.name} is mostly full of
      ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
      recognition.stop()
      setTimeout(() => {
        recognition.start();
      }, 2000);

    });
};

let geocode = {
    
    reverseGeocode: function(latitude, longitude){
        var api_key = '934fb04241f049b685069b0414c3f239';
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'
      
        var request_url = api_url
          + '?'
          + 'key=' + api_key
          + '&q=' + encodeURIComponent(latitude + ',' + longitude)
          + '&pretty=1'
          + '&no_annotations=1';
      
        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward
      
        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);
      
        request.onload = function() {
          // see full list of possible response codes:
          // https://opencagedata.com/api#codes
      
          if (request.status === 200){
            // Success!
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${transcript.split(' ')[5]}&appid=6aa90859f3e957ff6c77ec9b1bc86296&units=metric`)
            .then(function(response){
              return response.json();
            }).then(function(weather){
              if (weather.cod === '404') {
                readOut(`I cannot find the weather for ${transcript.split(' ')[5]}`);
                recognition.stop()
                setTimeout(() => {
                    recognition.start();
                }, 2000);
        
              }
              else 
              readOut(`the weather condition in ${weather.name} is mostly full of
              ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
              recognition.stop()
              setTimeout(() => {
                recognition.start();
              }, 2000);
        
            });
            var data = JSON.parse(request.responseText);
           
            readOut(`the weather condition in ${data.name} is mostly full of
            ${data.weat[0].description} at a temperature of ${data.main.temp} degrees Celcius`);
            data.fetchWeather((data.results[0]).components.city);

      
          } else if (request.status <= 500){
            // We reached our target server, but it returned an error
      
            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log('error msg: ' + data.status.message);
          } else {
            console.log("server error");
          }
        };
      
        request.onerror = function() {
          // There was a connection error of some sort
          console.log("unable to connect to server");
        };
      
        request.send();  // make the request
    },
    getLocation: function() {
        function success (data){
            geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
        }
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(success, console.error);
        else {
            weather.fetchWeather("Barrie");
        }
    }
};


//news setup
async function getNews(){
    var url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=952912f2a18a4170a25ff2e9d360883f"
    var req = new Request(url)
    await fetch(req).then((response) => response.json())
    .then((data) => {
      console.log(data);
      let arrNews = data.articles
      arrNews.length = 10
      let a = []
      arrNews.forEach((e,index) => {
        a.push(index+1)
        a.push(".........")
        a.push(e.title)
        a.push(".........")
  
      });
      readOut(a)
    })
  }
  
  let date = new Date();
  // category news


  let yyyy,mm,dd
  
  dd = date.getDate()
  mm = date.getMonth()
  yyyy = date.getFullYear()
  
  async function getCategoryNews(category){
    var url =
      "https://newsapi.org/v2/everything?" +
      `q=${category}&` +
      `from=${yyyy}-${mm}-${dd}&` +
      "sortBy=popularity&" +
      "apiKey=952912f2a18a4170a25ff2e9d360883f";
  
      // https://newsapi.org/v2/everything?q=Apple&from=2021-09-19&sortBy=popularity&apiKey=API_KEY
  
      var req = new Request(url)
  
    await fetch(req).then((response) => response.json())
    .then((data) => {
      console.log(data);
      let arrNews = data.articles
      arrNews.length = 10
      let a = []
      arrNews.forEach((e,index) => {
        a.push(index+1)
        a.push(".........")
        a.push(e.title)
        a.push(".........")
      });
      readOut(a)
    })
  }


// speech recognition stop
recognition.onend = function(){

    console.log("Shut up mf");
};

startButton.addEventListener("click", () => {
    recognition.start()
})

stopButton.addEventListener("click", () => {
    recognition.stop()
})

//G U R U speech output

function readOut(message){
    const speech = new SpeechSynthesisUtterance()
    //different voices for Guru
    const allVoices = speechSynthesis.getVoices(2)
    speech.text = message;
    speech.voice = allVoices[1]
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
    createMsg("jmsg", message)
    console.log("speaking out")
}

//example


function autoJarvis() {
    setTimeout(() => {
      recognition.start();
    }, 5000);
  }


// on startup
window.onload = () => {
    initClock()
    jarvisComs.forEach((e) => {
        document.querySelector(".commands").innerHTML += `<p>#${e}</p><br />`;
    });
    
    turn_on.play();
      setTimeout(() => {
        readOut("Hello, I am Jarvis, your personal voice assistant. Please press the start button if I don't start listening automatically");
        autoJarvis();
        console.log("new")
      }, 500);
    
}

