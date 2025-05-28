# 🚀 Testes Automatizados - Lista 1 (S206)
Este repositório contém os testes automatizados desenvolvidos para a **Lista 1 da disciplina S206 - Testes de Software**, utilizando o framework **Cypress**.

## 👥 Integrantes
Felipe Mendes Silva Zeferino, 511 – responsável pela execução dos testes de Orientador
Leticia Luane Moraes, 352 – responsável pela execução dos testes de Alunos
Vitor Torres Gonzaga, 517 – responsável pela execução dos testes de Projetos

## 📂 Estrutura do Projeto
```plaintext
s206-lista1/
├── cypress/
│   ├── e2e/                   # Arquivos de testes
│   ├── fixtures/              # Dados de apoio
│   ├── support/               # Comandos e configurações
├── cypress.config.js          # Configuração do Cypress
├── package.json               # Dependências e scripts
└── README.md                  # Documentação
```

## 🚀 Como executar o projeto
### 1. Clone o repositório
```Git bash```
* git clone https://github.com/FelipeZeferino/s206-lista1.git
* cd s206-lista1
### 2. Instale as dependências
* npm install
### 3.Execute os testes
* npx cypress open
* selecione a opção E2E Testing do Cypress
* selecione a opção Electron e clique em “Start E2E Testing in Electron”
* após isso selecione o arquivo que queira testar

## 📄Gerando o relatório
### Gerando um relatório para apenas um arquivo de teste
* Execute o comando npm i cypress-mochawesome-reporter no seu Bash dentro da pasta raiz
* Use o comando npx cypress run --reporter mochawesome para gerar o relatório
* Após isso ira aparecer uma pasta “mochawesome-report” que dentro dela terá um arquivo mochawesome.html
  
### Mesclando todos os relatórios para listar em um só
* Rode o comando “ npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports/mochawesome,overwrite=false,html=false,json=true “ para executar os testes e gerar os JSONs
* Depois utilizaremos o comando “ npx mochawesome-merge cypress/reports/mochawesome/*.json > cypress/reports/mochawesome/merged-report.json “para mesclar os arquivos JSON gerados
* E por fim o comando “ npx marge cypress/reports/mochawesome/merged-report.json --reportDir cypress/reports/mochawesome --reportFilename mochawesome-report” para gerar o relatório HTML final
* Após isso o relatório estra disponível dentro da pasta Cypress -> reports ->  mochawesome -> mochawesome-report.html
