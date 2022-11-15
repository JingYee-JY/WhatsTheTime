const start = document.querySelector(".start");
const startButton = document.querySelector(".startButton");
const selection = document.querySelector(".selection");
const easyButton = document.querySelector(".easyButton");
const normalButton = document.querySelector(".normalButton");
const hardButton = document.querySelector(".hardButton");
const game = document.querySelector(".game");
const number = document.querySelector(".number");
const questionImage = document.querySelector(".questionImage");
const popUp = document.querySelector(".popUp");
const background = document.querySelector(".background");
const showAnswer = document.querySelector(".answer");
const image = document.querySelector(".image");
const final = document.querySelector(".final");
const againButton = document.querySelector(".againButton");
const homeButton = document.querySelector(".homeButton");

const clickSound = document.getElementById("click")
const clap = document.getElementById("clap")
const correct = document.getElementById("correct")
const wrong = document.getElementById("wrong")

let total;
let current;
let difficulty;

let answer;

let tempoArray = [];

let questions = [
    {picture:"NightTime", time:"7 pm", wrongTime:"10am"}, 
    {picture:"LunchTime", time:"12am", wrongTime:"8 pm"}, 
    {picture:"BreakfastTime", time:"7 am", wrongTime:"3 pm"}, 
    {picture:"BedTime", time:"9 pm", wrongTime:"5 am" }, 
    {picture:"TeaTime", time:"5 pm", wrongTime:"11am"}, 
    {picture:"SunRise", time:"7 am", wrongTime:"6 pm"}]

let normalClock = ["n1","n2","n3","n4","n5","n6","n7","n8","n9","n10","n11","n12","n13","n14","n15","n16","n17","n18","n19","n20","n21","n22","n23","n24"]

let hardClock = ["h1","h2","h3","h4","h5","h6","h7","h8","h9","h10","h11","h12","h13","h14","h15","h16","h17","h18","h19","h20","h21","h22","h23","h24"]

startButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        start.classList.add("hide")
        selection.classList.remove("hide")
    }, 200);
})

easyButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        difficulty = "easy"
        ready()
    }, 200);
})

normalButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        difficulty = "normal"
        ready()
    }, 200);
})

hardButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        difficulty = "hard"
        ready()
    }, 200);
})

function ready(){
    selection.classList.add("hide")
    game.classList.remove("hide")
    
    total = 5;
    current = 0;

    tempoArray = []
    for(let i = 0; i < questions.length; i++){
        tempoArray.push(questions[i])
    }

    Question()
}

