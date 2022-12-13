const categoryApi = "https://opentdb.com/api_category.php"

fetch(categoryApi)
        .then(response => response.json())
        .then(data => data.trivia_categories)
        .then(categories => {
            categories.forEach(category => {
                const option = document.createElement('option')
                option.value = category.id
                option.innerText = category.name
                categorySelect.appendChild(option)
            })
})

let categoryUserSelection
let difficultyUserSelection
let typeUserSelection

function categorySelection(){
    let select = document.getElementById("categorySelect");
    let options=document.getElementsByTagName("option");
    categoryUserSelection = select.value
    return categoryUserSelection
}

function difficultySelection(){
    let select = document.getElementById("difficultySelect");
    let options=document.getElementsByTagName("option");
    difficultyUserSelection = select.value
    return difficultyUserSelection
}

function typeSelection(){
    let select = document.getElementById("typeSelect");
    let options=document.getElementsByTagName("option");
    typeUserSelection = select.value
    return typeUserSelection

}

let category = localStorage.getItem("category")
let difficulty = localStorage.getItem("difficulty")
let type = localStorage.getItem("type")



const gameApi = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`

https://opentdb.com/api.php?amount=10&category=14&difficulty=medium&type=boolean
https://opentdb.com/api.php?amount=10&category=13&difficulty=hard&type=boolean

fetch (gameApi)
        .then(response => response.json())
        .then(data => {
            console.log(data.results)
            return data.results
        })

        .then(questions => {
            if (questions[0].type != "boolean"){
                let score = 0
                localStorage.setItem("score", score)
            questions.forEach((question, index) => {
                const questionDiv = document.createElement('div')
                //questionDiv.setAttribute("id", `${index+1}`)
                questionDiv.classList.add('question')
                questionDiv.innerHTML = `
                    <div class="question-text">${question.question}</div>
                    <div class="answers" id="${index}">
                        <button class="answer answerA btn btn-light btn-sm">${question.correct_answer}</button>
                        <button class="answer answerB btn btn-light btn-sm">${question.incorrect_answers[0]}</button>
                        <button class="answer answerC btn btn-light btn-sm">${question.incorrect_answers[1]}</button>
                        <button class="answer answerD btn btn-light btn-sm">${question.incorrect_answers[2]}</button>
                    </div>
                `
                
                questionDiv.addEventListener('click', e => {
                    if(e.target.classList.contains('answer')){
                        
                        
                        function disableButtons(){
                            const questionId = document.getElementById(e.target.parentElement.id)
                            const buttons = questionId.querySelectorAll("button")
                            buttons.forEach(button => {
                                button.disabled = true
                            })
                        }




                        const selectedButton = e.target
                        const correct = selectedButton.innerText === question.correct_answer
                        // get local storage value and update if its correct

                        if (correct){
                            let score = localStorage.getItem("score")
                            score++
                            localStorage.setItem("score", score)
                            disableButtons()
                        }else{
                            disableButtons()
                        }
                        

                        setStatusClass(document.body, correct)
                        Array.from(selectedButton.parentElement.children).forEach(button => {
                            setStatusClass(button, button.innerText === question.correct_answer)
                        })
                    }     
            })
            let questionContainer = document.getElementById('questionsContainer')
                questionContainer.appendChild(questionDiv)
                })
            }else{
                
                console.log("entro en booleano")
                questions.forEach((question, index) => {

                    const questionDiv = document.createElement('div')
                    questionDiv.classList.add('question')
                    questionDiv.innerHTML = `
                        <div class="question-text">${question.question}</div>
                        <div class="answers info" id="${index + 1}">
                            <button class="answer answerA">${question.correct_answer}</button>
                            <button class="answer answerB">${question.incorrect_answers[0]}</button>
                        </div>
                    `

                    questionDiv.addEventListener('click', e => {
                        if(e.target.classList.contains('answer')){
                            const selectedButton = e.target
                            const correct = selectedButton.innerText === question.correct_answer

                            setStatusClass(document.getElementsByClassName("info"), correct)
                            Array.from(selectedButton.parentElement.children).forEach(button => {
                                setStatusClass(button, button.innerText === question.correct_answer)
                            })
                    }
                })
                let questionContainer = document.getElementById('questionsContainer')
                questionContainer.appendChild(questionDiv)
            })
        }
})

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


///

// Results

const score = localStorage.getItem("score")
const scoreDiv = document.getElementById("results")
scoreDiv.innerText = score * 100

const scorePercentage = (score*100)