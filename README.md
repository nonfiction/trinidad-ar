## Setup

    brew bundle
    npm install
    bower install

## Run it locally

    make watch     # rebuild on file changes
    make serve     # in a new shell

## Deploy on octohost

    git remote add octo git@server.octohost.io:trinidad.git
    git push octo master

Make sure it's all built and committed - this Dockerfile doesn't build anything - it just looks into the 'build' folder and serves those files.
