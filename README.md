# RN Movies App

Este é um projeto **React Native CLI** desenvolvido para exibir informações sobre filmes, utilizando a **API do The Movie Database (TMDB)**.

## Pré-requisitos

- Node.js instalado.
- Ambiente configurado para React Native (Android Studio ou Xcode, dependendo da plataforma).
- Chave de API da TMDB (consulte [TMDB API](https://www.themoviedb.org/documentation/api) para obter uma chave).

## Passos para rodar o projeto

1. **Clone o repositório**

   ```bash
   git clone https://github.com/carlosxfelipe/rn-movies-app.git
   cd rn-movies-app
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   - Faça uma cópia do arquivo `.env.template` e renomeie para `.env`.
   - Insira sua chave da API do TMDB na variável `THE_MOVIE_DB_KEY`.

4. **Execute o projeto**

   - Para Android:

     ```bash
     npm run android
     ```

   - Para iOS:

   1. Instale as dependências do CocoaPods:

      ```bash
      npx pod-install ios
      ```

   2. Rode o aplicativo:

      ```bash
      npm run ios
      ```

## Sobre

Este projeto foi criado como um exemplo de integração entre um aplicativo mobile em React Native e a API do TMDB.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE). Sinta-se à vontade para usar e modificar o conteúdo conforme necessário.
