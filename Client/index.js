const url = "http://localhost:3000/posts"
// Grab relevant HTML elements
const postContainer = document.getElementById("postContainer");

// Insert previous posts into postContainer


// GIF FUNCTIONALITY START ------------------------------------------------------------------------------------------------------------------- // 
const GIPHYForm = document.getElementById('GIPHYSearchForm')
const GIPHY_KEY = 'BZM019G18oCCblfou5NgheomVPbrjKsK';

// Displays search bar/button for GIPHY when clicked
function showGIPHY() {
    let x = document.querySelector(".GIPHYSearchInputContainer");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
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
    if (numberOfThumbs >= 6) {
        document.querySelector('#userInput').appendChild(img);
        img.id = "postGIF";
        let postGIF = document.getElementById("postGIF").src;
    }
    img.setAttribute('onclick', 'GIFReturn(this)');
    numberOfThumbs --;
}

// Appends the six GIFs returned from search into a div to be selected
function appendImage(giphy) { 
    const img = document.createElement('img'); 
    img.src = `${giphy}`; 
    img.className = "GIPHYResult";
    img.setAttribute('onclick','GIFClick(this)');
    document.getElementById('thumbs').appendChild(img);
}  

// Function to return selected GIF to the thumbnails
function GIFReturn(){
    const img = document.getElementById("postGIF");
    img.className = "GIPHYResult";
    img.id = "";
    img.setAttribute('onclick','GIFClick(this)');
    document.getElementById('thumbs').appendChild(img);
    numberOfThumbs ++;
}

// Variable storing how many gifs can be selected (to only allow one to be selected)
let numberOfThumbs = 0;

// Chained function with appendImage
function gotData(data) {
    for (let i = 0; i < data.data.length; i++) {
        appendImage(data.data[i].images.original.url)
        numberOfThumbs ++;
    }
}

// Event listener for searching for GIFs
GIPHYForm.addEventListener("click", e => {
    e.preventDefault()
    document.querySelectorAll('.GIPHYResult').forEach(e => e.remove());
    const searchTerm = document.getElementById('GIPHYsearchInput').value;
    giphySearch(searchTerm)  
})
// GIF FUNCTIONALITY END ------------------------------------------------------------------------------------------------------------------- //



// ADD NEW POST FUNCTIONALITY START ------------------------------------------------------------------------------------------------------------------- //
// Upon submit, display user input on current page
document.addEventListener("submit", e => {
    e.preventDefault();

    // Grab textContent of post title and post body
    // Ensure you use .value to access the input the user makes
    let postTitle = document.getElementById("postTitle").value;
    let postBody = document.getElementById("postBody").value;
    let gifUrl = document.getElementById('postGIF').src;

    // Update page with new post - create article, h2, and p tags for new post
    let article = document.createElement("article");
    let articleHead = document.createElement("h2");
    let articleBody = document.createElement("p");
    let articleGIF = document.createElement("img");

    // Populate elements
    articleHead.textContent = postTitle;
    articleBody.textContent = postBody;
    articleGIF = postGIF;

    // Append title, body and image to article
    article.appendChild(articleHead);
    article.appendChild(articleBody);
    article.appendChild(articleGIF);
    postContainer.appendChild(article);

    // Make gif menu not invisible upon posting
    document.getElementById('thumbs').style.visibility = 'hidden';
    document.getElementById('thumbs').style.position = 'absolute';

    // Clear text from input forms
    document.getElementById("postTitle").value = "";
    postBody = document.getElementById("postBody").value = "";
});
// ADD NEW POST FUNCTIONALITY END ------------------------------------------------------------------------------------------------------------------- //



// SEND TO SERVER FUNCTIONALITY START ------------------------------------------------------------------------------------------------------------------- //
// Upon submit, send user input to server
document.addEventListener("submit", e => {
    e.preventDefault();

    let postTitle = document.getElementById("postTitle").value;
    let postBody = document.getElementById("postBody").value;

    // Creating post object to store user post
    let post = {title: postTitle, body: postBody, gifUrl: "gifUrl"}

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

    displayEmoji()
});
// SEND TO SERVER FUNCTIONALITY END ------------------------------------------------------------------------------------------------------------------- //



// DISCARD FUNCTIONALITY START ------------------------------------------------------------------------------------------------------------------- //
const discard = document.getElementById("Discard")
discard.addEventListener("click", e => {
    if (confirm("Are you sure you want to discard your post?")){
        window.location.reload();
    } else {
        // Do nothing
    }
})
// DISCARD FUNCTIONALITY END ------------------------------------------------------------------------------------------------------------------- //


// EMOJI FUNCTIONALITY START ------------------------------------------------------------------------------------------------------------------- //
const laugh = document.querySelector('#laugh');
const love = document.querySelector('#love');
const cry = document.querySelector('#cry');

let laughCount = 0;
let loveCount = 0;
let cryCount = 0;

const accumulateLaughCounts = () => {
    laughCount++;
    const totalCounts = document.querySelector('.laugh-count');
    totalCounts.textContent = laughCount; 
}

const accumulateLoveCounts = () => {
    loveCount++;
    const totalCounts = document.querySelector('.love-count');
    totalCounts.textContent = loveCount; 
}

const accumulateCryCounts = () => {
    cryCount++;
    const totalCounts = document.querySelector('.cry-count');
    totalCounts.textContent = cryCount; 
}

love.addEventListener('click', accumulateLoveCounts);
laugh.addEventListener('click', accumulateLaughCounts);
cry.addEventListener('click', accumulateCryCounts);


function displayEmoji() {
    document.querySelector('#emojis').style.visibility = "visible"
};

// Character Count
const titleCharacter = document.querySelector('.title-count');
let postTitle = document.getElementById("postTitle");

function countCharacters() {
    let maxLength = 100;
    let length = postTitle.value.length;
    
    if (length < maxLength) {
        titleCharacter.textContent = `Remaining Characters: ${length}/${maxLength}`
    } else {
        titleCharacter.textContent = `Max characters: ${maxLength}`
    }
}

postTitle.addEventListener('keydown', countCharacters);
// EMOJI FUNCTIONALITY END ------------------------------------------------------------------------------------------------------------------- //