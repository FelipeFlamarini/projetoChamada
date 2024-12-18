# Chamada Inteligente

Este projeto consiste em um sistema de chamada inteligente que utiliza inteligência artificial para automatizar o registro de presença em aulas na faculdade. A solução é baseada na análise de imagens capturadas em sala de aula, identificando e reconhecendo os participantes de forma precisa e eficiente.
Entre os principais benefícios do projeto estão:

- Registro automatizado de presença a partir de fotos;
- Integração com bancos de dados para geração de relatórios.

Este projeto busca modernizar e simplificar a rotina acadêmica, promovendo maior comodidade para professores e alunos.

Desenvolvido por [@FelipeFlamarini](https://github.com/FelipeFlamarini), [@kauan345developer](https://github.com/kauan345developer), [@LetEscobar](https://github.com/LetEscobar), [@nicholasss0](https://github.com/nicholasss0), [@patrick510](https://github.com/patrick510) e [@PsSave](https://github.com/PsSave).

## Stack

- Docker Compose
- Python
- FastAPI
- DeepFace
- TensorFlow
- MongoDB
- TypeScript
- Vite
- React

## Dependências para instalação

- Docker Compose

## Instalando e executando (ambiente de desenvolvimento)

### Utilizando comandos

Iniciando os containers

```sh
docker compose -f compose.dev.yaml up -d
```

Parando os containers

```sh
docker compose -f compose.dev.yaml down
```

### Utilizando as tasks do Visual Studio Code

#### Construindo e executando os containers

Dentro do Visual Studio Code, pressione F1 e digite o comando "Tasks: Run Task".
Selecione "(dev) Build and start containers" e aguarde a construção e execução dos containers.

#### Parando os containers

Dentro do Visual Studio Code, pressione F1 e digite o comando "Tasks: Run Task".
Selecione "(dev) Stop and remove containers" e aguarde finalização dos containers.

## Rotas (ambiente de desenvolvimento)

Com os containers já executando e usando as variáveis padrão do [.env.example](.env.example) é possível acessar as seguintes rotas:  
<http://localhost:2009>: Front-end em Vite e React.
<http://localhost:2010/docs>: Documentação e execução do back-end FastAPI;  
<http://localhost:2011>: Visualização do banco de dados com mongo-express;  
