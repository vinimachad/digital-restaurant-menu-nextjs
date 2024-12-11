# template-nextjs

## Configurando Ambiente

- Instalar `node` e `nvm`
- Rodar o comando `nvm ls` para listar todas as versões disponíveis do node
- Rodar o comando `nvm install lts/[node-version]` para instalar e setar a versão desejada do node

## Configurando Projeto

- Rodar o comando `npm init -y` para criar o `package.json`
- Para instalar o NextJS na versão `13.1.6` rode o comando `npm i next@13.1.6`
- Para instalar o `react-dom` use o comando `npm i react-dom@18.2.0`

## Estilização de código

- Instale a extensão do EditorConfig no vscode para as configurações do `.editorconfig` de fato funcionarem.
- Adicione o prettier no projeto como dependencia de desenvolvimento, para isso rode esse comando `npm i prettier -D`
- Também instale a extensão do prettier e configure o VSCode com o `format on save` sendo o Prettier.

## Configurando Test Runner

- Instale o test runner usando o comando `npm i jest -D`
- Adicione dois novos scripts no `package.json`

```json
{
  // ...
  "test": "jest",
  "test:watch": "jest --watch"
}
```
