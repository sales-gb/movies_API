# Locadora de filmes com TypeORM

# Introdução

Há alguns dias você recebeu uma demanda para elaborar a API de um serviço de locação de filmes. Porém a forma com que você executou e as ferramentas que utilizou não agradaram o nosso cliente... É... ele é exigente.

Portanto, agora você precisará reescrever esse projeto com outras tecnologias. Além disso o cliente adicionou algumas novas regras de negócio ao projeto.

Bora para esse desafio?!

# Regras da entrega

**A entrega deve seguir as seguintes regras:**

-   O código deve estar em **_TypeScript_**, caso não esteja a entrega será zerada;
-   Deve ser feita a **_serialização_** dos dados utilizando a biblioteca **_zod_**.
-   Deverá ser utilizado um banco de dados **_postgres_** para a elaboração da API;
-   Deverá utilizar **_TypeORM_** no lugar de **_PG e PG-Format_**
-   O nome da tabela/entidade, colunas e demais especificações, devem ser **_seguidas à risca_**. Caso tenha divergência, os testes não funcionarão e será descontado nota;
    -   Tenha muita atenção sobre o nome das chaves nos objetos de entrada e saída de cada requisição;
-   Na raiz do diretório deve-se conter uma imagem do DER nomeada como diagram.png/jpg
    -   Esse DER não pode ser o criado pelo dbeaver.

**Essa entrega possui testes automatizados, portanto:**

-   A alteração nos testes implica em ter a nota da entrega zerada.
-   Os arquivos de testes e configuração para execução deles já se encontram no repositório da entrega, sendo necessário configurar a conexão com o banco de dados para teste e desenvolvimento, e todo o restante para que a aplicação funcione.
-   Não altere nenhum arquivo, apenas acrescente os arquivos que forem necessários.

        Dica!
        Como essa entrega contém testes, sempre que criar uma nova rota execute o comando de execução dos testes npm run test ou yarn test a depender do gerenciador de pacotes usado.
        A execução dos testes a cada criação de rota ajuda no debug e no andamento do projeto, e evita erros surpresas quando o projeto estiver 100% concluído.
        Também use o insomnia para ir testando as rotas na medida que for desenvolvendo o projeto.

**Inicialização do projeto**

-   Será necessário estruturar todo o repositório e instalar as dependências corretas para o funcionamento do projeto.
-   No diretório estão apenas os arquivos e sub-pastas:

    -   .env.example:

        -   Contendo apenas a variável DATABASE_URL que deverá conter a url de conexão com o banco;
        -   Deve ser utilizado como base para o seu .env.

    -   package.json:

        -   Estão definidas nesse arquivos apenas as bibliotecas relacionadas aos testes;
        -   Todas as demais bibliotecas devem ser instaladas por você.

    -   .gitignore:

        -   Caso sinta necessidade pode adicionar novos arquivos à serem ignorados.

    -   jest.config.ts:

        -   Arquivo de configuração para os testes.

    -   src/entities:

        -   Por necessidade dos testes, precisamos que a estrutura siga a pré definida.
        -   Será necessário completar o arquivo movies.entity.ts com a criação correta da entidade de Movies.
        -   Apenas acrescente o código necessário, não mude nada que já está feito.

    -   src/\_\_tests\_\_:

        -   Não devem ser alterados, caso os testes tenham qualquer tipo de alteração a entrega será zerada.

                Atenção!
                Nessa entrega a conexão com o banco de dados não está sendo realizada.
                Portanto lembre-se de realizar a conexão para o banco de desenvolvimento e para o banco de testes.

# Endpoints

| Método | Endpoint    | Responsabilidade                  |
| ------ | ----------- | --------------------------------- |
| POST   | /movies     | Cadastra um novo filme            |
| GET    | /movies     | Lista todos os filmes cadastrados |
| PATCH  | /movies/:id | Atualiza o filme passado por id   |
| DELETE | /movies/:id | Deleta o filme passado por id     |

# Regras da Aplicação

