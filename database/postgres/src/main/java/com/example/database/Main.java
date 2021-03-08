package com.example.database;

import java.io.IOException;

import com.example.database.apitodb.ApiToDB;
import com.example.database.dbconnection.DBConnection;


public class Main {

    public static void main(String[] args) throws IOException {

        DBConnection dbConnection = new DBConnection();
        dbConnection.dbCreateTables();

        ApiToDB apiToDB = new ApiToDB();
        apiToDB.liveDataAPIToDB();

    }
}
