package com.example.spring.service;

import com.example.spring.dao.LiveCountyDao;
import com.example.spring.model.LiveCountyData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LiveCountyService {

    private final LiveCountyDao liveCountyDao;

    @Autowired
    public LiveCountyService(@Qualifier("liveCounty") LiveCountyDao liveCountyDao) {
        this.liveCountyDao = liveCountyDao;
    }

    public Optional<LiveCountyData> liveGetCountyByName(String name) {
        return liveCountyDao.liveSelectCountyByName(name);
    }

}
