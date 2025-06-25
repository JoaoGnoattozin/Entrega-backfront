
# Projeto Mensal 4 – Sistema com Interface Gráfica em Java Swing

Este repositório contém a versão final do Projeto Mensal 4 da disciplina de Programação Orientada a Objetos. O sistema foi desenvolvido com **Java Swing**, utilizando a arquitetura **MVC**, persistência com **JPA/Hibernate** e banco de dados **PostgreSQL**.

## 🎯 Objetivo

Transformar o sistema console desenvolvido nos projetos anteriores em uma aplicação **visual, funcional e interativa**, com operações completas de cadastro, edição, consulta e exclusão de dados.

## 🧱 Tecnologias Utilizadas

* Java 17
* Java Swing (GUI)
* JPA (Jakarta Persistence API)
* Hibernate
* PostgreSQL
* Maven
* VS Code / IntelliJ

## 📁 Estrutura do Projeto

```
src/
├── model/         → Entidades JPA (@Entity)
├── repository/    → Interfaces JPA e Repositórios
├── service/       → Regras de negócio
├── controller/    → Controladores das views
├── view/          → Telas Java Swing (JFrame, JTable, etc.)
├── util/          → Utilitários e helpers
└── Main.java      → Classe principal de execução
```

## ✅ Funcionalidades Implementadas

* CRUD completo com interface Swing
* Exibição em tabelas (`JTable`)
* Filtros com `LIKE`, faixa de datas e valores
* JOIN entre tabelas com exibição na interface
* Operações agregadas (`AVG`, `COUNT`, etc.)
* Diálogos de confirmação com `JOptionPane`
* Validação de campos obrigatórios
* Design responsivo e usabilidade intuitiva

## ⚙️ Como Executar

### Pré-requisitos:

* Java 17+
* PostgreSQL instalado e configurado
* Maven instalado

### 1. Banco de Dados

Crie um banco chamado `projeto_mensal4` no PostgreSQL.

Atualize as credenciais no `persistence.xml`:

```xml
<property name="jakarta.persistence.jdbc.url" value="jdbc:postgresql://localhost:5432/projeto_mensal4"/>
<property name="jakarta.persistence.jdbc.user" value="SEU_USUARIO"/>
<property name="jakarta.persistence.jdbc.password" value="SUA_SENHA"/>
```

### 2. Executar no Terminal:

```
mvn clean compile
mvn exec:java -Dexec.mainClass="main.Main"
```

### 3. Ou executar no VS Code:

Abra `Main.java`, clique com o botão direito e selecione **Run Java**.

## 👨‍💻 Autor

**João Pedro Quadro**
[GitHub - @JoaoGnoattozin](https://github.com/JoaoGnoattozin)

## 📄 Licença

Uso acadêmico — Universidade UniAmérica.
