package com.example.spring.dao;

import com.example.spring.model.LiveCountyData;

import java.util.List;
import java.util.Optional;

public interface LiveCountyDao {

    Optional<LiveCountyData> liveSelectCountyByName(String name);

    List<LiveCountyData> liveSelectCountiesByDate(String stringDate);
}