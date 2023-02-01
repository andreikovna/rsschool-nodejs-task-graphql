import { GraphQLString, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

export const postUpdateType = new GraphQLInputObjectType({
  name: 'postUpdateType',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type:  new GraphQLNonNull(GraphQLString) },
  }),
});
