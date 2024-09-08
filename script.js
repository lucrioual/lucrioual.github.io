// Variable to store posts
let posts = [];
let currentFilter = null; // To track the current filter applied

// Function to fetch posts from JSON file
async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        posts = await response.json();
        initializeBlog(); // Initialize blog after loading posts
    } catch (error) {
        console.error('Failed to load posts:', error);
    }
}

// Function to render posts
function renderPosts(filteredPosts) {
    const blogPostsDiv = document.getElementById('blog-posts');
    blogPostsDiv.innerHTML = '';
    filteredPosts.forEach(post => {
        const postElement = document.createElement('article');
        
        // Build content string
        let postContent = `
            <div class="extractbox"><div class="commoncontent">${post.content}</div>
        `;
        
        // Include author if not empty
        if (post.author && post.author.trim() !== '') {
            postContent += `<div class="extractatt"><span class="pilcrow">&#xb6;</span> <span class="author" data-author="${post.author}">${post.author}</span>`;
        }

        // Include authoref if not empty
        if (post.authoref && post.authoref.trim() !== '') {
            postContent += `&nbsp;<span class="pilcrow">&sect;</span> <span class="authoref" data-authoref="${post.authoref}">${post.authoref}</span>`;
        }

        // Include booktitle if not empty
        if (post.booktitle && post.booktitle.trim() !== '') {
            postContent += `<br>&nbsp;&nbsp;<span class="booktitle" data-booktitle="${post.booktitle}">${post.booktitle}</span></div>`;
        }

        postContent += '</div>';
        
        // Set the innerHTML of postElement
        postElement.innerHTML = postContent;

        blogPostsDiv.appendChild(postElement);
    });

    // Add click event listeners to authors
    document.querySelectorAll('.author').forEach(authorElement => {
        authorElement.addEventListener('click', () => {
            const author = authorElement.getAttribute('data-author');
            filterPostsByAuthor(author);
            updateSelectedHeader(`${author}`);
        });
    });

    // Add click event listeners to authoref
    document.querySelectorAll('.authoref').forEach(authorefElement => {
        authorefElement.addEventListener('click', () => {
            const authoref = authorefElement.getAttribute('data-authoref');
            filterPostsByAuthoref(authoref);
            updateSelectedHeader(`${authoref}`);
        });
    });

    // Add click event listeners to booktitles
    document.querySelectorAll('.booktitle').forEach(booktitleElement => {
        booktitleElement.addEventListener('click', () => {
            const booktitle = booktitleElement.getAttribute('data-booktitle');
            filterPostsByBooktitle(booktitle);
            updateSelectedHeader(`${booktitle}`);
        });
    });
}


// Function to render authors in the sidebar
function renderAuthors(posts) {
    const authorsSet = new Set();
    posts.forEach(post => {
        if (post.author && post.author.trim() !== '') {
            authorsSet.add(post.author);
        }
    });

    const authorList = document.getElementById('author-list');
    authorList.innerHTML = '';
    Array.from(authorsSet).sort().forEach(author => {
        const authorItem = document.createElement('li');
        authorItem.classList.add("alist");
        authorItem.innerHTML = `${author} <span class="postcount">&nbsp;${countPostsByAuthor(author)}</span>`; // Show count next to author
        authorItem.addEventListener('click', () => {
            filterPostsByAuthor(author);
            updateSelectedHeader(`${author}`);
        });
        authorList.appendChild(authorItem);
    });
}


 /*const selectedHeader = document.createElement('div');
    selectedHeader.id = 'selected-header';
    selectedHeader.classList.add('hidden');
    selectedHeader.classList.add('selected-header'); // Add a CSS class for custom styling
    document.body.insertBefore(selectedHeader, document.getElementById('blog-posts'));
*/



// Function to render authoref in the sidebar
function renderAuthoref(posts) {
    const authorefSet = new Set();
    posts.forEach(post => {
        if (post.authoref && post.authoref.trim() !== '') {
            authorefSet.add(post.authoref);
        }
    });



    const authorefList = document.getElementById('authoref-list');
    authorefList.innerHTML = '';
    Array.from(authorefSet).sort().forEach(authoref => {
        const authorefItem = document.createElement('li');
        authorefItem.innerHTML = `${authoref} <span class="postcount">&nbsp;${countPostsByAuthoref(authoref)}</span>`; // Show count next to authoref
        authorefItem.style.cursor = 'pointer'; // Indicate that it's clickable
        authorefItem.addEventListener('click', () => {
            filterPostsByAuthoref(authoref);
            updateSelectedHeader(`${authoref}`);
        });
        authorefList.appendChild(authorefItem);
    });
}

// Function to count the number of posts by a specific author
function countPostsByAuthor(author) {
    return posts.filter(post => post.author === author).length;
}

// Function to count the number of posts by a specific authoref
function countPostsByAuthoref(authoref) {
    return posts.filter(post => post.authoref === authoref).length;
}

// Function to count the number of posts with a specific booktitle
function countPostsByBooktitle(booktitle) {
    return posts.filter(post => post.booktitle === booktitle).length;
}



