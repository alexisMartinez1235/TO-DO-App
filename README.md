# Todo App
Todo App is a React Project for manage your tasks. This app is made with the next structure:
### Client
this conatiner use an official node image of DockerHub as well as in server conatiner. he has installed TypeScript, ReactJS amoung others packages. And the main link of the app is: http://localhost:3000/
### Server
he has installed TypeScript, ExpressJS and Passport packages, in addition of others. Its link is: http://localhost:8000/
[api postman documentation](https://documenter.getpostman.com/view/20226330/UVyrVx3S)

### Database
As database i use MySQL and i've installed MySQL Workbench in local for connect to database. Its link: http://localhost:3306/
### Prometheus
```
I use prometheus for resource consumption analysis and see its data with grafana.
Links
- http://localhost:3003/ grafana
  ```js
  const grafanaAuth = {
    user: 'admin',
    password: 'JxfZ@l!lP81',
  }
  ```
- http://localhost:8088/ cadvisor
- http://localhost:9090/ prometheus
'''

## Installation
<!--- ## Usage -->
```
For start container at first time, your should run (create Instalation Folder and create password for root and db_user):

sh reBuild true true
Meaning for parameters
  $1 : force re-create password - recommended false
  $2 : force delete mysql installation folder - recommended false
After run this command, you can stop, pause, start containers as you like
```

## Screenshots backend
### Local dashboard that graph backend time response
![Grafana](https://github.com/alexisMartinez1235/TO-DO-App/blob/experimental/Screenshots/Api%20time%20response.png)
### External dashboard [8321](https://grafana.com/grafana/dashboards/8321)
![Grafana](https://github.com/alexisMartinez1235/TO-DO-App/blob/experimental/Screenshots/Hardware%20metrics%20id%208321.png)

## Screenshots frontend
### Home page
![home page](https://github.com/alexisMartinez1235/TO-DO-App/blob/experimental/Screenshots/2022-04-22_00h19_02.png)

### Sign in
![sign in  page](https://github.com/alexisMartinez1235/TO-DO-App/blob/experimental/Screenshots/2022-04-22_00h20_28.png)

### Sign up
![sign up page](https://github.com/alexisMartinez1235/TO-DO-App/blob/experimental/Screenshots/2022-04-22_00h20_33.png)

### Tasklists
![tasklist_1](https://github.com/alexisMartinez1235/TO-DO-App/blob/experimental/Screenshots/2022-04-24_00h32_20.png)
![tasklist_2](https://github.com/alexisMartinez1235/TO-DO-App/blob/experimental/Screenshots/2022-04-24_00h33_14.png)
![tasklist_3](https://github.com/alexisMartinez1235/TO-DO-App/blob/experimental/Screenshots/2022-04-24_01h14_43.png)
![tasklist_4](https://github.com/alexisMartinez1235/TO-DO-App/blob/experimental/Screenshots/2022-04-24_00h33_04.png)

## Branch info
this project has 4 branchs 
* master
* experimental that has the more updated branch
* frontend that has all client container changes
* backend that has all backend container changes

## License
[MIT](https://choosealicense.com/licenses/mit/)
