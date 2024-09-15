import fetch from 'node-fetch'


const apiUrl = 'https://mcnezu.com/wp-json/wp/v2/posts'; // Apni WordPress site ki URL se replace karein

async function fetchAllPosts() {
    try {
        let allPosts = [];
        let page = 1;
        let totalPages = 1;

        // Loop through all pages until all posts are fetched
        while (page <= totalPages) {
            const response = await fetch(`${apiUrl}?per_page=100&page=${page}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const posts = await response.json();
            allPosts = allPosts.concat(posts);

            // Update totalPages based on headers if available
            const totalPagesHeader = response.headers.get('x-wp-totalpages');
            if (totalPagesHeader) {
                totalPages = parseInt(totalPagesHeader);
            }

            page++;
        }

        // Display all posts
        allPosts.forEach(post => {
            console.log('Title:', post.title.rendered);
            console.log('Content:', post.content.rendered);
            console.log('---------------------');
        });

        console.log(`Total posts retrieved: ${allPosts.length}`);

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

fetchAllPosts();

