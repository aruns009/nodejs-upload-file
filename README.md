# This is a sample NodeJs - ExpressJS microservice.

This application basically uploads pictures to a server and returns a unique url as return for the picture.

Below are the steps to follow to run the sample NodeJS application

```
## Pre-requisites
- docker should be installed in your machine
- docker-compose should be installed in your machine
- Should be able to run the "make" commands

## Run the application
Change into the cloned directory

```
cd upload-picture
```

## Docker

start the docker containers using `make` commands:

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| make up         | Run compose/develop.yaml                  |
| make down       | Stops compose/develop.yaml                |
| make clean      | Remove all containers, images and volumes | 

Docker compose files:

| File                                              | Environment |
| --------------------------------------------------| ----------- |
| [compose/test.yaml](compose/test.yaml)            | Testing     |
| [compose/develop.yaml](compose/develop.yaml)      | Development |


Try the development environment:

1.  Run docker-compose `make up`
2. Inorder to make sure the application is up and running take url -  http://localhost:4000/ in browser
Note - You can stop and remove the container by running `make down` command

Inorder to run the unit test, execute the below command
- Run the command `make test`
- To remove the container `make test-down`