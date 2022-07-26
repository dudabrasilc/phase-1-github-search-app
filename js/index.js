

document.addEventListener("DOMContentLoaded", () => {


    function form() {
        // grab the form to add event listener
        const form = document.querySelector("#github-form");
        // add event listener to the form
        form.addEventListener("submit", (e) => {
                e.preventDefault();
                // grab input value from form
                let user = document.querySelector("input#search").value
                getUsers(user)
            }
        )
    }
    form()



    function getUsers(user) {
        // given a user, make a get request to github api
        fetch(`https://api.github.com/search/users?q=${user}`)
                .then(response => response.json())
                .then(users => {
                    // console.log(users.items)
                    const allUsers = users.items;
                    renderUsers(allUsers)
            }
        )
    }


    function renderUsers(allUsers) {    
            allUsers.forEach(userObj => {
                // console.log(userObj)
                // grab user list node from DOM
                const userList = document.querySelector("#user-list")
                // create li element
                const li = document.createElement("li")
                li.addEventListener('click', () => {
                    fetch(`https://api.github.com/users/${userObj.login}/repos`)
                    .then(response => response.json())
                    .then(repos => {
                        console.log(repos)
                        repos.forEach(repo => {
                        const ul = document.querySelector("#repos-list")
                        const repositories = document.createElement("li")
                        repositories.innerText = repo.name
                        ul.appendChild(repositories)
                        })
                    })
                })    
                li.textContent = `Login: ${userObj.login}, Avatar URL: ${userObj.avatar_url}, User URL: ${userObj.url}`
                // console.log(li)
                userList.appendChild(li)
            
            }
        )
    }







})

