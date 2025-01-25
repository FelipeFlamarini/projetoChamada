# 🌟 **Chamada Inteligente**

Este projeto consiste em um sistema de chamada que utiliza **inteligência artificial** para automatizar o registro de presença em aulas na faculdade. A solução é baseada na análise de imagens capturadas em sala de aula, identificando e reconhecendo os participantes de forma **precisa** e **eficiente**.

> **Objetivo:** Modernizar e simplificar a rotina acadêmica, promovendo maior comodidade para professores e alunos.

---

## 👥 **Autores**

- [Felipe Flamarini](https://www.github.com/octokatherine)
- [Kauan Olival](https://www.github.com/octokatherine)
- [Leticia Escobar](https://www.github.com/octokatherine)
- [Nicholas Ricardo](https://www.github.com/octokatherine)
- [Patrick Dias](https://www.github.com/octokatherine)

---

## 💻 **Stacks Utilizadas**

### **Frontend:**

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

### **Backend:**

- 🐍 <a href="https://www.python.org/" style="color: inherit; text-decoration: none; font-weight: bold;">Python</a>
- 🚀 <a href="https://fastapi.tiangolo.com/" style="color: inherit; text-decoration: none; font-weight: bold;">FastAPI</a>
- 🤖 <a href="https://www.tensorflow.org/" style="color: inherit; text-decoration: none; font-weight: bold;">TensorFlow</a> & <a href="https://github.com/serengil/deepface" style="color: inherit; text-decoration: none; font-weight: bold;">DeepFace</a>

### **Banco de Dados:**

- 🗄️ <a href="https://www.mongodb.com/" style="color: inherit; text-decoration: none; font-weight: bold;">MongoDB</a>

### **Containerização:**

- 🐳 <a href="https://docs.docker.com/compose/" style="color: inherit; text-decoration: none; font-weight: bold;">Docker Compose</a>

---

## 📋 **Pré-requisitos**

- Docker e Docker Compose instalados
- **Versões testadas:** Docker (**v27.3.1**) & Docker Compose (**2.30.3**)

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

3. Configure o arquivo **.env** conforme descrito na seção [Variáveis de Ambiente](#variaveis-de-ambiente).
4. Configurar OAuth.

---

## 🛠️ **Executar Ambiente**

### **Construir os contêineres:**

```bash
  docker compose -p projetochamada-dev -f compose.dev.yaml build
```

### **Iniciar os contêineres:**

```bash
  docker compose -p projetochamada-dev -f compose.dev.yaml up
```

### **Parar os contêineres:**

```bash
  docker compose -p projetochamada-dev -f compose.dev.yaml down
```

### **Remover os contêineres:**

```bash
  docker compose -p projetochamada-dev -f compose.dev.yaml rm
```

---

## 🌐 **Rotas (Ambiente de Desenvolvimento)**

Com os contêineres já em execução e utilizando as variáveis padrão definidas no arquivo `.env.example`, é possível acessar as seguintes rotas:

### **Frontend (Vite e React)**

- 🌐 URL: [http://localhost:2009](http://localhost:2009)
- Interface do usuário desenvolvida com Vite e React.

### **Backend (FastAPI)**

- 📜 URL: [http://localhost:2010/docs](http://localhost:2010/docs)
- Documentação interativa da API (Swagger UI), permitindo a visualização e execução de endpoints.

### **Banco de Dados (Mongo Express)**

- 🗄️ URL: [http://localhost:2011](http://localhost:2011)
- Interface gráfica para visualização e gerenciamento do banco de dados MongoDB utilizando o Mongo Express.

---

## 🛠️ **Tasks Configuradas no VSCode**

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

## 📚 **Como usar**

Este guia explica detalhadamente como o usuário pode interagir com as rotas do sistema:

### **Rota 1: /** - Página inicial

Ao acessar a página inicial, você encontrará dois botões principais:

#### **1. 📷 Abrir câmera**

- Redireciona para a rota `/camera`.
- Na página `/camera`, o sistema utiliza a câmera do dispositivo para:
  - Validar a presença dos estudantes.
  - Registrar automaticamente as presenças no sistema.

#### **2. 🔐 Login com OAuth**

- Permite que o usuário faça login utilizando seu e-mail institucional.
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

#### **4. 🔓 Sair** (opcional)

- Encerra a sessão ou retorna à página inicial.

---

### **Rota 3: /camera** - 📸 Validação de presença com a câmera

- O sistema utiliza a câmera para:
  - Validar os estudantes presentes.
  - Registrar automaticamente as presenças no sistema.

---

### **Rota 4: /iniciar** - ⏯️ Controle de chamada

- Permite iniciar ou parar uma chamada em andamento.
- É necessário fornecer o **token** gerado na rota `/camera`.

---

### **Rota 5: /exportar** - 📄 Relatórios de presença

- Exporta a lista de chamadas realizadas.
- Filtra os registros por uma data específica.

---

### **Rota 6: /estudantes** - 🧑‍🎓 Gerenciamento de estudantes

- Exibe a lista de estudantes cadastrados no sistema.
- Permite importar um arquivo CSV para adicionar novos estudantes.

---
