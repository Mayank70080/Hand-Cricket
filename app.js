let userscore = 0;
let compscore = 0;
let turn = true;
let userbat = false; 
let compbat = false; 
let newbtn = document.querySelector("#newbtn");
let rstbtn = document.querySelector("#rstbtn");
let choices = document.querySelectorAll(".tos");
let plays = document.querySelectorAll(".play");
let choose = document.querySelector(".choice");
let choose1 = document.querySelector(".toss");
let runs = document.querySelectorAll(".nos");
let msg = document.querySelector("#msg");
let msg2 = document.querySelector("#msg2");
let msg3 = document.querySelector("#msg3");
let msgc = document.querySelector(".msgc")
let uscore = document.querySelector("#uscore");
let cscore = document.querySelector("#cscore");
let winner = document.querySelector(".winner");
let win = document.querySelector("#win");

choices.forEach((choice) => {
    choice.addEventListener ("click", () => {
        const userchoice = choice.getAttribute("id");
        toss(userchoice);
    })
})

const generatecompchoice = () => {
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const i = Math.floor(Math.random() * 10);
    return options[i];
}

const toss = (userchoice) => {
    const option = ["heads", "tails"];
    const i = Math.floor(Math.random() * 2);
    if(userchoice === option[i]) {
        choose.classList.remove("hide");
        choose1.classList.add("hide");
        msg2.innerText = "You won the toss! Would you like to bat or bowl first";
        plays.forEach((play) => {
            play.addEventListener ("click", () => {
                const batbowl = play.getAttribute("id");
                msg2.innerText = `You selected to ${batbowl} first`;
                setTimeout(function() {
                    playgame(batbowl);
                } , 2000)
            })
        })
    }
    else {
        const options = ["bat", "bowl"];
        const i = Math.floor(Math.random() * 2);
        msg2.innerText = `You lost the toss Comp selected to ${options[i]} first`;
        if(options[i] === "bat") {
            let batbowl = "bowl";
            setTimeout(function() {
                playgame(batbowl);
            } , 2000)
        }
        else {
            let batbowl = "bat";
            setTimeout(function() {
                playgame(batbowl);
            } , 2000)
        }
    }
}

const playgame = (batbowl) => {
    choose.classList.add("hide");
    choose1.classList.add("hide");
    msgc.classList.remove("hide");
    if(batbowl === "bat") {
        bat();
    }
    else {
        bowl();
    }
}

const bat = () => {
    let x = 0;
    let y = 0;
    enablebtn();
    msg2.innerText = "You are Batting";
    runs.forEach((run) => {
        run.addEventListener ("click", () => {
            let z = run.getAttribute("value");
            if(userbat === false) {
                y = generatecompchoice();
                x = parseInt(z);
                msg3.innerText = `Comp's move ${y}`;
                if(x != y) {
                    msg.innerText = `You scored ${x}`;
                    userscore += x;
                    uscore.innerText = userscore;
                }
                else if(x == y) {
                    msg2.innerText = "You got Out";
                    msg.innerText = `Your total is ${userscore}`;
                    userbat = true;
                    disablebtn();
                    if(turn === true) {
                        turn = false;
                        setTimeout(function() {
                            bowl();
                        } , 2000)
                    }
                    else {
                        checkwinner();
                    }
                }
                checkwinner1();
            }
        })
    })
}

const disablebtn = () => {
    for(run of runs) {
        run.disabled = true;
    }
}

const enablebtn = () => {
    for(run of runs) {
        run.disabled = false;
    }
}

const bowl = () => {
    let x = 0;
    let y = 0;
    enablebtn();
    msg2.innerText = "You are Bowling";
    runs.forEach((run) => {
        run.addEventListener ("click", () => {
            let z = run.getAttribute("value");
            if(compbat === false) {
                y = generatecompchoice();
                x = parseInt(z);
                msg.innerText = `Your Move ${x}`;
                if(x != y) {
                    msg3.innerText = `Comp scored ${y}`;
                    compscore += y;
                    cscore.innerText = compscore;
                }
                else if(x == y){
                    msg2.innerText = "Comp got Out";
                    msg3.innerText = `Comp's move ${y}`;
                    compbat = true;
                    disablebtn();
                    if(turn === true) {
                        turn = false;
                        setTimeout(function() {
                            bat();
                        } , 2000)
                    }
                    else {
                        checkwinner();
                    }
                }
                checkwinner1();
            }
        })
    })
}

const checkwinner = () => {
    if(userscore === compscore) {
        msg2.innerText = "Its a draw";
        win.innerText = "It's a Draw! Try Again";
        winner.classList.remove("hide");
        rstbtn.classList.add("hide");
        disablebtn();
    }
    else if(userscore > compscore) {
        msg2.innerText = "You Won";
        win.innerText = "Congrats! You Won";
        winner.classList.remove("hide");
        rstbtn.classList.add("hide");
        disablebtn();
    }
    else if(userscore < compscore) {
        msg2.innerText = "You lose";
        win.innerText = "You Lost! Wanna Try Again?";
        winner.classList.remove("hide");
        rstbtn.classList.add("hide");
        disablebtn();
    }
}

const checkwinner1 = () => {
    if(compbat === true && userscore > compscore) {
        msg2.innerText = "You Won";
        win.innerText = "Congrats! You Won";
        winner.classList.remove("hide");
        rstbtn.classList.add("hide");
        disablebtn();
    }
    else if(userbat === true && userscore < compscore) {
        msg2.innerText = "You lose";
        win.innerText = "You Lost! Wanna Try Again?";
        winner.classList.remove("hide");
        rstbtn.classList.add("hide");
        disablebtn();
    }
}

rstbtn.addEventListener("click", () => {
    window.location.reload();
})

newbtn.addEventListener("click", () => {
    window.location.reload();
})