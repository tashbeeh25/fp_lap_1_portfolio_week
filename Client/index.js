//document.addEventListener("DOMContentLoaded", e => {
    const url = "http://localhost:3000/posts"
    // Grab relevant HTML elements
    const postContainer = document.getElementById("postContainer");

    // Insert previous posts into postContainer
    let article = document.createElement("article");
    
    // Start Add gif functionality //
    const GIPHYForm = document.getElementById('GIPHYSearchForm')
    const GIPHY_KEY = 'BZM019G18oCCblfou5NgheomVPbrjKsK';
    
    // Displays search bar/button for GIPHY when clicked
    function showGIPHY() {
        let x = document.querySelector(".GIPHYSearchInputContainer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    }
    
    // Calls a fetch on GIPHY API and returns 6 images into div called "thumbs"
    function giphySearch(keyword) {
        return fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${GIPHY_KEY}&limit=6`)
        .then(response => response.json())
        .then(jsonData => gotData(jsonData))
    }
    
    // Appends clicked GIF to journal entry form
    function GIFClick(img){
         document.querySelector('#userInput').appendChild(img);
         img.id = "postGIF";
         let postGIF = document.getElementById("postGIF").src;
         //article.appendChild(img);
    }
    
    // appends the six GIFs returned from search into a div to be selected
    function appendImage(giphy) { 
        const img = document.createElement('img'); 
        img.src = `${giphy}`; 
        img.className = "GIPHYResult";
        img.setAttribute('onclick','GIFClick(this)');
        document.getElementById('thumbs').appendChild(img);
    }  
    
    // Chained function with appendImage
    function gotData(data) {
        for (let i = 0; i < data.data.length; i++) {
        appendImage(data.data[i].images.original.url)
        }
    }
    
    // Event listener for searching for GIFs
    GIPHYForm.addEventListener("click", e => {
        e.preventDefault()
        document.querySelectorAll('.GIPHYResult').forEach(e => e.remove());
        const searchTerm = document.getElementById('GIPHYsearchInput').value;
        giphySearch(searchTerm)  
    })
    
    // Upon submit, display user input on current page
    // How do you do this with a callback instead of an arrow function?
    document.addEventListener("submit", e => {
        e.preventDefault();

        // Grab textContent of post title and post body
        // Ensure you use .value to access the input the user makes
        let postTitle = document.getElementById("postTitle").value;
        let postBody = document.getElementById("postBody").value;
        

        // Update page with new post - create article, h2, and p tags for new post
        let articleHead = document.createElement("h2");
        let articleBody = document.createElement("p");
        let articleGIF = document.createElement("img");

        // Populate elements
        articleHead.textContent = postTitle;
        articleBody.textContent = postBody;
        articleGIF = postGIF;

        // Append title and body to article
        article.appendChild(articleHead);
        article.appendChild(articleBody);
        article.appendChild(articleGIF);
        postContainer.appendChild(article);
    });

    // Upon submit, send user input to server
    document.addEventListener("submit", e => {
        e.preventDefault();

        let postTitle = document.getElementById("postTitle").value;
        let postBody = document.getElementById("postBody").value;

        // Creating post object to store user post
        let post = {title: postTitle, body: postBody, gifUrl: "#"}

        let options = {
            method: 'POST',
            headers: {
                'ContentType': 'application/json'
            },
            body: JSON.stringify(post)
        }
        
        fetch('http://localhost:3000/posts', options)
        .then(r => r.json())
        .catch(console.warn);
    });

    // const discard = document.getElementById("Discard")
    // document.addEventListener("click", e => {
    //     e.preventDefault();

    //     let postTitle = document.getElementById("postTitle").value;
    //     let postBody = document.getElementById("postBody").value;
        
    //     postTitle = "";
    //     postBody = "";
    // })

//})


// Add emoji functonality

// Discard button resets title and body