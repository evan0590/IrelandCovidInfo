package com.database.dbconnection;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;


public class DBConnection {

    String SQL = "INSERT INTO public.live_county_data(county_name, fid, confirmed_covid_cases, " +
            "population_proportion_covid_cases, time_stamp_date, date_string) " +
            "VALUES(?, ?, ?, ?, ?, ?)";

    public void dbWriteTo(ArrayList<Object> covidInfo) throws IOException {
        String countyName = (String) covidInfo.get(0);
        Integer fid = (Integer) covidInfo.get(1);
        Integer confirmedCovidCases = (Integer) covidInfo.get(2);
        Float populationProportionCovidCases = (Float) covidInfo.get(3);
        Integer intTimeStamp = (Integer) covidInfo.get(4);
        String dateString = (String) covidInfo.get(5);

        DBPropertiesAccess dbPropertiesAccess = new DBPropertiesAccess();

        ArrayList<String> dbCredentials = dbPropertiesAccess.getPropValues();
        String jdbcUrl = dbCredentials.get(0);
        String username = dbCredentials.get(1);
        String password = dbCredentials.get(2);

        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {

            PreparedStatement preparedStatement = connection.prepareStatement(SQL);
            preparedStatement.setString(1, countyName);
            preparedStatement.setInt(2, fid);
            preparedStatement.setInt(3, confirmedCovidCases);
            preparedStatement.setFloat(4, populationProportionCovidCases);
            preparedStatement.setInt(5, intTimeStamp);
            preparedStatement.setString(6, dateString);

            preparedStatement.executeUpdate();
            preparedStatement.close();


        } catch (SQLException e) {
            System.out.println("Connection failure.");
            e.printStackTrace();
        }
    }
}