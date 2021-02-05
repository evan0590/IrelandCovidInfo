import psycopg2
from decouple import config

sql_static_county = "CREATE TABLE static_county_data(county_name varchar (12), " \
                    "lat numeric, long numeric," \
                    "population_census_16 integer);"

sql_live_county = "CREATE TABLE live_county_data(county_name varchar (12), FID smallint ," \
                  "confirmed_covid_cases integer, population_proportion_covid_cases numeric," \
                  "time_stamp_date integer, date_string varchar (25));"

database = config('DB_DATABASE')
host = config('DB_HOST')
user = config('DB_USER')
password = config('DB_PASSWORD')


# noinspection DuplicatedCode
def create_tables(sql_query):
    conn = psycopg2.connect(database=database,
                            host=host,
                            port=5432, user=user, password=password)
    try:
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql_query)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


create_tables(sql_static_county)
create_tables(sql_live_county)
