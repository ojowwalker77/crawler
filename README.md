# Web Crawler

Este projeto é um web crawler desenvolvido em Node.js utilizando Playwright. Ele é projetado para automatizar o processo de login, navegar em páginas web específicas, extrair links de conteúdo, analisar o conteúdo extraído e baixar arquivos de diferentes tipos.

## Instalação:

Pré-requisitos:

- Node.js (v14.x ou superior)
- npm (v6.x ou superior)

Passos para Instalação

```sh
npm install
```

Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente:

env:

```
EMAIL=seu-email@exemplo.com
PASSWORD=sua-senha
BASE_URL=https://seu-endereco-base.com/
OPENAI_API_KEY=
```

Para executar o crawler, use o comando:

```sh
npm start
```

## Perfomance History:

(usando science/resources como base)

- V1 (usada para entrega do IB Science): +/- 12 minutos
- V2, reescrita (atual) : entre 4 a 1 minuto dependendo da RAM disponível
- V2.1 (estou testando) :

Jonatas Walker Filho
jonatas.walker@reeducation.com.br
