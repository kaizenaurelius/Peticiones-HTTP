
const fetchButton = document.querySelector('#available-posts button');
const formElement = document.querySelector('#new-post form');
const postButton = document.querySelector('#new-post button')

function sendHTTPRequest(method, url, data) {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
    }

    if (data && method.toUpperCase() !== 'GET'){
        options.body = JSON.stringify(data);
    }
    return fetch(url, options).then((response) => response.json());
};


// Funcion que crea el esqueleto del post y se ejecutara en el for de la funcion de renderizado

function createPostsElements(post){ //elemento post es la respuesta del get, es decir data

    const postContainer = document.createElement('article');
    postContainer.id = post.id
    postContainer.classList.add("post-item");

    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title

    const postBody = document.createElement('p');
    postBody.textContent = post.body

    const postDeleteButton = document.createElement('button')
    postDeleteButton.textContent = "DELETE Post"
    postDeleteButton.addEventListener('click', async () => {
        
        const deletedPost = await sendHTTPRequest("DELETE", `https://jsonplaceholder.typicode.com/posts/${post.id}`)

        console.log(postContainer)
        alert(`Post con id ${post.id} eliminado`)
        postContainer.remove();
    })

    postContainer.append(postTitle, postBody, postDeleteButton);

    return postContainer;

}
async function renderPosts() {

    const listOfHTMLElements = document.getElementById("posts-container");

    listOfHTMLElements.innerHTML = '<p>Cargando posts...</p>'; //mensaje de carga y al mismo tiempo, borra anterior lista

    try {

        const listOfPosts = await sendHTTPRequest("GET", 'https://jsonplaceholder.typicode.com/posts')

        listOfHTMLElements.innerHTML = '';  //Vaciando mensaje de carga

        for (const post of listOfPosts) {

            const postHTMLElement = createPostsElements(post)
            listOfHTMLElements.append(postHTMLElement);
        }
    }catch (error) {
        console.error("Falla al renderizar", error);
        listOfHTMLElements.innerHTML = '<p style="color: red;">Hubo un error al cargar.</p>';
    }

}

async function postDataToAPI(title, content) {
    const postData = {
        title: title,
        body: content,
        userId: 1
    }


    try {
        const responseData = await sendHTTPRequest("POST", 'https://jsonplaceholder.typicode.com/posts', postData);

        console.log('Enviado al servidor', responseData)
        alert('Post creado con exito');
    }catch (error){
        console.error('Hubo un error', error);
        alert('Hubo un error')
    }


}
    


fetchButton.addEventListener('click', renderPosts);
formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const enteredTitle = document.getElementById('title').value;
    const enteredContent = document.getElementById('content').value;
    console.log(enteredTitle);
    console.log(enteredContent);


    postDataToAPI(enteredTitle, enteredContent);

    event.target.reset()
})

