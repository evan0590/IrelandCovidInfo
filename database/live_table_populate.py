import requests as rq
import json as js
from datetime import datetime
from utils import insert_row


def live_table_populate():
    county_rq = rq.get(
        "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/"
        "FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json")
    data = county_rq.text
    raw_parsed = js.loads(data)
    parsed = raw_parsed['features']
    for i in range(len(parsed)):
        county_name = parsed[i]['attributes']['CountyName']
        fid = parsed[i]['attributes']['FID']
        conf_cases = parsed[i]['attributes']['ConfirmedCovidCases']
        prop_cases = parsed[i]['attributes']['PopulationProportionCovidCases']
        time_stamp = parsed[i]['attributes']['TimeStampDate'] / 1000

        ts = time_stamp
        date_string = datetime.utcfromtimestamp(ts).strftime('%d-%m-%Y')

        sql = "INSERT INTO live_county_data(county_name, fid, confirmed_covid_cases, " \
              "population_proportion_covid_cases, time_stamp_date, date_string) " \
              "VALUES(%s, %s, %s, %s, %s, %s)"

        county_data = (county_name, fid, conf_cases, prop_cases, time_stamp, date_string)

        insert_row(sql, county_data)


live_table_populate()