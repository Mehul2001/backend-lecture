const request = require('request');
const config = require('../config.js');

const Repo = require('../database');

let getReposByUsername = (username, serverJSCallback) => {
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', JSON.parse(body)); // github Data]
    const githubData = JSON.parse(body);
    Repo.save(username, githubData, serverJSCallback);
  });

}

module.exports.getReposByUsername = getReposByUsername;