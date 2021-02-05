import requests as rq
import json as js
from utils import insert_row


def static_table_populate():
    county_rq = rq.get(
        "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/"
        "FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json")
    data = county_rq.text
    raw_parsed = js.loads(data)
    parsed = raw_parsed['features']
    for i in range(len(parsed)):
        county_name = parsed[i]['attributes']['CountyName']
        lat = parsed[i]['attributes']['Lat']
        long = parsed[i]['attributes']['Long']
        population_census_16 = parsed[i]['attributes']['PopulationCensus16']

        sql = "INSERT INTO static_county_data(county_name, lat, long, population_census_16) " \
              "VALUES(%s, %s, %s, %s)"

        county_data = (county_name, lat, long, population_census_16)

        insert_row(sql, county_data)


static_table_populate()