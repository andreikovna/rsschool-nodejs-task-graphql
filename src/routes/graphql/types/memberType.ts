import { GraphQLObjectType } from 'graphql';
import { GraphQLInt, GraphQLString } from 'graphql/type';

export const memberTypeGraphType = new GraphQLObjectType({
  name: 'memberType',
  fields: () => ({
    id: { type: GraphQLString },
    discount: { type: GraphQLInt },
    monthPostsLimit: { type: GraphQLInt },
  }),
});
