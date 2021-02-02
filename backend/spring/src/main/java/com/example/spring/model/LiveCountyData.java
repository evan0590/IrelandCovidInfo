package com.example.spring.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LiveCountyData {

    private final String countyName;

    private final Integer fid;

    private final Integer confirmedCovidCases;

    private final Float populationProportionCovidCases;

    private final Integer timeStampDate;

    private final String dateString;

    public LiveCountyData(@JsonProperty("countyName") String countyName,
                          @JsonProperty("fid") Integer fid,
                          @JsonProperty("confirmedCovidCases") Integer confirmedCovidCases,
                          @JsonProperty("populationProportionCovidCases") Float populationProportionCovidCases,
                          @JsonProperty("timeStampDate") Integer timeStampDate,
                          @JsonProperty("dateString") String dateString) {
        this.countyName = countyName;
        this.fid = fid;
        this.confirmedCovidCases = confirmedCovidCases;
        this.populationProportionCovidCases = populationProportionCovidCases;
        this.timeStampDate = timeStampDate;
        this.dateString = dateString;

    }

    public String getCountyName() { return countyName; }

    public Integer getFid() {
        return fid;
    }

    public Integer getConfirmedCovidCases() {
        return confirmedCovidCases;
    }

    public Float getPopulationProportionCovidCases() {
        return populationProportionCovidCases;
    }

    public Integer getTimeStampDate() {
        return timeStampDate;
    }

    public String getDateString() {
        return dateString;
    }
}
