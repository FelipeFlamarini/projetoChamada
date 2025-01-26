# 🌟 **Chamada Inteligente**

Este projeto consiste em um sistema de chamada que utiliza **inteligência artificial** para automatizar o registro de presença em aulas na faculdade. A solução é baseada na análise de imagens capturadas em sala de aula, identificando e reconhecendo os participantes de forma **precisa** e **eficiente**.

> **Objetivo:** Modernizar e simplificar a rotina acadêmica, promovendo maior comodidade para professores e alunos.

---

## 👥 **Autores**

- [Felipe Flamarini](https://www.github.com/felipeflamarini)  
- [Kauan Olival](https://www.github.com/kauan345developer)  
- [Leticia Escobar](https://www.github.com/LetEscobar)  
- [Nicholas Ricardo](https://www.github.com/nicholasss0)  
- [Patrick Dias](https://www.github.com/patrick510)
- [Pedro Samuel](https://www.github.com/PsSave)

---

## 💻 **Stacks utilizadas**

### **Front-end:**

- ⚛️ <a href="https://reactjs.org/" style="color: inherit; text-decoration: none; font-weight: bold;">React</a>
- 🛠️ <a href="https://www.typescriptlang.org/" style="color: inherit; text-decoration: none; font-weight: bold;">TypeScript</a>
- ⚡ <a href="https://vitejs.dev/" style="color: inherit; text-decoration: none; font-weight: bold;">Vite</a>
- 🎨 <a href="https://ui.shadcn.com/" style="color: inherit; text-decoration: none; font-weight: bold;">Shadcn/ui</a> & <a href="https://tailwindcss.com/" style="color: inherit; text-decoration: none; font-weight: bold;">TailwindCSS</a>
- ✅ <a href="https://zod.dev/" style="color: inherit; text-decoration: none; font-weight: bold;">Zod</a>
- 📡 <a href="https://tanstack.com/query/latest" style="color: inherit; text-decoration: none; font-weight: bold;">Tanstack Query</a>
- 📋 <a href="https://react-hook-form.com/" style="color: inherit; text-decoration: none; font-weight: bold;">React Hook Form</a>
- 🌀 <a href="https://orval.dev/" style="color: inherit; text-decoration: none; font-weight: bold;">Orval</a>
- 📍 <a href="https://reactrouter.com/" style="color: inherit; text-decoration: none; font-weight: bold;">React Router</a>
- 👁️ <a href="https://justadudewhohacks.github.io/face-api.js/docs/index.html" style="color: inherit; text-decoration: none; font-weight: bold;">FaceAPI.js</a>

### **Back-end:**

- 🐍 <a href="https://www.python.org/" style="color: inherit; text-decoration: none; font-weight: bold;">Python</a>
- 🚀 <a href="https://fastapi.tiangolo.com/" style="color: inherit; text-decoration: none; font-weight: bold;">FastAPI</a>
- 🤖 <a href="https://www.tensorflow.org/" style="color: inherit; text-decoration: none; font-weight: bold;">TensorFlow</a> & <a href="https://github.com/serengil/deepface" style="color: inherit; text-decoration: none; font-weight: bold;">DeepFace</a>
- 🌐 <a href="https://nginx.org/" style="color: inherit; text-decoration: none; font-weight: bold;">Nginx</a>

### **Banco de Dados:**

- 🗄️ <a href="https://www.mongodb.com/" style="color: inherit; text-decoration: none; font-weight: bold;">MongoDB</a>

### **Containerização:**

- 🐳 <a href="https://docs.docker.com/compose/" style="color: inherit; text-decoration: none; font-weight: bold;">Docker Compose</a>

---

## 📋 **Pré-requisitos**

- Docker e Docker Compose instalados
- **Versões testadas:** Docker (**v27.3.1**) & Docker Compose (**2.30.3**)
- No Windows, recomendamos que todo o processo seja executado dentro de uma instância do WSL 2.

---

## 🚀 **Instalação**

1. **Clone** o repositório:  

```bash
  git clone https://github.com/FelipeFlamarini/projetoChamada.git
```

2. Acesse o **diretório do projeto**:  

```bash
  cd projetoChamada
```  

3. Crie uma cópia do arquivo **.env.example** e renomeie para **.env**. O usuário pode alterar as variáveis conforme desejar, mas seguiremos usando as variáveis padrões no decorrer deste guia.

```bash
  cp .env.example .env
```

4. Crie uma instância do **OAuth 2.0** do **Google**.

- Acesse o **[Google Cloud Console](https://console.cloud.google.com)** e selecione ou crie um novo projeto.
- Ative a **[Google People API](https://console.cloud.google.com/apis/library/people.googleapis.com)** para receber as informações dos usuários no sistema. Não é necessário criar credenciais para esta API.
- Inicie a **[Configuração do projeto](https://console.cloud.google.com/auth/overview/create)**. Preencha conforme necessário e clique em "Continuar".
- Em "Público", selecione conforme o desejo do usuário. É importante lembrar que, caso selecione "Externo", será necessário uma configuração extra para liberar o acesso ao sistema para outros usuários Caso selecionar "Interno", todos os usuários da organização poderão acessar.
- Preencha "Dados de contato" conforme necessário.
- Em "Concluir", aceite a política de dados do usuário dos serviços de API do Google e clique em "Criar".
- Na página **[IDs do cliente OAuth 2.0](https://console.cloud.google.com/auth/clients)**, selecione "Criar cliente", preencha o "Tipo de aplicativo" com "Aplicativo da Web" e adicione um nome qualquer. No campo "Origens JavaScript autorizadas", adicione `http://localhost:2010`. No campo "URI de redirecionamento autorizado", adicione `http://localhost:2010/api/auth/google/callback`. Clique em criar.
- Após a criação do cliente, acesse novamente página **[IDs do cliente OAuth 2.0](https://console.cloud.google.com/auth/clients)** e clique no cliente criado. Note que, à direita dos campos, existem as informações "ID do cliente" e "Chave secreta do cliente".
- Copie o "ID do cliente" e cole no arquivo **.env** na variável `FASTAPI_APP_OAUTH_GOOGLE_CLIENT_ID`, de forma que fique `FASTAPI_APP_OAUTH_GOOGLE_CLIENT_ID=seu_id_aqui`.
- Copie a "Chave secreta do cliente" e cole no arquivo **.env** na variável `FASTAPI_APP_OAUTH_GOOGLE_CLIENT_SECRET`, de forma que fique `FASTAPI_APP_OAUTH_GOOGLE_CLIENT_SECRET=sua_chave_secreta_aqui`.
- É possível acessar o sistema com o e-mail usado para criar o projeto no Google Cloud Console. Caso tenha selecionado "Externo" na página "Público", você pode adicionar outros usuários na página **[Público](https://console.cloud.google.com/auth/audience)**.

---

## 🛠️ **Executando ambiente de desenvolvimento**

O ambiente de desenvolvimento possui módulos **hot-reload** para o front-end e back-end, permitindo a visualização instantânea das alterações realizadas. No Windows, é necessário clonar o repositório em uma instância do WSL 2 para garantir a compatibilidade com o Docker e o **hot-reload**.

### **Construindo os contêineres de desenvolvimento:**  

```bash
  docker compose -p projetochamada-dev -f compose.dev.yaml build
```

### **Iniciando os contêineres de desenvolvimento:**  

```bash
  docker compose -p projetochamada-dev -f compose.dev.yaml up
```

### **Parando os contêineres de desenvolvimento:**  

```bash
  docker compose -p projetochamada-dev -f compose.dev.yaml down
```

### **Removendo os contêineres de desenvolvimento:**  

```bash
  docker compose -p projetochamada-dev -f compose.dev.yaml rm
```

---

## 🌐 **Rotas (Ambiente de desenvolvimento)**

Com os contêineres já em execução e utilizando as variáveis padrões definidas no arquivo `.env.example`, é possível acessar as seguintes rotas:

### **Front-end (Vite e React)**

- 🌐 URL: [http://localhost:2009](http://localhost:2009)
- Interface do usuário desenvolvida com Vite e React.

### **Back-end (FastAPI)**

- 📜 URL: [http://localhost:2010/docs](http://localhost:2010/docs)
- Documentação interativa da API (Swagger UI), permitindo a visualização e execução de endpoints.

### **Banco de Dados (Mongo Express)**

- 🗄️ URL: [http://localhost:2011](http://localhost:2011)
- Interface gráfica para visualização e gerenciamento do banco de dados MongoDB utilizando o Mongo Express.

---

## 🛠️ **Tasks Configuradas no VSCode (Ambiente de desenvolvimento)**

No **VSCode**, é possível acessar as tasks configuradas:

1. Abra o **Command Palette** (`F1` ou `Ctrl+Shift+P`).
2. Selecione a opção **Run Task**.

| **Task**                                | **Descrição**                                                            |
| --------------------------------------- | ------------------------------------------------------------------------ |
| 🏗️ **(dev) Build containers**           | Constrói os contêineres baseados no arquivo `compose.dev.yaml`.          |
| ▶️ **(dev) Start containers**           | Inicia os contêineres já construídos.                                    |
| 🔄 **(dev) Build and start containers** | Constrói e inicia os contêineres em sequência.                           |
| ⏹️ **(dev) Stop containers**            | Para todos os contêineres.                                               |
| ❌ **(dev) Remove containers**          | Remove os contêineres parados.                                           |
| 🔥 **(dev) remove mongo_data**          | Remove o volume `projetochamada_mongo_data` após confirmação interativa. |

---

## 🛠️ **Executando ambiente de produção**

O ambiente de produção traz mais estabilidade para o sistema, perdendo o **hot-reload** mas garantindo a confiabilidade para a execução.

### **Construindo os contêineres de produção:**  

```bash
  docker compose -p projetochamada-prod -f compose.prod.yaml build
```

### **Iniciando os contêineres de produção:**  

```bash
  docker compose -p projetochamada-prod -f compose.prod.yaml up
```

### **Parando os contêineres de produção:**  

```bash
  docker compose -p projetochamada-prod -f compose.prod.yaml down
```

### **Removendo os contêineres de produção:**  

```bash
  docker compose -p projetochamada-prod -f compose.prod.yaml rm
```

## 🌐 Rotas (Ambiente de produção)

São as mesmas do ambiente de desenvolvimento, exceto pelo mongo express, que não é utilizado em produção.

## Tasks Configuradas no VSCode (Ambiente de produção)

No **VSCode**, é possível acessar as tasks configuradas:

1. Abra o **Command Palette** (`F1` ou `Ctrl+Shift+P`).
2. Selecione a opção **Run Task**.

| **Task**                                | **Descrição**                                                            |
| --------------------------------------- | ------------------------------------------------------------------------ |
| 🏗️ **(prod) Build containers**           | Constrói os contêineres baseados no arquivo `compose.prod.yaml`.          |
| ▶️ **(prod) Start containers**           | Inicia os contêineres já construídos.                                    |
| 🔄 **(prod) Build and start containers** | Constrói e inicia os contêineres em sequência.                           |
| ⏹️ **(prod) Stop containers**            | Para todos os contêineres.                                               |
| ❌ **(prod) Remove containers**          | Remove os contêineres parados.                                           |

---

## 📚 **Como usar nosso sistema**

Este guia explica detalhadamente como o usuário pode interagir com as rotas do nosso front-end, no endereço [http://localhost:2009](http://localhost:2009).

### **Rota 1: /** - Página inicial

Ao acessar a página inicial, você encontrará dois botões principais:

#### **1. 📷 /camera**

- Redireciona para a rota `/camera`.
- Na página `/camera`, o sistema utiliza a câmera do dispositivo para:
  - Validar a presença dos estudantes;
  - Registrar automaticamente as presenças no sistema.
- Inicialmente, a página mostra apenas um token de 4 dígitos. É necessário que um usuário logado no sistema acesse a página rota **"/iniciar"** para iniciar o processo de chamada utilizando o token na página.
- O token só é válido enquanto esta página está aberta e conectada ao servidor. Ou seja, é necessário usar 2 dispositivos ou 2 páginas do navegador para iniciar o processo de chamada. Isso é proposital, permitindo que o processo de chamada possa ser iniciado sem a necessidade de login, mas ao comando de um usuário no sistema, e possivelmente de aparelhos diferentes.
- O processo de chamada precisa de pelo menos 2 estudantes cadastrados.
- Após o processo de chamada ser iniciado, a página mostrará a câmera do aparelho. Quando um rosto aparece e é identificado na câmera, haverá um feedback da página. Esse feedback pode indicar que:
  - O rosto não foi reconhecido;
  - O rosto foi reconhecido. Neste caso, uma janela aparecerá mostrando os dados da pessoa que o sistema reconheceu. O usuário irá verificar os dados e responder se ele é ou não é a pessoa indicada. Caso a resposta seja sim, sua presença será gravada no banco de dados e o processo de chamada continuará. Caso seja não, o sistema ainda pode perguntar se ele é outra pessoa que possui um nível grande de semelhança. Caso a resposta ainda seja não, o processo de chamada continuará normalmente.

#### **2. 🔐 Login com OAuth**

- Permite que o usuário faça login utilizando o protocol **OAuth 2.0** com o provedor **Google**.
- Após a autenticação, o usuário é redirecionado para a rota `/home`.

---

### **Rota 2: /home** - Menu principal

Na rota `/home`, você acessa um menu central com quatro botões principais:

#### **1. ▶ Iniciar**

- Permite iniciar ou parar uma chamada.
- Requer o **token** gerado na rota `/camera`.

#### **2. 📤 Exportar**

- Permite exportar a lista de chamadas realizadas com base em uma data específica.

#### **3. 👥 Estudantes**

- Exibe a lista de estudantes cadastrados no sistema.
- Permite importar um arquivo CSV para adicionar novos estudantes.

#### **4. 🔓 Sair**

- Encerra a sessão ou retorna à página inicial.

---

### **Rota 3: /iniciar** - ⏯️ Controle de chamada

- Permite iniciar ou parar uma chamada em andamento.
- É necessário fornecer o **token** gerado na rota `/camera`.

---

### **Rota 4: /exportar** - 📄 Relatórios de presença

- Exporta a lista de chamadas realizadas.
- Filtra os registros por uma data específica.

---

### **Rota 5: /estudantes** - 🧑‍🎓 Gerenciamento de estudantes

- Exibe a lista de estudantes cadastrados no sistema.
- Permite importar um arquivo CSV para adicionar novos estudantes.

---
