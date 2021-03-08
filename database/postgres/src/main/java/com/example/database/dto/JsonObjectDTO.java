package com.example.database.dto;

import java.util.ArrayList;

import com.example.database.dto.UniqueIdFieldDTO;
import com.example.database.dto.SpatialReferenceDTO;
import com.example.database.dto.FieldsDTO;
import com.example.database.dto.FeaturesDTO;

public class JsonObjectDTO {
    public String objectIdFieldName;
    public UniqueIdFieldDTO uniqueIdField;
    public String globalIdFieldName;
    public  String geometryType;
    public SpatialReferenceDTO spatialReference;
    public ArrayList<FieldsDTO> fields;
    public ArrayList<FeaturesDTO> features;
}
