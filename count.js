document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('hit-counter');

    // Get current hit count from localStorage
    let hitCount = localStorage.getItem('hitCount');

    if (hitCount === null) {
        // If there's no hitCount in localStorage, initialize it to 0
        hitCount = 0;
    } else {
        // Convert hitCount to a number
        hitCount = Number(hitCount);
    }

    // Increment the hit count
    hitCount++;

    // Save the updated hit count back to localStorage
    localStorage.setItem('hitCount', hitCount);

    // Display the hit count on the page
    counterElement.textContent = hitCount;
});