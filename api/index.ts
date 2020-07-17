import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import helmet from 'helmet';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

app.use(helmet());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 api ready at http://localhost:4000${server.graphqlPath}`);
});
