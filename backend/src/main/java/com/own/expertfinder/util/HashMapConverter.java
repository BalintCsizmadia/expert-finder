package com.own.expertfinder.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.util.Map;

@Converter
public class HashMapConverter implements AttributeConverter<Map<String, Object>, String> {

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public String convertToDatabaseColumn(Map<String, Object> customerInfo) {
        String customerInfoJson = null;
        try {
            customerInfoJson = objectMapper.writeValueAsString(customerInfo);
        } catch (final JsonProcessingException e) {
            System.out.println(e.getMessage());
            // TODO logger
           // logger.error("JSON writing error", e);
        }
        return customerInfoJson;
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String customerInfoJSON) {
        Map<String, Object> customerInfo = null;
        try {
            customerInfo = objectMapper.readValue(customerInfoJSON, Map.class);
        } catch (final IOException e) {
            System.out.println(e.getMessage());
            // TODO logger
          //  logger.error("JSON reading error", e);
        }
        return customerInfo;
    }

}
