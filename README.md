# Todo App

Todo App is a React Project for manage your tasks. This app is made with the next structure:
# Client
this conatiner use an official node image of DockerHub as well as in server conatiner. he has installed TypeScript, ReactJS amoung others packages. And the main link of the app is: http://localhost:3000/
# Server
he has installed TypeScript, ExpressJS and Passport packages, in addition of others. Its link is: http://localhost:8000/
# Database
As database i use MySQL and i've installed MySQL Workbench in local for connect to database. Its link: http://localhost:3306/
# Prometheus
```
I use prometheus for resource consumption analysis and see its data with grafana.
Links
- http://localhost:3003/ grafana
- http://localhost:8088/ cadvisor
- http://localhost:9090/ prometheus
```

## Installation
## Usage
```
For start container at first time, your should run (create Instalation Folder and create password for root and db_user):

sh reBuild true true
Meaning for parameters
  $1 : force re-create password - recommended false
  $2 : force delete mysql installation folder - recommended false
After run this command, you can stop, pause, start containers as you like
```

## Screenshots
## License
[MIT](https://choosealicense.com/licenses/mit/)
