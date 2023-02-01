import {GraphQLString, GraphQLInputObjectType, GraphQLNonNull} from 'graphql';

export const userUpdateType = new GraphQLInputObjectType({
  name: 'userUpdateType',
  fields: () => ({
    firstName: { type:  new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  })
});

