// const fetch = require('node-fetch');
// const cheerio = require('cheerio');
// const { URL } = require('url');


import fetch  from 'node-fetch';
import cheerio  from 'cheerio';
import { URL }  from 'url';

const apiUrl = 'https://mcnezu.com/wp-json/wp/v2/posts'; // Apni WordPress site ki URL se replace karein
const siteBaseUrl = new URL(apiUrl).origin; // Apni WordPress site ka base URL
//---------------------------------------------------------------

/*
async function fetchAllPosts() {
    try {
        let postsWithExternalLinks = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages) {
            const response = await fetch(`${apiUrl}?per_page=100&page=${page}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const posts = await response.json();

            posts.forEach(post => {
                const postBaseUrl = new URL(post.link).origin; // Post ka base URL

                const $ = cheerio.load(post.content.rendered);
                let externalLinksFound = false;

                $('a').each((index, element) => {
                    const link = $(element).attr('href');
                    if (link) {
                        try {
                            const linkUrl = new URL(link, siteBaseUrl);
                            if (linkUrl.origin !== postBaseUrl) {
                                externalLinksFound = true;
                            }
                        } catch (error) {
                            console.error(`Invalid URL: ${link}`);
                        }
                    }
                });

                if (externalLinksFound) {
                    postsWithExternalLinks.push({
                        date: post.date,
                        author: post.author,
                        link: post.link
                    });
                }
            });

            const totalPagesHeader = response.headers.get('x-wp-totalpages');
            if (totalPagesHeader) {
                totalPages = parseInt(totalPagesHeader);
            }

            page++;
        }

        // Display all posts with external links
        console.log('Posts with External Links:');
        console.log(postsWithExternalLinks);

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

fetchAllPosts();


*/

// ----------------------------------------------

async function fetchAllPosts() {
    try {
        let postsWithExternalLinks = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages) {
            const response = await fetch(`https://mcnezu.com/?per_page=100&page=${page}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const posts = await response.json();

            for (const post of posts) {
                const authorId = post.author; // Author ID nikala gaya hai

                // Author ka display name fetch karna
                const authorResponse = await fetch(`${apiUrl}/wp-json/wp/v2/users/${authorId}`);
                if (!authorResponse.ok) {
                    throw new Error(`HTTP error! Status: ${authorResponse.status}`);
                }
                const authorData = await authorResponse.json();
                const authorName = authorData.name; // Author ka display name

                const content = post.content.rendered;

                // Check for external links in post content
                const externalLinksFound = checkExternalLinks(content);

                if (externalLinksFound) {
                    postsWithExternalLinks.push({
                        date: post.date,
                        author: authorName,
                        link: post.link
                    });
                }
            }

            // Update totalPages based on headers if available
            const totalPagesHeader = response.headers.get('x-wp-totalpages');
            if (totalPagesHeader) {
                totalPages = parseInt(totalPagesHeader);
            }

            page++;
        }

        // Display all posts with external links
        console.log('Posts with External Links:');
        console.log(postsWithExternalLinks);

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Function to check for external links in post content
function checkExternalLinks(content) {
    // Logic to check external links
    // For example, you can use cheerio or regex to parse and check links
    return false; // Placeholder, implement your logic here
}

fetchAllPosts();

