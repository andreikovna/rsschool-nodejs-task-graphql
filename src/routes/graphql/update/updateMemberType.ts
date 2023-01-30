import { GraphQLInt, GraphQLInputObjectType } from 'graphql';

export const memberTypeUpdateType = new GraphQLInputObjectType({
  name: 'memberTypeUpdateType',
  fields: () => ({
    discount: { type: GraphQLInt },
    monthPostsLimit: { type: GraphQLInt },
  }),
});
