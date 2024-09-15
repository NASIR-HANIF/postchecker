
// import fetch  from'node-fetch';
//import axios from "axios";
// const file = "C:/Users/rehman/Desktop/postchecker/get_all_posts/all_sites_all_posts/firstaction.txt"

// --------------------------------------------------------------
// Replace with your post URL and WordPress site URL
// const siteUrl = "https://webgoodread.com";


// ----------------------------------------------------------

/*

// Function to fetch the post by its URL
async function fetchPostByUrl(postUrl, siteUrl) {
    try {
        // Fetch all posts (you might need to handle pagination if there are many posts)
        let response = await fetch(`${siteUrl}/wp-json/wp/v2/posts?per_page=100`);
        // let posts = response.data;
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const posts = await response.json();

        // Find the post with the matching URL
        let post = posts.find(post => post.link === postUrl);

        if (post) {
            // Post found, log its details
            console.log('Post found:', post);
        } else {
            console.log('Post not found');
        }
    } catch (error) {
        console.error('Error fetching the post:', error);
    }
}

// Call the function with the provided URL and site URL
fetchPostByUrl(postUrl, siteUrl);

*/
// ---------------------------------------------------------

import axios from "axios";

const postSlug = "why-should-you-choose-mean-stack-in-lieu-of-the-other-alternatives";
const siteUrl = "https://readrey.com"
// Function to fetch the post by its slug
async function fetchPostBySlug(postSlug, siteUrl) {


    try {
        // Fetch the post by slug
        let response = await axios.get(`${siteUrl}/wp-json/wp/v2/posts?slug=${postSlug}`);
        let posts = response.data;

        if (posts.length > 0) {
            // Post found, log its details (posts is an array)
            console.log('Post found:', posts[0]);
        } else {
            console.log('Post not found');
        }
    } catch (error) {
        console.error('Error fetching the post:', error);
    }
}

// Call the function with the provided slug and site URL
fetchPostBySlug(postSlug, siteUrl);

// ---------------------------------------------------------------

/*

// file read ker ke sulg or url alag ker ke get qequest kerta hey or post ko lata hey 
import fs from 'fs';
import axios from 'axios';
import readline from 'readline';
const filePath = "C:/Users/rehman/Desktop/postchecker/get_all_posts/all_sites_all_posts/textaction.txt"


// Function to process the text file
async function processFile(filePath) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const urlString = line.trim();

        if (!urlString) continue; // Skip empty lines

        try {
            const url = new URL(urlString);

            // Extract siteUrl and postSlug
            const siteUrl = `${url.protocol}//${url.host}`;
            const postSlug = url.pathname.split('/').filter(Boolean).pop();

            console.log(`Processing URL: ${urlString}`);
            console.log(`Site URL: ${siteUrl}`);
            console.log(`Post Slug: ${postSlug}`);



            // Debug: log the full request URL
            const requestUrl = `${siteUrl}/wp-json/wp/v2/posts?slug=${postSlug}`;
            console.log(`Requesting URL: ${requestUrl}`);

            // Make GET request to the WordPress API
            const response = await axios.get(requestUrl);
            console.log(response)

            // Check if any posts were returned
            if (response.data.length === 0) {
                console.log(`No post found for slug: ${postSlug} at ${siteUrl}`);
                continue;
            }

            

            const post = response.data[0];

            // Extract required details from the post
            const publishDate = post.date;
            const authorId = post.author;
            const link = post.link;

            // Get author details
            const authorResponse = await axios.get(`${siteUrl}/wp-json/wp/v2/users/${authorId}`);
            const authorName = authorResponse.data.name;

            // Log the extracted details
            console.log(`Publish Date: ${publishDate}`);
            console.log(`Author Name: ${authorName}`);
            console.log(`Link: ${link}`);
            console.log('-------------------------------');


            

        } catch (error) {
            if (error.response) {
                console.error(`Error processing URL: ${urlString}`);
                console.error(`Status Code: ${error.response.status}`);
                console.error(`Response Data: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error(`Error processing URL: ${urlString}`);
                console.error(error.message);
            }
        }
    }
}


processFile(filePath);
*/
//--------------------------------------------------------------
// nodemon singlePostFinder.js

