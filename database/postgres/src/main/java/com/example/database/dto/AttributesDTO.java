package com.example.database.dto;

/*
Data Transfer Object (DTO)
Used for parsing the covid data api response
 */
public class AttributesDTO {
    public String ORIGID;
    public String CountyName;                      // column
    public int PopulationCensus16;
    public int IGEasting;
    public int IGNorthing;
    public float Lat;
    public float Long;
    public String UniqueGeographicIdentifier;
    public int ConfirmedCovidCases;                // column
    public float PopulationProportionCovidCases;   // column
    public int ConfirmedCovidDeaths;
    public int ConfirmedCovidRecovered;
    public float x;
    public float y;
    public int FID;                                // column
    public long TimeStampDate;
}
