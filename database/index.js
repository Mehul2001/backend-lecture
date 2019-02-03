const mongoose = require('mongoose');
mongoose.connect('mongodb://test:testtest12@ds145563.mlab.com:45563/github-app');
// mongoose.connect('mongodb://localhost/newRepoDB')
// Describles how models in our collection should look like
let repoSchema = mongoose.Schema({
  username: String,
  stars: Number,
  repoUrl: String,
  repoName: {
    type: String,
    index: true,
    unique: true,
  }
});
// Tell mongoose on collection 'Repo' validate using reposchema 
let Repo = mongoose.model('Repo', repoSchema);

let save = (username, data, callback) => {
  // // Class instantiantion using .save() method
  // var repo = new Repo({
  //   username: 'andrew121212',
  //   stars: 0,
  //   repoUrl: 'https://github.com/andrew121212/example',
  //   repoName: 'example',
  // });

  // repo.save((err) => {
  //   if (err) throw err;
  //   console.log('from inside repo.save');
  // })

  // //Create using create method
  // Repo.create({
  //   username: 'andrew121212',
  //   stars: 0,
  //   repoUrl: 'https://github.com/andrew121212/example',
  //   repoName: 'example',
  // }, (err, savedObject) => {
  //   console.log(savedObject);
  // })

  // Insert Many 

  const newRepoData = data.map((githubRepoObj) => {
    return {
        username: username,
        stars: githubRepoObj.stargazers_count,
        repoUrl: githubRepoObj.html_url,
        repoName: githubRepoObj.name,
      }
  });

  Repo.insertMany(newRepoData, (err) => {
    console.log('insert Many');
    callback();
  })

}

module.exports.save = save;
