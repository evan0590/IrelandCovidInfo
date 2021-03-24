package com.example.database;

import com.example.database.dbconnection.DBPropertiesAccess;

import org.junit.Test;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

public class DBPropertiesAccessTest {

    DBPropertiesAccess dbPropertiesAccess = new DBPropertiesAccess();

    @Test
    public void getPropValues_ReturnedArrayList_IsNotEmpty() throws Exception {

        ArrayList<String> dbCredentials = dbPropertiesAccess.getPropValues();

        assertThat(dbCredentials).isNotEmpty();

    }

    @Test
    public void getPropValues_ReturnedArrayList_IsCorrectSize() throws Exception {

        ArrayList<String> dbCredentials = dbPropertiesAccess.getPropValues();

        assertThat(dbCredentials.size()).isEqualTo(3);

    }

}
