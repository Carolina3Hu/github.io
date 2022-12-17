
const questions = [
    {
        question: "Qual é o único país do mundo que, em 2017, tinha mais mulheres no parlamento do que homens ?",
        optionA: "Reino Unido",
        optionB: "Noruega",
        optionC: "França",
        optionD: "Ruanda",
        correctOption: "optionD"
    },

    {
        question: "Qual foi o primeiro país a conceder o direito de votar e de ser eleito às mulheres ?",
        optionA: "França",
        optionB: "USA",
        optionC: "Finlândia",
        optionD: "Portugal",
        correctOption: "optionC"
    },

    {
        question: "Nos últimos 25 anos, o número de pessoas a viver na pobreza extrema ...",
        optionA: "Aumentou",
        optionB: "Diminuiu",
        optionC: "Estagnou",
        optionD: "Não sei",
        correctOption: "optionA"
    },

    {
        question: "Quantos países no mundo tinham uma mulher como Presidente ou Chefe de Estado em 2017?",
        optionA: "20",
        optionB: "5",
        optionC: "100",
        optionD: "60",
        correctOption: "optionA"
    },

    {
        question: "Quem deve limpar e cozinhar em casa?",
        optionA: "Homens",
        optionB: "Mulheres",
        optionC: "Não binários",
        optionD: "Todos",
        correctOption: "optionD"
    },

    {
        question: "Para reduzir as desigualdades na saúde, todas as crianças devem ter acesso a...",
        optionA: "Agua potável",
        optionB: "Cuidados de sáude",
        optionC: "Vacinas",
        optionD: "Todas",
        correctOption: "optionD"
    },

    {
        question: "Qual é a percentagem mundial de mulheres investigadoras na área da ciência e tecnologia?",
        optionA: "50%",
        optionB: "30%",
        optionC: "70%",
        optionD: "10%",
        correctOption: "optionB"
    },

    {
        question: "Quem é que corre mais risco de viver em situação de pobreza em Portugal?",
        optionA: "Homens",
        optionB: "Mulheres",
        optionC: "É igual",
        optionD: "Não sei",
        correctOption: "optionB"
    },

    {
        question: "Quantas pessoas vivem em bairros pobres nos países em desenvolvimento?",
        optionA: "30%",
        optionB: "55%",
        optionC: "80%",
        optionD: "10%",
        correctOption: "optionA"
    },

    {
        question: "Em Portugal, há quase o ... de homens a ocupar cargos de chefia do que mulheres.",
        optionA: "Dobro",
        optionB: "Quarto",
        optionC: "Terço",
        optionD: "Mesmo numero",
        correctOption: "optionA"
    },
]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer)
          {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
          }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color

    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
