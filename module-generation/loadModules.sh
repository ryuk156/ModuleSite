#!/bin/bash

# Supporting script

git config --global user.email "yp15601560@gmail.com"
git config --global user.name "ryuk156"
git checkout -b module_gen1
git add .
git commit -m "add: all modules "
git push https://${GIT_CREDS}@github.com/ryuk156/ModuleSite.git module_gen1 -f
curl -i -H "Authorization: token $GIT_CREDS" -X POST "https://api.github.com/repos/ryuk156/ModuleSite/pulls" -d '{ "title": "Module generated by automation",
 "base": "master",
 "head": "module_gen",
 "body": "Module generated using Jenkins pipeline"}'
