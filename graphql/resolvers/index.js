const postResolver = require('./post');
const userResolver = require('./user');
const commentResolver = require('./comment');

module.exports = {
    Query: {
        ...postResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...postResolver.Mutation,
        ...commentResolver.Mutation,
    }
}