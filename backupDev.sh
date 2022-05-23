#!/bin/bash

# backup react container
todayDate=$(date +"%d.%m.%Y")

if [[ ! -e lastBackup.txt || "$todayDate" != "$(cat lastBackup.txt)" ]]; then
  # did backup
  echo "docker commit"
  docker commit $(docker-compose ps react -q) todoapp_react_react:$todayDate
  echo "docker tag"
  docker tag $(docker images todoapp_react_react:$todayDate -q ) alexis543643/todo-react:$todayDate
  echo $todayDate > lastBackup.txt
  echo "finished docker commit and tag"
fi
