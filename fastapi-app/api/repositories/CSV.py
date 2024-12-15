import csv
import codecs

csv.field_size_limit(20971520) # each field can contain a maximum of 20MB of data

# TODO: check exceptions
class CSVRepository:
    @staticmethod
    def get_list_of_dicts_from_csv(csv_file: bytes):
        try:
            return list(csv.DictReader(codecs.iterdecode(csv_file, "utf-8")))
        except:
            raise Exception("Could not read CSV file. Each field must have a maximum of 20MB of data")
