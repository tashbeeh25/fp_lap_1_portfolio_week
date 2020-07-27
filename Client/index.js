document.addEventListener("DOMContentLoaded", e => {
    const url = "http://localhost:3000/posts"
    // Grab relevant HTML elements
    const postContainer = document.getElementById("postContainer");

    // Insert previous posts into postContainer
    
    
    // Upon submit, display user input on current page
    // How do you do this with a callback instead of an arrow function?
    document.addEventListener("submit", e => {
        e.preventDefault();

        // Grab textContent of post title and post body
        // Ensure you use .value to access the input the user makes
        let postTitle = document.getElementById("postTitle").value;
        let postBody = document.getElementById("postBody").value;

        // Update page with new post - create article, h2, and p tags for new post
        let article = document.createElement("article");
        let articleHead = document.createElement("h2");
        let articleBody = document.createElement("p");

        // Populate elements
        articleHead.textContent = postTitle;
        articleBody.textContent = postBody;

        // Append title and body to article
        article.appendChild(articleHead);
        article.appendChild(articleBody);
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

        displayEmoji()
    });


})


// Add emoji functonality

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

function countCharacters() {
    let maxLength = 100;
    let length = postTitle.value.length;
    // let remainingLength = maxLength - length;
    
    if(length > maxLength) {
        titleCharacter.textContent = `Exceeded character limit: ${length}/${maxLength}`
    } else if (length < maxLength) {
        titleCharacter.textContent = `Remaining Characters: ${length}/${maxLength}`
    } else {
        titleCharacter.textContent = `Max characters: ${maxLength}`
    }
}

let postTitle = document.getElementById("postTitle");
postTitle.addEventListener('keydown', countCharacters);


// Add gif functionality

// Discard button resets title and body