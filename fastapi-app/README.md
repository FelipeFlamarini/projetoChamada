# Pacote [api](api)
Possui os pacotes que serão utilizados externamente pela API.

## [app.py](app.py)
O script principal é onde os routers serão incorporados à API, possuindo também a inicialização do beanie e, consequentemente, os models que estarão no banco de dados. Para isso, é necessário importar os routers e os models para este script.

## Subpacote [models](api/models)
Cada model será um documento no banco de dados. Para um model ser inicializado no banco de dados, ele deve ser exportado para o app.py e passado para o init_beanie. Os models serão exportados e utilizados principalmente pelos [routers](#subpacote-routers).


## Subpacote [routers](api/routers)
Cada router será responsável por gerenciar as rotas referentes à um documento no banco de dados. Por exemplo, o router "students" seria:
```python
from fastapi import APIRouter, 
from api.models.Student import Student

students_router = APIRouter()

@students_router.post("/", status_code=201)
async def create_student(student):
    return await Student(student).create()

@students_router.delete("/", status_code=200)
def delete_student(student):
    return await Student.get(student).delete()
```
Os routers serão exportados e incorporados na API pelo [app.py](#apppy).

## Subpacote [schemas](api/schemas)
Vindo do Pydantic, cada schema será responsável por verificar se as informações recebidas pelas requisições e enviadas pelas respostas estão corretas, verificando os tipos e os campos dos bodies. Os schemas serão exportados e usados principalmentes pelos [routers](#subpacote-routers).

# Pacote [utils](utils)
Possui os pacotes que serão utilizados internamente pela API.

## [db.py](utils/db.py)
Possui o script necessário para inicializar a conexão com o mongo utilizando o ORM Beanie.