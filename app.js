function sendHTTPRequest(method, url, data) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {return response.json()});
};

async function getPosts() {

    const data = await sendHTTPRequest("GET", 'https://jsonplaceholder.typicode.com/posts');
    const listOfPosts =data;

    console.log(listOfPosts)

}