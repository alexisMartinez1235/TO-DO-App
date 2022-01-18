#!/bin/bash
configMysql(){
  local loginPath=$1
  local host=$2
  local user=$3
  local pwFile=$4
  printf "mysql --login-path=$loginPath\n"
  printf "${MYSQL_PASSWORD_FILE}\n"
  mysql_config_editor set --login-path=$loginPath --host=$host --user=${MYSQL_USER} --password 
}
configMysql "loginfordev" "localhost" "${MYSQL_USER}" "${MYSQL_PASSWORD_FILE}"
configMysql "loginroot" "localhost" "root" "${MYSQL_ROOT_PASSWORD_FILE}"
