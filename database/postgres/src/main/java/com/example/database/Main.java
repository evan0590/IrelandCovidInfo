package com.example.database;

import java.io.IOException;

import com.example.database.apitodb.ApiToDB;


public class Main {

    public static void main(String[] args) throws IOException {
        ApiToDB apiToDB = new ApiToDB();
        apiToDB.covidApiCallToDB();
    }
}