-   Deve ser criado um banco de dados em **_PostgreSQL_** com uma tabela/entidade nomeada como **_movies_**, para armazenar os dados das requisições.

-   A tabela de **_movies_** deve ter as colunas necessárias para armazenar os seguintes dados:

    -   **id**: inteiro, sequencial e chave primária.
    -   **name**: string, tamanho máximo de 50, único e obrigatório.
    -   **description**: texto.
    -   **duration**: inteiro e obrigatório.
    -   **price**: inteiro e obrigatório.

-   Como estamos trabalhando com TypeORM, deve ser criada uma entidade de movies com os campos descritos acima, e essa entidade vai ser convertida em tabela através de uma migração.
-   O **nome da classe da entidade deve ser Movie** e deve ser criado um arquivo index.ts dentro da pasta de entities centralizando o export dela para que os testes funcionem.
-   Nas rotas **POST** e **PATCH**, é necessário serializar os dados de entrada utilizando o zod. Chaves não mapeadas devem ser ignoradas.
-   Na rota **POST /movies**, a chave **id** deve ser ignorada, o próprio serviço deve preencher esse dado. A chave **description** é opcional, caso não seja enviada deve ser salvo como **null**.
-   Na rota **PATCH /movies/:id**, a chave **id** não pode ser atualizada, caso enviada no body deve ser ignorada.

## **Regras de Paginação**

A rota **GET /movies** deve conter paginação.

-   Essa rota recebe quatro query params, sendo eles: **_page_**, **_perPage_**, **_order_** e **_sort_**.
-   Essa rota retornará um objeto de paginação que irá conter as seguintes chaves: **prevPage**, **nextPage**, **count** e **data**.

Segue abaixo o que cada chave significa e a regra de cada um dos query params.

### **Query params: order e sort**

-   **sort**: recebe em qual **_coluna_** a ordenação deve ser feita. Pode receber apenas dois valores:

    -   **_price_**
    -   **_duration_**
        -   Caso **_nenhum_** desses valores seja enviado, deve ordenar por **_id_**.

-   **order**: recebe qual o **_tipo_** de ordenação que será feita. Pode receber apenas dois valores:
    -   **asc**
    -   **desc**
        -   Caso **_nenhum_** desses valores seja enviado, deve utilizar **_asc_**.

### **Query params: perPage e page**

-   **perPage**: recebe qual a **_quantidade_** de dados que devem ser **retornados**.

    -   Deve receber um número inteiro **maior que 0 e menor ou igual a 5**
        -   Caso o número enviado não atenda esse requisito, deve retornar **_cinco dados_**.

-   **page**: recebe qual **_página_** deve ser **_retornada_**.
    -   Recebe apenas **números inteiros e maiores que 0**
    -   Caso o número enviado **_não atenda_** esses requisitos, deve utilizar a **_primeira página_**, ou seja, deve ser **_1_**
    -   Deve **_respeitar_** o **_perPage_**:
        -   se **_page_** for igual à **_três_** e **_perPage_** for igual à **_dois_**, deve **_retornar dois dados_**, **_começando pelo id cinco_** e indo **_até_** o **_id seis_**.

### **Objeto de paginação**

Deve seguir as regras do page e do perPage.

Um exemplo mais claro estará nos exemplos de requisição da rota **GET - /movies**

-   **prevPage**: página anterior
    -   **_tipo_**: string ou null;
    -   Caso a próxima página exista, deve retornar uma url redirecionando para a página;
    -   Caso contrario deve retornar null;
-   **nextPage**: próxima página;
    -   **_tipo_**: string ou null;
    -   Caso a próxima página exista, deve retornar uma url redirecionando para a página;
    -   Caso contrario deve retornar null;
-   **count**: contagem de dados existentes no banco de dados;
    -   **_tipo_**: number;
-   **data**: os filmes listados pela requisição;
    -   **_tipo_**: Array de movies;
    -   A quantidade de filmes retornados deve seguir as regras do perPage.

## **Exemplos de Requisição**

### **Casos de Erro:**

    Todos os casos de erros listados a seguir, devem ser executados por meio de middlewares.

