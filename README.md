# TechPods-ToDoList

## Spring API:

Prerequisites to run the Sring Boot app : Docker

**Step 1**: creating the database container

```
docker run -p 3307:3306 --name mysqldb -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=tododb mysql:8.0.13
```

**Step 2**: creating docker network and connect mysql container to the network

```
docker network create spring-network
docker network connect spring-network mysqldb
```

**Step 3**: creating docker image of the application and connect with the network
provide all DB details for successful connection.

```
mvn clean install

docker build -t to-do-list .

docker run -p 9090:8080 --name to-do-list --net spring-network -e MYSQL_HOST=mysqldb -e MYSQL_USER=root -e MYSQL_PASSWORD=root -e MYSQL_PORT=3306 to-do-list
```

## Front End:

Prerequisites to run react app:

parrent directory: ../TechPods-ToDoList/frontend/task-management

### Node.js:

```
Ensure that you have Node.js installed on your machine. React development typically relies on Node.js to run the development server and manage dependencies. You can download and install Node.js from nodejs.org.
```

### Yarn Package Manager:

```
npm install -g yarn
yarn --version
```

### yarn install

### yarn start
