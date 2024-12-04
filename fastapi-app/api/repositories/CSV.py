import csv
import codecs


class CSVRepository:
    @staticmethod
    def get_list_of_dicts_from_csv(csv_file: bytes):
        return list(csv.DictReader(codecs.iterdecode(csv_file, "utf-8")))
