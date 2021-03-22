package com.example.spring;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.spring.api.LiveCountyController;
import com.example.spring.model.LiveCountyData;
import com.example.spring.service.LiveCountyService;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

@WebMvcTest(LiveCountyController.class)
public class WebMockTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LiveCountyService service;

    @Test
    public void shouldReturnWithCountyName() throws Exception {

        LiveCountyData mockLiveCountyData = new LiveCountyData("Limerick", 2112, 10805,
                (float) 5543.9, 1616112000 , "19-03-2021");
        Optional<LiveCountyData> liveCountyData = Optional.ofNullable(mockLiveCountyData);

        when(service.liveGetCountyByName("Limerick")).thenReturn(liveCountyData);
        this.mockMvc.perform(get("/api/v1/live-county/county/Limerick")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("Limerick")));
    }
}