-   O **nome** (name) deve ser **único**. Nas rotas **POST e PATCH /movies**, caso seja enviado um nome já registrado, deve retornar a mensagem de erro e o status code mencionados abaixo.

    | Resposta do servidor:                                 |
    | ----------------------------------------------------- |
    | Body: Formato Json                                    |
    | Status code: <b style="color:orange">409 CONFLICT</b> |

    ```json
    {
        "message": "Movie already exists."
    }
    ```

-   A **_serialização_** dos dados de entrada deve ser feita utilizando o **_zod_**. Essa serialização deve acontecer nas rotas **_POST e PATCH_**. Em caso de erro ao validar os dados, deve retornar a mensagem de erro e o status code mencionados abaixo.

    -   O retorno dos erros do **_zod_** deve estar dentro de um objeto **"message"**

    | Resposta do servidor:                                    |
    | -------------------------------------------------------- |
    | Body: Formato Json                                       |
    | Status code: <b style="color:orange">400 BAD REQUEST</b> |

    ```json
    {
        "message": {
            "name": ["Expected string, received number"],
            "duration": ["Expected number, received string"]
        }
    }
    ```

-   Em **todas as rotas que recebem id por parâmetro**, deve verificar se o **_id informado existe_**. Caso o filme (movie) não exista, deve retornar a mensagem de erro e o status code mencionados abaixo.

    | Resposta do servidor:                                  |
    | ------------------------------------------------------ |
    | Body: Formato Json                                     |
    | Status code: <b style="color:orange">404 NOT FOUND</b> |

    ```json
    {
        "message": "Movie not found"
    }
    ```

### **Casos de sucesso**

### **POST - /movies**

Rota de criação de filmes. A chave **_description_** é **_opcional_**.

| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
    "id": 40,
    "duration": 60,
    "name": "Movie: Sem description",
    "price": 200
}
```

| Resposta do servidor:                               |
| --------------------------------------------------- |
| Body: Formato Json                                  |
| Status code: <b style="color:green">201 CREATED</b> |

```json
{
    "id": 1,
    "name": "Movie: Sem description",
    "description": null,
    "duration": 60,
    "price": 200
}
```

### **GET - /movies**

Deve ser possível listar os filmes armazenados no banco de dados. **_Seguindo as regras de paginação_**

**Url da requisição**: `http://localhost:3000/movies/?sort=price&order=desc&page=2&perPage=3`

| Resposta do servidor:                          |
| ---------------------------------------------- |
| Body: Formato Json                             |
| Status code: <b style="color:green">200 OK</b> |

```json
{
    "prevPage": "http://localhost:3000/movies?page=1&perPage=3",
    "nextPage": "http://localhost:3000/movies?page=3&perPage=3",
    "count": 14,
    "data": [
        {
            "id": 8,
            "name": "Filme 08",
            "description": null,
            "duration": 88,
            "price": 72
        },
        {
            "id": 4,
            "name": "Filme 04",
            "description": null,
            "duration": 75,
            "price": 72
        },
        {
            "id": 11,
            "name": "Filme 11",
            "description": null,
            "duration": 7,
            "price": 68
        }
    ]
}
```

### **PATCH - /movies/:id**

Deve ser possível atualizar um filme pelo id recebido nos parâmetros da rota.

**Url da requisição**: `http://localhost:3000/movies/4`

| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
    "id": 55,
    "duration": 130,
    "price": 200
}
```

| Resposta do servidor:                          |
| ---------------------------------------------- |
| Body: Formato Json                             |
| Status code: <b style="color:green">200 OK</b> |

```json
{
    // repare no valor enviado e no recebido do id
    "id": 4,
    "name": "Filme 04",
    "description": null,
    "duration": 130,
    "price": 200
}
```

### **DELETE - /movies/:id**

Deve ser possível deletar um filme pelo id recebido nos parâmetros da rota.

| Resposta do servidor:                                  |
| ------------------------------------------------------ |
| Body: **Nenhum body deve ser retornado**               |
| Status code: <b style="color:green">204 NO CONTENT</b> |

```json

```
