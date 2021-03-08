package com.example.database.apitodb;

import com.example.database.dbconnection.DBConnection;
import com.google.gson.Gson;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.example.database.dto.*;


public class ApiToDB {

    public void covidApiCallToDB() throws IOException {
        String uri = "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/" +
                "/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/" +
                "query?where=1%3D1&outFields=*&outSR=4326&f=json";
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .build();

        try {
            var response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());
            System.out.println("");

            JsonObjectDTO obj = new Gson().fromJson(response.body(), JsonObjectDTO.class);

            System.out.println("!!!");
            System.out.println(obj.objectIdFieldName);
            System.out.println("!!!");

            for (FeaturesDTO feat : obj.features) {
                AttributesDTO attr = feat.attributes;
                // Create a formatted date string for date_string column
                Date date = new java.util.Date(attr.TimeStampDate);
                SimpleDateFormat sdf = new java.text.SimpleDateFormat("dd-MM-yyy");
                String formattedDate = sdf.format(date);
                // Create an integer from the long unix time stamp
                int intTimeStamp = (int) (attr.TimeStampDate / 1000);

                String countyName = attr.CountyName;
                Integer fid = attr.FID;
                Integer confirmedCovidCases = attr.ConfirmedCovidCases;
                Float populationProportionCovidCases = attr.PopulationProportionCovidCases;
                Long timeStampDate = attr.TimeStampDate;
                String dateString = formattedDate;

                ArrayList<Object> tableData = new ArrayList<Object>();
                tableData.add(countyName);
                tableData.add(fid);
                tableData.add(confirmedCovidCases);
                tableData.add(populationProportionCovidCases);
                tableData.add(intTimeStamp);
                tableData.add(dateString);

                DBConnection dbConnection = new DBConnection();
                dbConnection.dbWriteTo(tableData);

                System.out.println("### "+ attr.CountyName + " ### \n");
                System.out.println("--- "+ attr.FID + " --- \n");
                System.out.println("!!! "+ attr.ConfirmedCovidCases + " !!! \n");
                System.out.println("/// "+ attr.PopulationProportionCovidCases + " /// \n");
                System.out.println("... "+ attr.TimeStampDate + " ... \n");
                System.out.println("{{{ "+ formattedDate + " }}} \n");

            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}