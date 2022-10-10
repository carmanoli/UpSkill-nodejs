# UpSkill-nodejs

# Filmes
## End-Points
- GET filme/listar
- GET filme/detalhe:idfilme?
  <filme> pode ser um "id" ou parte do "titulo" do ficheiro
- GET filme/detalhe?titulo&ator&genero
  Lista filmes que obedecem aos critérios 
- POST filme/criar
  Recebe um json com os detalhes do filme e cria
- POST filme/:id/eliminar
- GET filme/filmeporgenero
