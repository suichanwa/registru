## Project Setup

### Prerequisites

- Node.js
- npm
- Oracle Database -> https://www.oracle.com/database/technologies/xe-downloads.html
- SQL developer -> https://www.oracle.com/database/sqldeveloper/technologies/download/
- Oracle client - https://www.oracle.com/database/technologies/instant-client/downloads.html

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/registru.git
cd registru
```

```bash
npm install

the env file
```

2. making .env file

just remove .example from .env.example

3. After installing oracle db creating user

```bash
CREATE USER orar_user IDENTIFIED BY yourpassword;
GRANT CONNECT, RESOURCE TO orar_user;
```

4. npm run start? 