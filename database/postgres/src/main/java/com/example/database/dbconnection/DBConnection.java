package com.example.database.dbconnection;

import com.example.database.apitodb.ApiToDB;
import com.example.database.utils.DateTime;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;


public class DBConnection {

    String liveSQL = "INSERT INTO public.live_county_data(county_name, fid, confirmed_covid_cases, " +
            "population_proportion_covid_cases, time_stamp_date, date_string) " +
            "VALUES(?, ?, ?, ?, ?, ?)";

    String staticSQL = "INSERT INTO public.static_county_data(county_name, lat, long, " +
            "population_census_16) VALUES(?, ?, ?, ?)";

    public void staticTablePopulate(ArrayList<Object> staticTableInfo) throws IOException {
        String countyName = (String) staticTableInfo.get(0);
        Float lat = (Float) staticTableInfo.get(1);
        Float longitude = (Float) staticTableInfo.get(2);
        Integer populationCensus16 = (Integer) staticTableInfo.get(3);

        DBPropertiesAccess dbPropertiesAccess = new DBPropertiesAccess();

        ArrayList<String> dbCredentials = dbPropertiesAccess.getPropValues();
        String jdbcUrl = dbCredentials.get(0);
        String username = dbCredentials.get(1);
        String password = dbCredentials.get(2);

        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {

            PreparedStatement preparedStatement = connection.prepareStatement(staticSQL);
            preparedStatement.setString(1, countyName);
            preparedStatement.setFloat(2, lat);
            preparedStatement.setFloat(3, longitude);
            preparedStatement.setInt(4, populationCensus16);

            preparedStatement.executeUpdate();
            preparedStatement.close();


        } catch (SQLException e) {
            System.out.println(DateTime.dateTimeNow());
            System.out.println("Connection failure.");
            e.printStackTrace();
        }
    }

    public void liveTablePopulate(ArrayList<Object> liveTableInfo) throws IOException {
        String countyName = (String) liveTableInfo.get(0);
        Integer fid = (Integer) liveTableInfo.get(1);
        Integer confirmedCovidCases = (Integer) liveTableInfo.get(2);
        Float populationProportionCovidCases = (Float) liveTableInfo.get(3);
        Integer intTimeStamp = (Integer) liveTableInfo.get(4);
        String dateString = (String) liveTableInfo.get(5);

        DBPropertiesAccess dbPropertiesAccess = new DBPropertiesAccess();

        ArrayList<String> dbCredentials = dbPropertiesAccess.getPropValues();
        String jdbcUrl = dbCredentials.get(0);
        String username = dbCredentials.get(1);
        String password = dbCredentials.get(2);

        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {

            PreparedStatement preparedStatement = connection.prepareStatement(liveSQL);
            preparedStatement.setString(1, countyName);
            preparedStatement.setInt(2, fid);
            preparedStatement.setInt(3, confirmedCovidCases);
            preparedStatement.setFloat(4, populationProportionCovidCases);
            preparedStatement.setInt(5, intTimeStamp);
            preparedStatement.setString(6, dateString);

            preparedStatement.executeUpdate();
            preparedStatement.close();

            System.out.println(DateTime.dateTimeNow());
            System.out.println("\t live_county_data - table successfully populated \n");


        } catch (SQLException e) {
            System.out.println(DateTime.dateTimeNow());
            System.out.println("Connection failure.");
            e.printStackTrace();
        }
    }

    public void dbCreateTables() throws IOException {

        String sqlStatic = "CREATE TABLE public.static_county_data(county_name varchar (12), " +
                "lat numeric, long numeric, population_census_16 integer, PRIMARY KEY(county_name))";

        String sqlLive = "CREATE TABLE public.live_county_data(county_name varchar (12), " +
                "fid smallint, confirmed_covid_cases integer, population_proportion_covid_cases numeric, " +
                "time_stamp_date integer, date_string varchar (25), PRIMARY KEY(county_name, time_stamp_date))";

        DBPropertiesAccess dbPropertiesAccess = new DBPropertiesAccess();

        ArrayList<String> dbCredentials = dbPropertiesAccess.getPropValues();
        String jdbcUrl = dbCredentials.get(0);
        String username = dbCredentials.get(1);
        String password = dbCredentials.get(2);

        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {

            // Retrieving the meta data object
            DatabaseMetaData databaseMetaData = connection.getMetaData();
            // check if "static_county_data" table is there
            ResultSet staticTableCheck = databaseMetaData.getTables(null, null,
                    "static_county_data", null);
            if (staticTableCheck.next()) {
                // Table exists
            }
            else {
                // Table does not exist
                PreparedStatement preparedStatementStatic = connection.prepareStatement(sqlStatic);
                preparedStatementStatic.executeUpdate();
                preparedStatementStatic.close();
                System.out.println(DateTime.dateTimeNow());
                System.out.println("\t static_county_data - table successfully created");
                ApiToDB apiToDB = new ApiToDB();
                apiToDB.staticDataAPIToDB();
                System.out.println(DateTime.dateTimeNow());
                System.out.println("\t static_county_data - table successfully populated \n");
            }
            ResultSet liveTableCheck = databaseMetaData.getTables(null, null,
                    "live_county_data", null);
            if (liveTableCheck.next()) {
                // Table exists
            }
            else {
                // Table does not exist
                PreparedStatement preparedStatementLive = connection.prepareStatement(sqlLive);
                preparedStatementLive.executeUpdate();
                preparedStatementLive.close();
                System.out.println(DateTime.dateTimeNow());
                System.out.println(("\t live_county_data - table successfully created"));
            }

        } catch (SQLException e) {
            System.out.println(DateTime.dateTimeNow());
            System.out.println("Connection failure.");
            e.printStackTrace();
        }

    }
}