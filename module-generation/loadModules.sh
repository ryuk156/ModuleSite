#!/bin/bash

# Supporting script

MODULEDIR="./module-site"
MODULES="./modules"
mkdir $MODULEDIR
cd $MODULEDIR
git clone https://github.com/MovingBlocks/ModuleSite.git
cd ModuleSite
rm -R modules
cd ..
cd ..
cp -r $MODULES ./module-site/ModuleSite
cd ./module-site/ModuleSite
git config --global user.email "yp15601560@gmail.com"
git config --global user.name "ryuk156"
git checkout -b module_gen
git add .
git commit -m "add: all modules "
git push https://${GIT_CREDS}@github.com/ryuk156/ModuleSite.git module_gen -f
curl -i -H "Authorization: token $GIT_CREDS" -X POST "https://api.github.com/repos/ryuk156/ModuleSite/pulls" -d '{ "title": "Module generated by automation",
 "base": "master",
 "head": "module_gen",
 "body": "Module generated using Jenkins pipeline"}'
