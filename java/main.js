let startButton = document.querySelector(".game-body .start button");
let buttons = document.querySelectorAll(".game-body .player1 .buttons button ")
let rockButton = document.querySelector(".game-body .player1 .rock");
let scissorsButton = document.querySelector(".game-body .player1 .scissors");
let paperButton = document.querySelector(".game-body .player1 .paper");
let startDiv = document.querySelector(".game-body .start ")
let player2Image = document.querySelector(".game-body .player2 img")
let player2Text = document.querySelector(".game-body .player2 p")
let player1Div = document.querySelector(".game-body .player1")
let player2Div = document.querySelector(".game-body .player2")
let player1Choice = document.querySelector(".game-body .start .player1-choise ")
let player2Choice = document.querySelector(".game-body .start .player2-choise ")
let tableResult = document.querySelectorAll(".score table tr ")


let counter;
let nextRoundButton;
let index = 1;

let theWinner;
let player2;
let player1;
let player2Score = 0;
let player1Score = 0;
let newGameButton;
let result = [];
let availableAnswers;
let player1Icon;
let player2Icon;

startButton.addEventListener("click", () =>
{
    startDiv.innerHTML = ""
    clearInterval(counter)
    timer(5)
    compareAnswers()
    player2Image.src = "/images/waiting.png"
    player2Text.innerHTML = "Take your time ,i am waiting"


    player1Div.classList.add("active")
    player2Div.classList.add("active")
})

let timer = (seconds) =>
{
    let timerDiv = document.createElement("div");
    timerDiv.style.backgroundColor = "#ffc107"
    timerDiv.style.padding = "15px"
    timerDiv.style.borderRadius = "5px"
    timerDiv.style.fontSize = "1.3rem"
    timerDiv.innerHTML = "00:05"
    counter = setInterval(() =>
    {
        seconds--;
        if (seconds >= 10)
        {
            seconds = seconds
        } else
        {
            seconds = `0${ seconds }`
        }
        timerDiv.innerHTML = `00:${ seconds }`
        if (seconds == 0)
        {
            randomNumber = Math.floor(Math.random() * availableAnswers.length)
            player1 = availableAnswers[randomNumber]
            checker()
            
        }
    }, 1000)
    startDiv.appendChild(timerDiv)
}


let compareAnswers = () =>
{
    // make sure that user only select one time
    buttons.forEach(button =>
    {
        button.classList.remove("disabled")
    })
    

    // player2 Answer
    availableAnswers = ["rock", "scissors", "paper"]
    let randomNumber = Math.floor(Math.random() * availableAnswers.length)
    player2 = availableAnswers[randomNumber]
    buttons.forEach(button =>
    {
        button.addEventListener("click", (e) =>
        {
            
            
            player1 = e.target.dataset.type
            checker()
           
        })
        
    })

}

console.log(buttons)
let checker = () =>
{
    clearInterval(counter)
    player1Div.classList.remove("active")
    player2Div.classList.remove("active")

    startDiv.innerHTML = ""

    // to make sure user only select one time
   
        buttons.forEach(button =>
        {
            button.classList.add("disabled")
        })

    if (player1 == player2)
    {
        startDiv.innerHTML = "No Winner choose again"
        setTimeout(() =>
        {
            startButton.click()
        }, 3000)
        return true;

    } else if (player1 == "rock" && player2 == "scissors")
    {
        theWinner = "player1"
        player1Icon = `hand-back-fist`
        player2Icon = `hand-scissors`

    } else if (player1 == "rock" && player2 == "paper")
    {
        theWinner = "player2"
        player1Icon = `hand-back-fist`
        player2Icon = `hand`
    } else if (player1 == "scissors" && player2 == "rock")
    {
        theWinner = "player2"
        player1Icon = `hand-scissors`
        player2Icon = `hand-back-fist`

    } else if (player1 == "scissors" && player2 == "paper")
    {
        theWinner = "player1"
        player1Icon = `hand-scissors`
        player2Icon = `hand`
    } else if (player1 == "paper" && player2 == "rock")
    {
        theWinner = "player1"
        player1Icon = `hand`
        player2Icon = `hand-back-fist`

    } else if (player1 == "paper" && player2 == "scissors")
    {
        theWinner = "player2"
        player1Icon = `hand`
        player2Icon = `hand-scissors`
    }
    if (theWinner == "player2")
    {
        result.push("player2")
        player2Image.src = "/images/winner.png"
        player2Text.innerHTML = "This round is mine"
        tableResult[index].children[1].innerHTML = "Loser"
        tableResult[index].children[1].style.backgroundColor = "#f8d7da"
        tableResult[index].children[2].innerHTML = "Winner"
        tableResult[index].children[2].style.backgroundColor = "#d1e7dd"

    } else if (theWinner == "player1")
    {
        result.push("player1")
        player2Image.src = "/images/loser.png"
        player2Text.innerHTML = "No, you are a lucky one "
        tableResult[index].children[1].innerHTML = "Winner"
        tableResult[index].children[1].style.backgroundColor = "#d1e7dd"
        tableResult[index].children[2].innerHTML = "Loser"
        tableResult[index].children[2].style.backgroundColor = "#f8d7da"
    }

    startDiv.innerHTML = `The winner is ${ theWinner }`
    player1Choice.innerHTML = `<i data-type="rock" class="fas fa-${ player1Icon }"></i>`
    player2Choice.innerHTML = `<i data-type="rock" class="fas fa-${ player2Icon }"></i>`
    startDiv.appendChild(player1Choice)
    startDiv.appendChild(player2Choice)
    nextRoundButton = document.createElement("button")
    nextRoundButton.innerHTML = "Next round"
    startDiv.appendChild(nextRoundButton)
    nextRoundButton.addEventListener("click", () =>
    {
        index++
        if (index <= 3)
        {
            startButton.click()
        }
    })
    if (index == 3)
    {
        nextRoundButton.innerHTML = "result"
        nextRoundButton.addEventListener("click", () =>
        {
            // to get the winner
            let newResult = [];
            newResult.push(result[0])
            newResult.push(result[1])
            newResult.push(result[5])
            newResult.forEach(result =>
            {
                if (result == "player2")
                {
                    player2Score++
                } else
                {
                    player1Score++
                }
            })
            if (player2Score > player1Score)
            {
                startDiv.innerHTML = `And the winner is ....player2`
                player2Image.src = "/images/winner.png"
                player2Text.innerHTML = "Yes,i am the winner"
            } else
            {
                startDiv.innerHTML = `And the winner is ....player1`
                player2Image.src = "/images/loser.png"
                player2Text.innerHTML = "congratulations"
            }
            newGameButton = document.createElement("button")
            newGameButton.innerHTML = "New Game"
            newGameButton.addEventListener("click", () =>
            {
                document.location.reload()
            })
            startDiv.appendChild(newGameButton)

        })
    }


}
