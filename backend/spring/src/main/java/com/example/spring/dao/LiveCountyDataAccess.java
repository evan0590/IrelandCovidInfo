package com.example.spring.dao;

import com.example.spring.model.LiveCountyData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository("liveCounty")
public class LiveCountyDataAccess implements LiveCountyDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public LiveCountyDataAccess(JdbcTemplate jdbcTemplate ) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Optional<LiveCountyData> liveSelectCountyByName(String name) {
        final String sql = "SELECT county_name, fid, confirmed_covid_cases, population_proportion_covid_cases, " +
                "time_stamp_date, date_string FROM live_county_data WHERE county_name = ?";
        LiveCountyData liveCountyData = jdbcTemplate.queryForObject(
                sql,
                new Object[]{name},
                (resultSet, i) -> {
                    String countyName = resultSet.getString("county_name");
                    Integer countyFid = resultSet.getInt("fid");
                    Integer confirmedCovidCases = resultSet.getInt("confirmed_covid_cases");
                    Float populationProportionCovidCases = resultSet
                            .getFloat("population_proportion_covid_cases");
                    Integer timeStampDate = resultSet.getInt("time_stamp_date");
                    String dateString = resultSet.getString("date_string");
                    return new LiveCountyData(countyName, countyFid, confirmedCovidCases,
                            populationProportionCovidCases, timeStampDate, dateString);
                });
        return Optional.ofNullable(liveCountyData);
    }
}
