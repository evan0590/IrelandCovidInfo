
# IrelandCovidInfo

This application allows users to view information related to the spread of Covid-19 in Ireland. All data has been gathered from covid-19.geohive.ie.

This project is divided into a backend and frontend. The backend has been developed using the Java Spring Boot web framework to host a simple API. The frontend has been developed using React and queries data from the API. A PostgreSQL database serving the API is implemented.

In order to run this project locally it is necessary to have Node.js, the npm package manager, Java 11 and Maven installed on your machine.

Using the AWS Command Line Interface tool to create the database for the Spring Boot API to retrieve data from, run the following command:
```
json
aws rds create-db-instance \
    --db-name covid_database \
    --db-instance-identifier spring-boot-instance \
    --db-instance-class db.t2.micro \
    --engine postgres \
    --master-username postgres \
    --master-user-password <insert password here> \
    --allocated-storage 20 \
    --no-multi-az \
    --vpc-security-group-ids <insert security group id here> \
    --availability-zone <insert availablity zone here>
```
This will create a databse instance with an initial database in it named ```covid_database```. Add a password next to the ```--master-user-password``` option. Add the security group id of the security group associated with your IP adddress next to the ```----vpc-security-group-ids``` option. Add an availability zone next to the ```--availability-zone``` option. \
Identify the host/endpoint associated with this database instance by running the following command:
```
json
aws rds describe-db-instances \
    --db-instance-identifier spring-boot-instance
```
Copy the value of the key ```Address``` key within the nested ```Endpoint``` object, this is the database endpoint.

Navigate into the ```database``` directory and amend the ```.env``` file with the database endpoint and password. Run the following commands:
```json
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python create_tables.py
python static_table_populate.py
python live_table_populate.py
```
These commands will create and activate a virtual environment named ```env``` with the required dependencies, and create and populate the tables required by the Spring Boot API. \

From the root of the repository, run the command ```nano backend/spring/src/main/resources/application.yaml``` and amend the file with the database endpoint and password. \
To start the backend, navigate first into the ```backend``` directory located at the top of the repository, and then into the ```spring``` directory. When inside this directory run the following two commands:
```json
mvn clean install
java -jar target/spring-0.0.1-SNAPSHOT.jar
```
This command will run the Spring Boot server that serves the user interface with Covid-19 data.

Following this, open another window while keeping the Spring Boot server running. Navigate first into the ```frontend``` directory located at the top of the repository, and then into the ```gui``` directory. When inside this directory run the following two commands:
```json
npm install
npm start
```
The first command will install all of the necessary requirements for the React application. The second command will start the application and run it with instructions displayed as to how to access it. At this point you now have the application running locally on your machine.
