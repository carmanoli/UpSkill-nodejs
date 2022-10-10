# UpSkill-nodejs

# Filmes
## End-Points
- GET filme/listar
- GET filme/detalhe:idfilme?<br>
  <filme> pode ser um "id" ou parte do "titulo" do ficheiro
- GET filme/detalhe?titulo&ator&genero<br>
  Lista filmes que obedecem aos critérios 
- POST filme/criar<br>
  Recebe um json com os detalhes do filme e cria
- POST filme/:id/eliminar
- GET filme/filmeporgenero<br>
  Devolve uma estatítica de quantidade de filmes por género
