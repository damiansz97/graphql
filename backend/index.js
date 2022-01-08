const {ApolloServer} = require('apollo-server');
const typeDefs = require('./db/typeDefs')
const resolvers = require('./db/resolvers')
const functions = require('./functions/functions');
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen()
    .then(({url}) => {
      console.log(`Server ready at ${url}`);
      functions();
      ``
    })
    .catch(err => {console.log(err)})