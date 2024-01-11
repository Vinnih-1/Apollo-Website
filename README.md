![apollo-isologo](https://github.com/Vinnih-1/Apollo/assets/59892753/dc6dad52-3a8f-43b0-90f8-26296012e6e2)

O projeto tem a intenção de automatizar o sistema de pagamentos pelo Discord, utilizando da API do Mercado Pago. O projeto foi criado para ser inicialmente pago, porém com o decorrer do tempo, decidi deixá-lo gratuito e open-source.

Projeto back-end separado em 5 microsserviços, contendo eles:

- [Eureka](https://github.com/Vinnih-1/Apollo/tree/develop/ApolloEureka)
- [Gateway](https://github.com/Vinnih-1/Apollo/tree/develop/Gateway)
- [Authentication](https://github.com/Vinnih-1/Apollo/tree/develop/Authentication)
- [Discord](https://github.com/Vinnih-1/Apollo/tree/develop/Discord)
- [Service](https://github.com/Vinnih-1/Apollo/tree/develop/Service)

Todos os microsserviços estão disponíveis no repositório back-end, basta [clicar aqui](https://github.com/Vinnih-1/Apollo)

| Página              | Permissão    | Autenticação Requerida |
|---------------------|--------------|---------------|
| /                   | USER         | NÃO           |
| /login              | USER         | NÃO           |
| /register           | USER         | NÃO           |
| /dashboard          | USER         | SIM           |
| /dashboard/products | USER         | SIM           |
| /dashboard/coupons  | USER         | SIM           |
| /dashboard/sales    | USER         | SIM           |
| /dashboard/service  | USER         | SIM           |
| /dashboard/users    | ADMIN        | SIM           |
| /dashboard/plans    | ADMIN        | SIM           |
| /dashboard/orders   | ADMIN        | SIM           |

Após o usuário se cadastrar e se autenticar, ele terá acesso a Dashboard, onde poderá gerenciar seus produtos e cupons.

O projeto tem o domínio registrado apollodiscord.com, porém não há recursos para mantê-lo de pé. Então decidi continuar o desenvolvimento apenas para aprendizado.
Ainda em fase de desenvolvimento, qualquer pull request será bem-vindo.
