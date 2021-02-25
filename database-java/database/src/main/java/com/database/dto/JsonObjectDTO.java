package com.database.dto;

import java.util.ArrayList;

import com.database.dto.UniqueIdFieldDTO;
import com.database.dto.SpatialReferenceDTO;
import com.database.dto.FieldsDTO;
import com.database.dto.FeaturesDTO;

public class JsonObjectDTO {
    public String objectIdFieldName;
    public UniqueIdFieldDTO uniqueIdField;
    public String globalIdFieldName;
    public  String geometryType;
    public SpatialReferenceDTO spatialReference;
    public ArrayList<FieldsDTO> fields;
    public ArrayList<FeaturesDTO> features;
}
