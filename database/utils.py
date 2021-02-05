import psycopg2
from decouple import config


def insert_row(query, data):
    database = config('DB_DATABASE')
    host = config('DB_HOST')
    user = config('DB_USER')
    password = config('DB_PASSWORD')
    conn = psycopg2.connect(database=database,
                            host=host,
                            port=5432, user=user, password=password)
    try:
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(query, data)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
