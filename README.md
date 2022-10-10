# UpSkill-nodejs

# Filmes- Routes
## filme
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

## pessoa
- GET pessoa/atores<br>
  Verificar todos os atores
- GET pessoa/realizadores
Verificar todos os realizadores
- GET pessoa/atores/:id<br>
Pesquisar um ator pelo ID
- GET pessoa/realizadores/:id<br>
Pesquisar um realizador pelo o nome ou ID
- POST pessoa/ator/criar<br>
Adicionar um ator
- POST pessoa/realizador/criar<br>
Adicionar um realizador
- POST pessoa/ator/eliminar<br>
Remover um ator
- POST pessoa/realizador/eliminar<br>
Remover um realizador
- POST pessoa/ator/atualizar/:id<br>
Atualizar ator
- POST pessoa/realizador/atualizar/:id<br>
Atualizar realizador

## lista
- GET lista/padronizada<br>
exibe todas as listas padronizadas
- GET lista/personalizada<br>
exibe todas as listas personalizadas
- GET lista/padronizada/:iduser<br>
exibe todas as listas padronizadas por utilizador
- GET lista/personalizada/:iduser<br>
exibe todas as listas personalizada por utilizador
- POST lista/padronizada/criar<br>
adiciona lista padronizada
- POST lista/personalizada/criar<br>
adiciona lista personalizada
- POST lista/padronizada/:id/apagar<br>
remove lista padronizada
- POST lista/personalizada/:id/apagar<br>
remove lista personalizada
- POST lista/padronizada/:id/editar<br>
edita lista padronizada
- POST lista/personalizada/:id/editar<br>
edita lista personalizada
