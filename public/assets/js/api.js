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

let categoryUserSelection = addEventListener("click", function (event) {
    if (event.target.id === "categorySelect") {
        let category = event.target.value;
        console.log(category);
        return category;
    }
})

let difficultyUserSelection = addEventListener("click", function (event) {
    if (event.target.id === "difficultySelect") {
        let difficulty = event.target.value;
        console.log(difficulty);
        return difficulty;
    }
})

let typeUserSelection = addEventListener("click", function (event) {
    if (event.target.id === "typeSelect") {
        let type = event.target.value;
        console.log(type);
        return type;
    }
})

async function getQuestions() {
    let category = categoryUserSelection;
    console.log(category);
    let difficulty = difficultyUserSelection;
    console.log(difficulty);
    let type = typeUserSelection;
    console.log(type);
    const questionApi = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`
    const response = await fetch(questionApi);
    const data = await response.json();
    return data.results;
}

getQuestions()