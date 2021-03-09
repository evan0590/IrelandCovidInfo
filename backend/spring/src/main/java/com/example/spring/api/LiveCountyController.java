package com.example.spring.api;

import com.example.spring.model.LiveCountyData;
import com.example.spring.service.LiveCountyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("api/v1/live-county")
@RestController
public class LiveCountyController {

    private final LiveCountyService liveCountyService;

    @Autowired
    public LiveCountyController(LiveCountyService liveCountyService) {
        this.liveCountyService = liveCountyService;
    }

    @GetMapping(path = "/county/{county_name}")
    public LiveCountyData liveGetCountyByName(@PathVariable("county_name") String name) {
        return liveCountyService.liveGetCountyByName(name)
                .orElse(null);
    }

    @GetMapping(path = "/date/{date_string}")
    public List<LiveCountyData> liveGetCountiesByDate(@PathVariable("date_string") String stringDate) {
        return liveCountyService.liveGetCountiesByDate(stringDate);
    }

}