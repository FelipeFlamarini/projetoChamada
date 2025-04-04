# Pacote [api](api)
Possui os pacotes que serão utilizados externamente pela API.

## [app.py](app.py)
O script principal é onde os routers serão incorporados à API, possuindo também a inicialização do beanie e, consequentemente, os models que estarão no banco de dados. Para isso, é necessário importar os routers e os models para este script.

## Subpacote [models](api/models)
Cada model será uma coleção no banco de dados. Para um model ser inicializado no banco de dados, ele deve ser exportado para o app.py e passado para o init_beanie. Os models serão exportados e utilizados principalmente pelos [repositories](#subpacote-repositories).

## Subpacote [repositories](api/repositories)
Cada repository possuirá uma classe com funções estáticas com integração ao banco de dados referente à uma coleção Também podem existir repositories que servem apenas para auxiliar outros repositories, como funções referentes à arquivos CSV. Por exemplo, o repositório "Users" seria:
```python
class UsersRepository:
    @staticmethod
    def create_user(user):
        session.add(user)
        session.commit()

    @staticmethod
    def delete_user(user):
        session.delete(user)
        session.commit()
```
Os repositories serão exportados e utilizados principalmente pelos [routers](#subpacote-routers).

## Subpacote [routers](api/routers)
Cada router será responsável por gerenciar as rotas referentes à uma coleção no banco de dados. Por exemplo, o router "Users" seria:
```python
from fastapi import APIRouter, 
from api.repositories.Users import UsersRepository

users_router = APIRouter()

@users_router.post("/", status_code=201)
def create_user(user):
    UsersRepository.create_user(user)
    return {"message": "User created"}

@users_router.delete("/", status_code=200)
def delete_user(user):
    UsersRepository.delete_user(user)
    return {"message": "User deleted"}
```
Os routers serão exportados e incorporados na API pelo [app.py](#apppy).

## Subpacote [schemas](api/schemas)
Vindo do Pydantic, cada schema será responsável por verificar se as informações recebidas pelas requisições e enviadas pelas respostas estão corretas, verificando os tipos e os campos dos bodies, caso sejam JSON. Os schemas serão exportados e usados principalmentes pelos [repositories](#subpacote-repositories). Nem sempre será necessário usar schemas, pois o recebimento de informações pelo FastAPI e os modelos do Beanie já fazem verificação de tipos. Os schemas serão usados principalmente quando for necessário alterar informações já existentes no banco de dados.

# Pacote [utils](utils)
Possui os pacotes que serão utilizados internamente pela API.

## [db.py](utils/db.py)
Possui o script necessário para inicializar a conexão com o mongo utilizando o ORM Beanie.