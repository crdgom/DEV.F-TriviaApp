const categoryApi = "https://opentdb.com/api_category.php"

fetch(categoryApi)
        .then(response => response.json())
        .then(data => data.trivia_categories)
        .then(categories => {
            console.log(categories.id)
            categories.forEach(category => {
                const option = document.createElement('option')
                option.value = category.id
                option.innerText = category.name
                categorySelect.appendChild(option)
            })
        })

