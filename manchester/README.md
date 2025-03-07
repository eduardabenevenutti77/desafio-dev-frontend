## Descrição do Projeto (Atualizada)

O sistema permite buscar informações sobre o clima de diferentes cidades, exibindo dados como temperatura, descrição do clima (exemplo: nublado, entre nuvens, etc.), umidade e velocidade do vento. Ele também oferece as seguintes funcionalidades:

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

## Referência

Este desafio técnico é baseado no seguinte projeto:
[https://github.com/1STi/desafio-frontend/](https://github.com/1STi/desafio-frontend/)