import face_recognition
import pathlib

path = pathlib.Path("images_repository")

for dir in path.iterdir():
    print(f"Comparando imagem teste com imagem {dir.name}")
    
    known_image = face_recognition.load_image_file(f"{path.name}/{dir.name}")
    unknown_image = face_recognition.load_image_file("teste2.jpg")

    known_encoding = face_recognition.face_encodings(known_image)[0]
    unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

    results = face_recognition.compare_faces([known_encoding], unknown_encoding)
    if results[0]:
        print("Corresponde\n")
        break
    else:
        print("Não corresponde\n")
    
    
    
    
    
    
    
    