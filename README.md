# App

GymPass Style App

## RFs

- [X] Deve ser possivel se cadastrar;
- [X] Deve ser possivel se autenticar;
- [X] Deve ser possivel obter o perfil de um usuario logado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [ ] Deve ser possivel o usuario obter seu histórico de check-ins;
- [ ] Deve ser possivel o usario buscar academias próximas;
- [ ] Deve ser possivel o usuario buscar academias pelo nome;
- [ ] Deve ser possivel o usuario realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [ ] Deve ser possivel cadastrar uma academia;

## RNs

- [X] O usuario nao deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [ ] O usuario nao pode fazer check-in se nao estiver perto (110ms) da academia;
- [ ] O check-in só pode ser validado até 20 min apos criado;
- [ ] O check-in só pode ser validade por administradores;
- [ ] A academia só poder ser cadastrada por administradores;

## RNFs

- [X] A senha do usuario precisa estar criptografada;
- [ ] O dados da aplicacao precisam estar persistidos em um bando PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token);
