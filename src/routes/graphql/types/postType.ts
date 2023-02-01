import { GraphQLObjectType } from 'graphql';
import { GraphQLID, GraphQLString } from 'graphql/type';

export const postGraphType = new GraphQLObjectType({
  name: 'post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    userId: { type: GraphQLID },
  }),
});
