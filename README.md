## Descrição do Projeto ⛅🌪️

Clique aqui para acessar o site do projeto -> [Manchester's Cloud](https://desafio-dev-frontend-pi.vercel.app/)

O **Manchester's Cloud** é um sistema que permite buscar informações sobre o clima de diferentes cidades, exibindo dados como temperatura, descrição do clima (exemplo: nublado, entre nuvens, etc.), umidade e velocidade do vento. Ele também oferece as seguintes funcionalidades:

- **Histórico de Cidades**: Armazena as cidades pesquisadas, com a possibilidade de realizar buscas novamente.
- **Favoritar Cidades**: Permite que o usuário marque cidades como favoritas para facilitar futuras buscas.
- **Listagem de Cidades Favoritas**: Exibe as cidades favoritas com a mesma funcionalidade de pesquisa do histórico.
- **Alteração de Tema**: O usuário pode alternar entre o modo claro e escuro, mudando o fundo da aplicação.
- **Previsão para os Próximos Dias**: Exibe a previsão do tempo para os próximos dias com dados de temperatura e descrição do clima.

## Tecnologias e Funcionalidades

O projeto utiliza as seguintes tecnologias e funcionalidades:

- **React**: Utilizado para o desenvolvimento do front-end, permitindo criar interfaces dinâmicas e reativas.
- **TypeScript**: Garante a tipagem estática para maior segurança e qualidade no código.
- **API OpenWeatherMap**: Fornece os dados climáticos para cada cidade pesquisada.
- **Local Storage**: Armazena o histórico de buscas e as cidades favoritas, permitindo persistir as informações mesmo após o fechamento do navegador.
- **MUI (Material UI)**: Usado para os ícones e componentes visuais, como o botão de alternância de tema e os ícones de favoritar.
- **Supertest**: Utilizado para realizar testes de integração em APIs, enviando requisições HTTP e verificando as respostas.
- **Mocha**: Framework de testes que organiza e estrutura os testes.
- **Chai**: Permite escrever testes mais legíveis e expressivos, utilizando suas diversas funções de asserção, como expect, should, e assert.

### Principais Funcionalidades

- **Busca por Cidade**: O usuário pode digitar o nome de uma cidade e buscar as condições climáticas atuais.
- **Alteração de Tema**: Um botão permite alternar entre os temas claro e escuro, mudando a cor de fundo da página.
- **Favoritar Cidades**: Cidades podem ser marcadas como favoritas, facilitando o acesso rápido em futuras buscas.
- **Histórico de Cidades Pesquisadas**: As cidades recentemente pesquisadas são armazenadas e exibidas como histórico, permitindo fácil acesso.
- **Previsão Diária**: Exibe a previsão para os próximos dias com as temperaturas e condições climáticas.

### Fluxo do Componente Search

1. **Busca de Clima**: Ao digitar o nome da cidade, o sistema faz uma requisição à API da OpenWeatherMap para buscar os dados do clima.
2. **Favoritar Cidades**: O botão de favorito permite adicionar ou remover cidades das cidades favoritas.
3. **Exibição de Dados**: O sistema exibe a cidade pesquisada, as condições climáticas atuais e a previsão para os próximos dias.
4. **Histórico e Favoritos**: Cidades pesquisadas e favoritas são listadas e podem ser clicadas para visualizar as condições climáticas novamente.

### Como Funciona

- **`useState`**: Gerencia o estado dos dados da cidade pesquisada, das cidades favoritas e do histórico de buscas.
- **`useEffect`**: Atualiza o fundo da página sempre que o modo de tema é alterado.
- **API**: A consulta à API da OpenWeatherMap retorna as informações climáticas, que são armazenadas no estado do componente.

### Funcionalidades Adicionais

- **Armazenamento Local (Local Storage)**: O histórico de buscas e as cidades favoritas são armazenados no local storage do navegador, garantindo que as informações sejam mantidas entre as sessões.
- **Alternância de Tema**: O sistema tem um modo claro e um modo escuro, com troca de cores de fundo ao clicar no ícone de alternância de tema.

---

### Explicação das Funções Criadas

#### `fetchWeather(city: string)`

A função realiza uma requisição à API da OpenWeatherMap para buscar a previsão do tempo para a cidade fornecida. Ela também adiciona a cidade ao histórico de buscas.

#### `toggleBackground()`

Altera o fundo da aplicação entre dois modos: claro e escuro, alterando a cor de fundo.

#### `toggleFavorite(city: string)`

Adiciona ou remove uma cidade da lista de favoritas, persistindo as mudanças no LocalStorage.

#### `getDailyForecasts()`

Extrai e organiza as previsões diárias de temperatura e clima, agrupando-as por data.

#### `handleHistoryClick(city: string)`

Permite que o usuário clique em uma cidade do histórico para visualizar novamente as condições climáticas dessa cidade.

---

### Dependências e Scripts

**Dependências instaladas**:

```json
{
  "name": "manchester",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "mocha src/test/api.test.js"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@fontsource/montserrat": "^5.2.5",
    "@mui/icons-material": "^6.4.7",
    "@mui/material": "^6.4.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.26.9",
    "@eslint/js": "^9.21.0",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "babel-jest": "^29.7.0",
    "chai": "^5.2.0",
    "eslint": "^9.21.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^15.15.0",
    "jest": "^29.7.0",
    "mocha": "^11.1.0",
    "supertest": "^7.0.0",
    "typescript": "~5.7.2",
    "typescript-eslint": "^8.24.1",
    "vite": "^6.2.0"
  }
}
```

---

### Testes

A API foi testada utilizando **Supertest** e **Chai** para garantir que os dados retornados pela API sejam corretos.

```js
import supertest from 'supertest';
import { expect } from 'chai';

const API_KEY = "377a3172f4ae6ce8b24413e251ef34a5";
const city = 'Joinville,sc,br';

describe('GET API WEATHER', () => {
  it('Requisição na API WEATHER', async () => {
    const res = await supertest('https://api.openweathermap.org')
      .get(`/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
  });
});
```
--- 
