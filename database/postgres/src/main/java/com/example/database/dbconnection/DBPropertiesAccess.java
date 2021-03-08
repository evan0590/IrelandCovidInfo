package com.example.database.dbconnection;

import com.example.database.utils.DateTime;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Properties;


public class DBPropertiesAccess {

    ArrayList<String> dbCredentials = new ArrayList<String>();
    InputStream input;

    public ArrayList<String> getPropValues() throws IOException {

        try {
            Properties prop = new Properties();
            String propFileName = "database.properties";

            input = getClass().getClassLoader().getResourceAsStream(propFileName);

            if (input != null) {
                prop.load(input);
            } else {
                throw new FileNotFoundException("property file '" + propFileName + "' not found in the classpath");
            }

            dbCredentials.add(prop.getProperty("db.jdbc-url"));
            dbCredentials.add(prop.getProperty("db.username"));
            dbCredentials.add(prop.getProperty("db.password"));

        } catch (Exception ex) {
            System.out.println(DateTime.dateTimeNow());
            System.out.println("Exception: " + ex);
        } finally {
            input.close();
        }
        return dbCredentials;
    }
}
