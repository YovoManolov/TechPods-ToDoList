


-- step 1: creating the database container 

docker run -p 3307:3306 --name mysqldb -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=tododb mysql:8.0.13


-- step 2: add VM options in the application run configuration:

-DMYSQL_USER=root -DMYSQL_PASSWORD=root -DMYSQL_PORT=3307


-- step 3: application properties: 

spring.application.name=to-do-list
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:${MYSQL_PORT:3307}/tododb
spring.datasource.username=${MYSQL_USER:root}
spring.datasource.password=${MYSQL_PASSWORD:root}

-- step 4: creating docker network and connect mysql container to the network

docker network create spring-network
docker network connect spring-network mysqldb


-- step 5: creating docker image of the application and connect with the network
            provide all DB details for successful connection.

pom.xml -> this line should be available
<finalName>to-do-list</finalName>

mvn clean install

docker build -t to-do-list .

docker run -p 9090:8080 --name to-do-list --net spring-network -e MYSQL_HOST=mysqldb -e MYSQL_USER=root -e MYSQL_PASSWORD=root -e MYSQL_PORT=3306 to-do-list

