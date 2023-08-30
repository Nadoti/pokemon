Para fazer esse projeto funcionar, faça uma clone dele no Visual Studio.

após isso use o comando 'yarn', para baixar todas as dependencias do projeto

vá até o arquivo .env e modifique a variavel de acordo com o seu banco de dados, de preferencia o Mysql.

quando modificar use o comando 'npx prisma migrate dev --name init', ele irá criar o banco de dados já com todo o modelo pronto.

com tudo já feito, inicia o projeto com yarn dev, e entre na porta que for solicitada, pronto o projeto estará funcionando.



O projeto funciona da seguinte maneira, há uma lista de pokemons até a quinta geração, você pode colocar os pokemos no seu carrinho para capturar, cada card do pokemon tem o botao para ver detalhes, lá encontrá atributos de cada pokemon. no header tem um link, onde enviará para a lista de pokemons capturado, tem o botão de deletar e o de modificar os status de acordo com o que você quiser, o projeto contem os metodos HTTP  GET,DELETE,PATCH e POST, aplicação está responsiva.