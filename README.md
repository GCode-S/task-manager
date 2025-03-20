# task-manager

🚀 Um sistema de gerenciamento de tarefas desenvolvido com Spring Boot (Backend) e Next.js (Frontend).

📌 Funcionalidades
✅ Cadastro, edição e remoção de tarefas
✅ Filtro por status e ordenação
✅ Paginação na listagem de tarefas
✅ Marcar tarefas como concluídas
✅ Integração entre Spring Boot + PostgreSQL no backend e Next.js + Axios + SWR + Context API + Tailwind CSS no frontend

🛠 Tecnologias Utilizadas
Backend (API REST)
Java + Spring Boot
PostgreSQL
Flyway para versionamento do banco
SpringDoc para documentação
Frontend
Next.js
React + Context API
Axios + SWR para requisições
Tailwind CSS para estilização


📌 Como rodar o projeto?
1️⃣ Clone o repositório
```git clone https://github.com/GCode-S/task-manager.git
2️⃣ Configurar o Backend
1️⃣ Acesse a pasta do backend:

```sh
Copiar
Editar
cd application/backend
2️⃣ Configure o application.properties com suas credenciais do PostgreSQL
3️⃣ Rode o backend com:

sh
Copiar
Editar
mvn spring-boot:run
3️⃣ Configurar o Frontend
1️⃣ Acesse a pasta do frontend:

sh
Copiar
Editar
cd ../frontend
2️⃣ Instale as dependências:

sh
Copiar
Editar
npm install
3️⃣ Rode o projeto:

sh
Copiar
Editar
npm run dev
