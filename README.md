
# IrelandCovidInfo

This application allows users to view information related to the spread of Covid-19 in Ireland. All data has been gathered from covid-19.geohive.ie.

This project is divided into a backend and frontend. The backend has been developed using the Java Spring Boot web framework to host a simple API. The frontend has been developed using React and queries data from the API.

In order to run this project locally it is necessary to have Node.js, the npm package manager, Java 11 and Maven installed on your machine.

With these prerequisites fulfilled, to start the backend run the following command from the ```spring``` directory within the ```backend``` directory:
```json
mvn clean install
java -jar target/spring-0.0.1-SNAPSHOT.jar
```
This command will run the Spring Boot server that serves the user interface with Covid-19 data.

Following this, open another window while keeping the Spring Boot server running. Navigate first into the ```frontend``` directory located at the top of the source directory, and then into the ```gui``` directory. When inside this directory run the following two commands:
```json
npm install
npm start
```
The first command will install all of the necessary requirements for the React application and may take some time. The second command will start the application and run it with instructions displayed as to how to access it. At this point you now have the application running locally on your machine.
