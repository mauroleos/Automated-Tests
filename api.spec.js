const axios = require('axios');
const assert = require('assert');

describe('JSONPlaceholder API Automation Tests', () => {
  it('should create, update, and delete a post', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    // Make GET request
    const getResponse = await axios.get(`${baseURL}/posts/1`);
    assert(getResponse.status === 200, 'GET request should return a successful response');
    const post = getResponse.data;

    // Set headers for a request
    const headers = {
      'Content-Type': 'application/json',
    };

    // Set the body for a request
    const updatedPost = {
      ...post,
      title: 'Updated Title',
    };

    // Make PUT request to update a post
    const putResponse = await axios.put(`${baseURL}/posts/1`, updatedPost, { headers });
    assert(putResponse.status === 200, 'PUT request should return a successful response');

    // Assert the response from a request
    assert(putResponse.data.title === updatedPost.title, 'Updated post should have the correct title');

    // Make DELETE request to delete the post
    const deleteResponse = await axios.delete(`${baseURL}/posts/1`);
    assert(deleteResponse.status === 200, 'DELETE request should return a successful response');

    // Assert the post is deleted
    const getDeletedResponse = await axios.get(`${baseURL}/posts/1`).catch((error) => error.response);
    assert.strictEqual(getDeletedResponse && getDeletedResponse.status, 404, `GET request for a deleted post should return a 404 status. Actual status: ${getDeletedResponse && getDeletedResponse.status}`);
  });
});
