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
- GET lista/padronizada
exibe todas as listas padronizadas
- GET lista/personalizada
exibe todas as listas personalizadas
- GET lista/padronizada/:iduser
exibe todas as listas padronizadas por utilizador
- GET lista/personalizada/:iduser
exibe todas as listas personalizada por utilizador
- POST lista/padronizada/criar
adiciona lista padronizada
- POST lista/personalizada/criar
adiciona lista personalizada
- POST lista/padronizada/:id/apagar
remove lista padronizada
- POST lista/personalizada/:id/apagar
remove lista personalizada
- POST lista/padronizada/:id/editar
edita lista padronizada
- POST lista/personalizada/:id/editar
edita lista personalizada
