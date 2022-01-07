#!/bin/bash
DOCKER_BUILDKIT=1

reCreatePassword(){
  source ./.env

  local folderRoot="./Mysql/Passwords/$MYSQL_PW_ROOT_FILE"
  local folderUser="./Mysql/Passwords/$MYSQL_PW_FILE"
  
  openssl rand -base64 14 | awk '{print tolower($0)}' > "$folderRoot"
  openssl rand -base64 14 | awk '{print tolower($0)}' > "$folderUser"
  # printf "activating docker swarn."
  # docker swarm init
  
  # if [ $( docker secret ls | grep -c mysql_root_pw ) < 1 ]; then
  #   openssl rand -base64 14 | awk '{print tolower($0)}' | docker secret create mysql_root_pw -
  # fi
  # if [ $( docker secret ls | grep -c mysql_db_pw ) < 1 ]; then
  #   openssl rand -base64 14 | awk '{print tolower($0)}' | docker secret create mysql_db_pw -
  # fi 
}
init(){
  local idMysqlContainer=""
  local forceReBuild=$1

  # TODO : check if it is necessary to delete installation when creating the password

  if [[ ! ( -f "./Mysql/Passwords/$MYSQL_PW_ROOT_FILE" && -f "./Mysql/Passwords/$MYSQL_PW_FILE" ) || "$forceReBuild" == "true" ]]; then
    rm -rf ./Mysql/Installation
    # rm -rf ./Mysql/ConfigFolder
    reCreatePassword
  fi
  
  docker-compose -f "docker-compose.yml" down
  docker-compose -f "docker-compose.yml" up -d --build 

  idMysqlContainer=$(docker ps | grep todoapp_react_mysql_server | cut -d" " -f1)

  if [ "$idMysqlContainer" ]; then
    docker logs --tail 1000 -f "$idMysqlContainer"
  fi
  # docker exec -ti mysql_server sh /usr/src/TodoApp/Scripts/configMysql.sh
  # docker exec -i mysql_server sh -c 'sh /usr/src/database/initDB.sh' 
}
init false