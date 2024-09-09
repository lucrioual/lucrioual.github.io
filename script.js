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

      if (post.tags && post.tags.length >= 1) {
                postContent += ` <span class="pilcrow">&#8627;</span> ${post.tags.map(tag => {
                    const tagCount = countPostsByTag(tag);
                    return `<span class="tag" data-tag="${tag}">${tag}</span>${tagCount > 1 ? ` <span class="pilcrow">(${tagCount})</span>` : ''}`;
                }).join(', ')}`;
        } else {
            postContent += `<span class="tags" style="display: none;"></span>`;
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

      // Add click event listeners to tags
    document.querySelectorAll('.tag').forEach(tagElement => {
        tagElement.addEventListener('click', () => {
            const tag = tagElement.getAttribute('data-tag');
            filterPostsByTag(tag);
            updateSelectedHeader(`TAG: ${tag}`);
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
            updateSelectedHeader(`${author}`, author);
        });
        authorList.appendChild(authorItem);
    });
}

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

// Function to render tags in the sidebar
function renderTags(posts) {
    const tagsSet = new Set();
    //posts.forEach(post => post.tags.forEach(tag => tagsSet.add(tag)));
     posts.forEach(post => {
            // Ensure tags is defined and is an array
            if (Array.isArray(post.tags)) {
                post.tags.forEach(tag => tagsSet.add(tag));
            }
     });
        const tagList = document.getElementById('tag-list');
    tagList.innerHTML = '';
    Array.from(tagsSet).sort().forEach(tag => {
        const tagItem = document.createElement('li');
        tagItem.innerHTML = `${tag} <span class="postcount">&nbsp;${countPostsByTag(tag)}</span>`; // Show count next to tag (${countPostsByTag(tag)})
        tagItem.style.cursor = 'pointer'; // Indicate that it's clickable
        tagItem.addEventListener('click', () => {
            filterPostsByTag(tag);
            updateSelectedHeader(`TAG: ${tag}`, tag);
        });

        //tagItem.addEventListener('click', () => filterPostsByTag(tag));
        tagList.appendChild(tagItem);
    });
} 



// Function to count the number of posts for a given tag
function countPostsByTag(tag) {
    return posts.filter(post => Array.isArray(post.tags) && post.tags.includes(tag)).length;
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

// Function to filter posts by a specific tag
function filterPostsByTag(tag) {
    currentFilter = { type: 'tag', value: tag }; // Set the current filter
    const filteredPosts = posts.filter(post => post.tags.includes(tag));
    renderPosts(filteredPosts);
}


function filterPostsByTag(tag) {
    // Ensure the tag is valid
    if (!tag || typeof tag !== 'string') {
        console.error('Invalid tag:', tag);
        return;
    }

    // Filter posts by the tag, ensure the tags array exists and handle case sensitivity
    const filteredPosts = posts.filter(post => 
        Array.isArray(post.tags) && post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );

    // Render the filtered posts
    renderPosts(filteredPosts);
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

// Function to filter posts by a specific author
function filterPostsByAuthor(author) {
    currentFilter = { type: 'author', value: author }; // Set the current filter
    const filteredPosts = posts.filter(post => post.author === author);

    renderPosts(filteredPosts);
    renderBookTitlesForAuthor(author); // Render book titles for the selected author
}







// Function to show only the selected sidebar view
function showSidebarView(view) {
    document.getElementById('author-list').classList.add('hidden');
    document.getElementById('authoref-list').classList.add('hidden');
    document.getElementById('booktitle-list').classList.add('hidden');
    document.getElementById('tag-list').classList.add('hidden');


    if (view === 'authors') {
        document.getElementById('author-list').classList.remove('hidden');
        renderAuthors(posts);
    } else if (view === 'authoref') {
        document.getElementById('authoref-list').classList.remove('hidden');
        renderAuthoref(posts);
    } else if (view === 'tags') {
        document.getElementById('tag-list').classList.remove('hidden');
        renderTags(posts);}
}






// Utility function for deep equality check
function deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
    
    let keysA = Object.keys(a);
    let keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }
    
    return true;
}


// Function to update the selected header
function updateSelectedHeader(text, author) {
    const selectedHeaderDiv = document.getElementById('selected-header');
    selectedHeaderDiv.innerHTML = '<span class="selectedhead">' + text + '</span>';
    selectedHeaderDiv.classList.remove('hidden'); // Ensure the header is visible
    if (author) {
        checkAuthorAgainstAuthoref(author)
    }
}

// Function to check if author matches any authoref
function checkAuthorAgainstAuthoref(author) {
    const authorefPosts = posts.filter(post => post.authoref && deepEqual(post.authoref, author));
    const selectedHeaderDiv = document.getElementById('selected-header');

    if (authorefPosts.length > 0) {
        selectedHeaderDiv.classList.remove('hidden');

        const post = authorefPosts[0]
        const link = document.createElement('div');
        link.innerHTML = `about`; // Display part of the content or another identifier
        link.classList.add('refabout'); 
        
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            filterPostsByAuthoref(post.authoref); // Filter posts by authoref
            updateSelectedHeader(`<div class="selectedabout">about</div> ${post.authoref}`);
        });
        
        selectedHeaderDiv.appendChild(link);
    }
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