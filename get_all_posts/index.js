import fetch  from'node-fetch';
import * as cheerio from 'cheerio';

const apiUrl = 'https://mcnezu.com/wp-json/wp/v2/posts'; 


async function fetchAllPosts() {
    try {
        let allLinks = [];

        // Fetch all posts
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const posts = await response.json();

        // Extract links from each post content
        posts.forEach(post => {
            const $ = cheerio.load(post.content.rendered);
            $('a').each((index, element) => {
                const link = $(element).attr('href');
                if (link) {
                    allLinks.push(link);
                }
            });
        });

        // Display all extracted links
        console.log('All Links:');
        console.log(allLinks);

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

fetchAllPosts();

