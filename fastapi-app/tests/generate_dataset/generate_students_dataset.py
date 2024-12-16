import pathlib
import base64
import csv

images_path = pathlib.Path("images")
dataset_file = pathlib.Path("students.csv")
dataset_fields = ["ra", "name", "image_base64"]

with dataset_file.open("w", newline='') as file:
    writer = csv.DictWriter(file, fieldnames=dataset_fields)
    writer.writeheader()
    
    for image in images_path.iterdir():
        if image.is_file():
            file_name = image.stem.split("_")
            
            student_name = file_name[0]
            student_ra = file_name[1]
            with image.open("rb") as img_file:
                image_base64 = base64.b64encode(img_file.read()).decode('utf-8')
                
            writer.writerow({
                "ra": student_ra,
                "name": student_name,
                "image_base64": image_base64
            })