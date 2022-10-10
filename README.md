# UpSkill-nodejs

# Filmes
## End-Points
- GET filme/listar
- GET filme/detalhe:filme<br>
  "filme" pode ser um "id" ou parte do "titulo" do ficheiro
- GET filme/detalhe?titulo&ator&genero<br>
  Lista filmes que obedecem aos critérios 
- POST filme/criar<br>
  Recebe um json com os detalhes do filme e cria
- POST filme/:id/eliminar
- POST file/:id/editar
- GET filme/filmeporgenero<br>
  Devolve uma estatítica de quantidade de filmes por género

- GET pessoa/atores 
Verificar todos os atores
- GET pessoa/realizadores  
Verificar todos os realizadores
- GET pessoa/atores/:id 
Pesquisar um ator pelo ID
- GET pessoa/realizadores/:id 
Pesquisar um realizador pelo o nome ou ID
- POST pessoa/ator/criar 
Adicionar um ator
- POST pessoa/realizador/criar 
Adicionar um realizador
- POST pessoa/ator/eliminar 
Remover um ator
- POST pessoa/realizador/eliminar 
Remover um realizador
- POST pessoa/ator/atualizar/:id 
Atualizar ator
- POST pessoa/realizador/atualizar/:id 
Atualizar realizador
