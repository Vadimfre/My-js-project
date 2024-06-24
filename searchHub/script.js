const mainEL = document.querySelector('.main')
const wrapper = document.createElement('div')

const formEl = document.createElement('form')
formEl.addEventListener("submit", async (e)=>{
    e.preventDefault()
    
    const inputValues = Object.fromEntries(new FormData(e.target))
    const url = `https://api.github.com/users/${inputValues.name}`
    const response = await fetch(url)

    if (response.ok){
        const data = await response.json()
        mainEL.appendChild(wrapper)
        inputEl.value = ''
        wrapper.appendChild(createProfileEl(data))
    }else{
        alert("Пользователь не найден")
    }

})  

const inputEl = document.createElement("input")
inputEl.classList.add("search-input")
inputEl.setAttribute("name", "name")

const searchButtonEl = document.createElement("button")
searchButtonEl.classList.add("search-button")
searchButtonEl.setAttribute("type", "submit")
searchButtonEl.innerHTML = "Поиск"

formEl.appendChild(inputEl)
formEl.appendChild(searchButtonEl)
mainEL.appendChild(formEl)

function createProfileEl(profileData) {
    const element = document.createElement('div')
    element.classList.add('profile')
    element.innerHTML = `
    <img class ="search-image" src=${profileData.avatar_url}></img>
    <p class="search-text"><span>Имя: </span>${profileData.name}</p>
    <p class="search-text"><span>Город: </span>${profileData.loaction}</p>
    <p class="search-text"><span>О себе: </span>${profileData.bio}</p>
    `
    element.appendChild(createDeleteBtn())
    return element
}

function createDeleteBtn () {
    const element = document.createElement('button')
    element.classList.add('delete-button')
    element.innerHTML = 'Удалить'
    element.addEventListener('click', (e) => {
        wrapper.innerHTML = ''

    })
    return element
}