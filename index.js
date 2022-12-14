const { ApolloServer } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const mongoose = require('mongoose');

const { MONGODB, CORS } = require('./config.js');

const pubsub = new PubSub();

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
        origin: CORS,
        credentials: true
    },
    context: ({ req }) => ({ req, pubsub }) // forward req body to allow resolver to access req body
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: PORT })
    }).then(res => {
        console.log(`Server running at ${res.url}`);
    }).catch(err => {
        console.error(err)
    });