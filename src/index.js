import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import seeds from './seeds';
import models from './models';

const typeDefs = gql`
  ${mergeTypes(fileLoader(path.join(__dirname, './schema')))}
`;

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers')),
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    models,
  }),
});

const app = express();

app.use('*', cors({ origin: 'http://localhost:3000' }));

server.applyMiddleware({ app });

models.sequelize.sync().then(async () => {
  await seeds.feelings();
  app.listen(4000, () => {
    console.log(`Server is running on http://localhost:4000`);
  });
});
