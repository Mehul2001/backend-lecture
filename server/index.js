const express = require('express');
let app = express();

const repoHandler = require('../database')
const githubHandler = require('../helpers/github')

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  githubHandler.getReposByUsername('andrew121212', () => {
    res.send(201);
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

