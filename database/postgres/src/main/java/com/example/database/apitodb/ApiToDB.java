package com.example.database.apitodb;

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
import com.example.database.dbconnection.DBConnection;
import com.example.database.utils.DateTime;


public class ApiToDB {

    String uri = "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/" +
            "/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/" +
            "query?where=1%3D1&outFields=*&outSR=4326&f=json";


    public void liveDataAPIToDB() throws IOException {

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .build();

        try {
            var response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());

            JsonObjectDTO obj = new Gson().fromJson(response.body(), JsonObjectDTO.class);

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
                String dateString = formattedDate;

                ArrayList<Object> liveTableData = new ArrayList<Object>();
                liveTableData.add(countyName);
                liveTableData.add(fid);
                liveTableData.add(confirmedCovidCases);
                liveTableData.add(populationProportionCovidCases);
                liveTableData.add(intTimeStamp);
                liveTableData.add(dateString);

                DBConnection dbConnection = new DBConnection();
                dbConnection.liveTablePopulate(liveTableData);

            }
        }
        catch (Exception e) {
            System.out.println(DateTime.dateTimeNow());
            e.printStackTrace();
        }
    }

    public void staticDataAPIToDB() throws IOException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .build();

        try {
            var response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());

            JsonObjectDTO obj = new Gson().fromJson(response.body(), JsonObjectDTO.class);

            for (FeaturesDTO feat : obj.features) {
                AttributesDTO attr = feat.attributes;

                String countyName = attr.CountyName;
                Float lat = attr.Lat;
                Float longitude = attr.Long;
                Integer populationCensus16 = attr.PopulationCensus16;

                ArrayList<Object> staticTableData = new ArrayList<Object>();
                staticTableData.add(countyName);
                staticTableData.add(lat);
                staticTableData.add(longitude);
                staticTableData.add(populationCensus16);

                DBConnection dbConnection = new DBConnection();
                dbConnection.staticTablePopulate(staticTableData);

            }

        } catch (Exception e) {
            System.out.println(DateTime.dateTimeNow());
            e.printStackTrace();
        }
    }
}