const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Film {
    id: ID!
    title: String!
    year: Int!
  }

  type Talent {
    id: ID!
    name: String!
    films: [Film]
  }

  type Query {
    talent(id: ID!): Talent
  }
`;

const talent = {
  id: 1,
  name: 'Matt Damon',
  films: [
    { id: 2, title: 'Bourne Supremacy', year: 2004 },
  ],
};

const resolvers = {
  Query: {
    talent() {
      // Adding a simulate server delay
      return new Promise((resolve) => setTimeout(() => {
        resolve(talent);
      }, 2000));
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

