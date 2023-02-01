import {GraphQLString, GraphQLInputObjectType, GraphQLNonNull} from 'graphql';

export const userCreationType = new GraphQLInputObjectType({
  name: 'userCreationType',
  fields: () => ({
    firstName: { type:  new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  })
});

