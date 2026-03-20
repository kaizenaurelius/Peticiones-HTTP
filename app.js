function sendHTTPRequest(method, url, data) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {return response.json()});
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
async function getPosts() {

    const data = await sendHTTPRequest("GET", 'https://jsonplaceholder.typicode.com/posts');
    const listOfPosts =data;

    console.log(listOfPosts)

}