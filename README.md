# Web Crawler

This project is a web crawler developed in Node.js using Playwright. It is designed to automate the login process, navigate specific web pages, extract content links, analyze the extracted content, and download files of different types. Also you can analyse the logs to get insights, visual data and pseudo code as recomendations using OPENAI API

## Instalation:

Prerequisites:

- Node.js (v14.x ou superior)
- npm (v6.x ou superior)


```sh
npm install
```

Create a .env file in the root of the project and add the environment variables:

env:

```
EMAIL=seu-email@exemplo.com
PASSWORD=sua-senha
BASE_URL=https://seu-endereco-base.com/
OPENAI_API_KEY=
```

Create a content folder in project root, Script will first ensure all paths exist:

```
2024-05-22 10:04:50 info: Starting the web crawler
2024-05-22 10:04:50 info: Ensured directory exists: content/htmls
2024-05-22 10:04:50 info: Ensured directory exists: content/downloads
2024-05-22 10:04:50 info: Starting crawl for URL: ***********
```

To run the crawler, use the command:

```sh
npm start
```

## Stress Tests Perfomance History:

(using Private URL as a base)

most urls would be ready in a blink of a eye

- V1 : +/- 12 minutos
- V2 (current) : between 4 to 1 minute depending on available RAM
- V2.1 (testing)

Jonatas Walker Filho
jonatasswwalker@reeducation.com.br
