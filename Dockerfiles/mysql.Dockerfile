ARG mysqlVersion

FROM mysql:${mysqlVersion}

  RUN apt-get update
  RUN echo 'y' | apt-get install procps  

  RUN mkdir /home/mysql
  RUN mkdir /usr/src/TodoApp

  RUN chown mysql:mysql -R /home/mysql
  RUN chown mysql:mysql -R /usr/src/TodoApp

# USER mysql

# RUN pwgen -s -1 16 > '$MYSQL_NEXT_PW_ROOT_FILE'
# RUN pwgen -s -1 16 > '$MYSQL_NEXT_PW_FILE'

