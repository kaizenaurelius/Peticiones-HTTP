
const fetchButton = document.querySelector('#available-posts button');

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


fetchButton.addEventListener('click', renderPosts);