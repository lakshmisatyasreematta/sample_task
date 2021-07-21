# Sample Node Project

## Prequisites (Development):

| Module | Version |
| --- | --- |
| Node | 14.15.0 |
| Npm | 7.6.1 |


##### Take Clone of project
> git clone -b git_url  folder_name


##### Rename configSample.js to configs.js
> cd configs
> mv configSample.js configs.js

##### Change the url of database and set credential if applicable
> vi configs.js

##### Install node modules

> npm install
> node server.js

##### Swagger url

> http://localhost:5048/docs

##### Deployment

>pm2 start server.js --name="grocery_app_api"