// Function to render book titles for a specific author
function renderBookTitlesForAuthor(author) {
    const booktitlesSet = new Set();
    posts.forEach(post => {
        if (post.author === author && post.booktitle && post.booktitle.trim() !== '') {
            booktitlesSet.add(post.booktitle);
        }
    });

    const booktitleList = document.getElementById('booktitle-list');
    booktitleList.innerHTML = ''; // Clear existing book titles


    if (booktitlesSet.size > 0) {
        booktitleList.classList.remove('hidden');
        const booktitleUl = document.createElement('ol');
        booktitleUl.classList.add('titlelist');
        Array.from(booktitlesSet).sort().forEach(booktitle => {
            const booktitleItem = document.createElement('li');
            booktitleItem.classList.add('titlelistitem');
            booktitleItem.innerHTML = `${booktitle} <span class="postcount">&nbsp;${countPostsByBooktitle(booktitle)}</span>`; // Show count next to booktitle
            booktitleItem.style.cursor = 'pointer'; // Indicate that it's clickable
            booktitleItem.addEventListener('click', () => {
                filterPostsByBooktitle(booktitle);
                updateSelectedHeader(`${booktitle}`);
            });
            booktitleUl.appendChild(booktitleItem);
        });
        booktitleList.appendChild(booktitleUl);
    } else {
        booktitleList.classList.add('hidden'); // Hide if no book titles
    }
}

// Function to render book titles
function renderBookTitles() {
    const booktitlesSet = new Set();
    posts.forEach(post => {
        if (post.booktitle && post.booktitle.trim() !== '') {
            booktitlesSet.add(post.booktitle);
        }
    });

    const booktitleList = document.getElementById('booktitle-list');
    booktitleList.innerHTML = '';
    Array.from(booktitlesSet).sort().forEach(booktitle => {
        const booktitleItem = document.createElement('li');
        booktitleItem.innerHTML = `${booktitle} (${countPostsByBooktitle(booktitle)})`; // Show count next to booktitle
        booktitleItem.style.cursor = 'pointer'; // Indicate that it's clickable
        booktitleItem.addEventListener('click', () => {
            filterPostsByBooktitle(booktitle);
            updateSelectedHeader(`${booktitle}`);
        });
        booktitleList.appendChild(booktitleItem);
    });
}

// Function to filter posts by a specific authoref
function filterPostsByAuthoref(authoref) {
    currentFilter = { type: 'authoref', value: authoref }; // Set the current filter
    const filteredPosts = posts.filter(post => post.authoref === authoref);

    renderPosts(filteredPosts);
}

// Function to filter posts by a specific booktitle
function filterPostsByBooktitle(booktitle) {
    currentFilter = { type: 'booktitle', value: booktitle }; // Set the current filter
    const filteredPosts = posts.filter(post => post.booktitle === booktitle);

    renderPosts(filteredPosts);
}

// Function to show only the selected sidebar view
function showSidebarView(view) {
    document.getElementById('author-list').classList.add('hidden');
    document.getElementById('authoref-list').classList.add('hidden');
    document.getElementById('booktitle-list').classList.add('hidden');

    if (view === 'authors') {
        document.getElementById('author-list').classList.remove('hidden');
        renderAuthors(posts);
    } else if (view === 'authoref') {
        document.getElementById('authoref-list').classList.remove('hidden');
        renderAuthoref(posts);
    }
}


// Function to update the selected header
function updateSelectedHeader(text) {
    const selectedHeader = document.getElementById('selected-header');
    selectedHeader.textContent = text;
    selectedHeader.classList.remove('hidden'); // Ensure the header is visible
}


// Function to filter posts by a specific author
function filterPostsByAuthor(author) {
    currentFilter = { type: 'author', value: author }; // Set the current filter
    const filteredPosts = posts.filter(post => post.author === author);

    renderPosts(filteredPosts);
    renderBookTitlesForAuthor(author); // Render book titles for the selected author
}


// Initialize the blog
function initializeBlog() {
    // Add a div to show the selected author, authoref, or booktitle
    const selectedHeader = document.createElement('div');
    selectedHeader.id = 'selected-header';
    selectedHeader.classList.add('hidden');
    selectedHeader.classList.add('selected-header'); // Add a CSS class for custom styling
    document.body.insertBefore(selectedHeader, document.getElementById('blog-posts'));

    // Add a div for the authoref link
    const authorefLinkDiv = document.createElement('div');
    authorefLinkDiv.id = 'authoref-link';
    authorefLinkDiv.classList.add('hidden'); // Hide initially
    document.body.insertBefore(authorefLinkDiv, document.getElementById('blog-posts'));

    // Clear posts initially
    const blogPostsDiv = document.getElementById('blog-posts');
    blogPostsDiv.innerHTML = '';

    // Show authors by default
    showSidebarView('authors'); 

    // Also render book titles by default
    renderBookTitles(); 

    // Add click event listeners to sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const view = link.getAttribute('data-view');
            showSidebarView(view);
        });
    });
}

// Run the loadPosts function when the page loads
window.onload = loadPosts;
