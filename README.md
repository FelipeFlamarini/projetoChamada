# Chamada Inteligente
Nosso objetivo é criar um sistema de chamada utilizando reconhecimento facial.
Desenvolvido por @FelipeFlamarini, @kauan345developer, @LetEscobar, @nicholasss0, @patrick510 e @PsSave 
## Stack
- Docker Compose
- Python
- FastAPI
- deepface
- tensorflow
- mongodb
- mongo-express

## Dependências para instalação
- Docker Compose

## Instalando e executando (ambiente de desenvolvimento)

### Utilizando as tasks do Visual Studio Code

#### Construindo e executando os containers
Dentro do Visual Studio Code, pressione F1 e digite o comando "Tasks: Run Task". 
Selecione "(dev) Build and start containers" e aguarde a construção e execução dos containers.

#### Parando os containers
Dentro do Visual Studio Code, pressione F1 e digite o comando "Tasks: Run Task". 
Selecione "(dev) Stop and remove containers" e aguarde finalização dos containers.


### Utilizando comandos
Iniciando os containers
```sh
docker compose -f compose.dev.yaml up
```

Parando os containers
```sh
docker compose -f compose.dev.yaml down
```

## Rotas (ambiente de desenvolvimento)
Com os containers já executando, é possível acessar as seguintes rotas:
http://localhost:8000/docs : Documentação do back-end FastAPI
http://localhost:8081 : mongo-express
: Front-end