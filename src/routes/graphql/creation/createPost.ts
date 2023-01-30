import { GraphQLString, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

export const postCreationType = new GraphQLInputObjectType({
  name: 'postCreationType',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type:  new GraphQLNonNull(GraphQLString) },
    userId: { type:  new GraphQLNonNull(GraphQLString) },
  }),
});
