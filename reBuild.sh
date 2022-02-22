#!/bin/bash
# ---------------Parameters------------------
# $1 : re-create password
# $2 : force delete mysql installation folder 


DOCKER_BUILDKIT=1
source ./.env

reCreatePassword() {
  local folderRoot="./Mysql/Passwords/$MYSQL_PW_ROOT_FILE"
  local folderUser="./Mysql/Passwords/$MYSQL_PW_FILE"
  
  openssl rand -base64 14 | awk '{print tolower($0)}' > "$folderRoot"
  openssl rand -base64 14 | awk '{print tolower($0)}' > "$folderUser"
  
  printf "Recreating password..."
}
init() {
  # ---------------Parameters------------------
  # $1 : re-create password
  # $2 : force delete mysql installation folder 

  local ReCreatePw=$1
  local ReCreateInstallation=$2
  local existPasswordFile=$([[ -f "./Mysql/Passwords/$MYSQL_PW_ROOT_FILE" &&
                          -f "./Mysql/Passwords/$MYSQL_PW_FILE"
                      ]] && echo t )

  docker-compose -f "docker-compose.yml" stop mysql_server

  # TODO : check if it is necessary to delete installation when creating the password
  
  if [[ ! $existPasswordFile || "$ReCreatePw" == "true" ]]
  then
    reCreatePassword
    rm -rf ./Mysql/Installation
    echo "Deleted Mysql installation and reseted password"

  elif [[ "$ReCreateInstallation" == "true" ]]
  then
    rm -rf ./Mysql/Installation
    echo "Deleted Mysql installation"

  fi

  mkdir -p ./VsCodeConfigFolders/Mysql
  mkdir -p ./VsCodeConfigFolders/Client
  mkdir -p ./VsCodeConfigFolders/Server

  docker-compose -f "docker-compose.yml" up -d --build
  cd Monitor 
  docker-compose -f "docker-compose.yml" up -d --build
}

if [[ "$1" && "$2" ]]
then
  init $1 $2
fi

# recommended in mysql dev
# sh reBuild.sh false true

# recommended in nodejs and reactjs dev
# sh reBuild.sh false false
