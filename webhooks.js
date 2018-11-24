const octokit = require('@octokit/rest')();

octokit.authenticate({
    type: 'basic',
    username: 'utk14',
    password: 'utkarsha1234'
});

octokit.repos.createHook({
    owner: 'utk14',
    repo: 'rxjs-actor',
    name: 'web',
    events: ["push"],    
    config: {
        content_type: 'json',
        url: 'http://localhost:5000/github_push'
    }
}).then(result => {
    console.log(result);
})