function Question(){
    current += 1;

    if(current > total){
        clap.currentTime = 0
        clap.play()
        game.classList.add("hide")
        final.classList.remove("hide")
        return
    }

    number.innerHTML = `${current} / ${total}`

    let randomQuestion = Math.floor(Math.random() * tempoArray.length)

    questionImage.src = "./img/" + tempoArray[randomQuestion].picture + ".png"

    let newTime;
    let random = [1, 2]
    if(difficulty == "easy"){
        for(let c = 1; c < 3; c++){
            let btnClass = "btn" + c
            let btn = document.querySelector(`.${btnClass}`)

            let randomNumber = Math.floor((Math.random() * random.length))
            let randomChoice = random[randomNumber] > 1 ? "time" : "wrongTime"

            let tempoTime = tempoArray[randomQuestion][randomChoice].substring(0,2)
            let duration = tempoArray[randomQuestion][randomChoice].substring(2,4)

            if(randomChoice == "wrongTime"){
                tempoTime = parseInt(tempoTime)
                let range = Math.floor(Math.random() * 2) + 1
                let symbol = Math.random() > 0.5 ? "p" : "m"
                if(symbol == "p"){
                    tempoTime = tempoTime + range
                }
                if(symbol == "m"){
                    tempoTime = tempoTime - range
                }
                newTime = tempoTime + duration
            }
            else{
                tempoTime = parseInt(tempoTime)
                newTime = tempoTime + duration
                answer = newTime
            }
            if(duration == "am"){
                if(tempoTime < 10){
                    tempoTime = "0" + tempoTime
                }
            }
            if(duration == "pm"){
                tempoTime = tempoTime + 12
            }
            tempoTime = tempoTime.toString()
            tempoTime = tempoTime + ":00"

            btn.innerHTML =`
            <img class="clock" src="./img/digtalClock.png">
            <p class="time">${tempoTime}</p>`

            btn.setAttribute("data", newTime)

            random.splice(randomNumber, 1)
        }
    }

    if(difficulty == "normal"){
        for(let c = 1; c < 3; c++){
            let btnClass = "btn" + c
            let btn = document.querySelector(`.${btnClass}`)

            let randomNumber = Math.floor((Math.random() * random.length))
            let randomChoice = random[randomNumber] > 1 ? "time" : "wrongTime"

            let tempoTime = tempoArray[randomQuestion][randomChoice].substring(0,2)
            let duration = tempoArray[randomQuestion][randomChoice].substring(2,4)

            if(randomChoice == "wrongTime"){
                tempoTime = parseInt(tempoTime)
                let range = Math.floor(Math.random() * 2) + 1
                let symbol = Math.random() > 0.5 ? "p" : "m"
                if(symbol == "p"){
                    tempoTime = tempoTime + range
                }
                if(symbol == "m"){
                    tempoTime = tempoTime - range
                }
                newTime = tempoTime + duration
            }
            else{
                tempoTime = parseInt(tempoTime)
                newTime = tempoTime + duration
                answer = newTime
            }
            console.log(tempoTime, duration)
            if(duration == "pm"){
                tempoTime = tempoTime + 12
                console.log(tempoTime)
            }
            let image = normalClock[tempoTime - 1]

            btn.innerHTML =`
            <img class="clock" src="./img/${image}.png">`

            btn.setAttribute("data", newTime)

            random.splice(randomNumber, 1)
        }
    }

    if(difficulty == "hard"){
        for(let c = 1; c < 3; c++){
            let btnClass = "btn" + c
            let btn = document.querySelector(`.${btnClass}`)

            let randomNumber = Math.floor((Math.random() * random.length))
            let randomChoice = random[randomNumber] > 1 ? "time" : "wrongTime"

            let tempoTime = tempoArray[randomQuestion][randomChoice].substring(0,2)
            let duration = tempoArray[randomQuestion][randomChoice].substring(2,4)

            if(randomChoice == "wrongTime"){
                tempoTime = parseInt(tempoTime)
                let range = Math.floor(Math.random() * 2) + 1
                let symbol = Math.random() > 0.5 ? "p" : "m"
                if(symbol == "p"){
                    tempoTime = tempoTime + range
                }
                if(symbol == "m"){
                    tempoTime = tempoTime - range
                }
                newTime = tempoTime + duration
            }
            else{
                tempoTime = parseInt(tempoTime)
                newTime = tempoTime + duration
                answer = newTime
            }
            if(duration == "pm"){
                tempoTime = tempoTime + 12
                console.log(tempoTime)
            }
            let image = hardClock[tempoTime - 1]

            btn.innerHTML =`
            <img class="clock" src="./img/${image}.png">`

            btn.setAttribute("data", newTime)

            random.splice(randomNumber, 1)
        }
    }


    tempoArray.splice(randomQuestion,1)
}

for(let b = 1; b < 3; b++){
    let btnClass = "btn" + b
    let btn = document.querySelector(`.${btnClass}`)

    btn.addEventListener("click", ()=>{
        console.log(answer)
        let data = btn.getAttribute("data")
        popUp.classList.remove("hide")
        if(data == answer){
            correct.currentTime = 0
            correct.play()
            console.log("correct")
            background.style.backgroundColor = "#28AD4D"
            image.src = "./img/correct.png"
            let delay = setTimeout(()=>{
                popUp.classList.add("hide")
                Question()
            },1500)
        }
        if(data != answer){
            wrong.currentTime = 0
            wrong.play()
            console.log("wrong")
            background.style.backgroundColor = "#DD1E1E"
            image.src = "./img/wrong.png"
            let delay = setTimeout(()=>{
                popUp.classList.add("hide")
            },1500)
        }

        showAnswer.innerHTML = `Time: ${data}`
    })
}

againButton.addEventListener("click", () =>{
    playClickSound()
    let daley = setTimeout(() =>{
        final.classList.add("hide")
        start.classList.remove("hide")
    }, 200)
})

homeButton.addEventListener("click", ()=>{
    playClickSound()
    let daley = setTimeout(() =>{
        location.assign('https://gimme.sg/activations/dementia/');
    }, 200)
})


function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });