import { GraphQLObjectType } from 'graphql';
import { GraphQLID, GraphQLList, GraphQLString } from 'graphql/type';

import { postGraphType } from './postType';
import { profileGraphType } from './profileType';
import { memberTypeGraphType } from './memberType';

// @ts-ignore
export const userGraphType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    subscribedToUserIds: { type: new GraphQLList(GraphQLID) },
    posts: {
      type: new GraphQLList(postGraphType),
      resolve: async (source: any, args: any, fastify) => {
        return await fastify.db.posts.findMany({
          key: 'userId',
          equals: source.id,
        });
      },
    },
    profile: {
      type: profileGraphType,
      resolve: async (source: any, args: any, fastify) => {
        return await fastify.db.profiles.findOne({
          key: 'userId',
          equals: source.id,
        });
      },
    },
    memberType: {
      type: memberTypeGraphType,
      resolve: async (source: any, args: any, fastify) => {
        const profile = await fastify.db.profiles.findOne({
          key: 'userId',
          equals: source.id,
        });
        if (profile) {
          return await fastify.db.memberTypes.findOne({
            key: 'userId',
            equals: profile.memberTypeId,
          });
        } else {
          return Promise.resolve(null);
        }
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(userGraphType),
      resolve: async (source: any, args: any, fastify) => {
        return await fastify.db.users.findMany({
          key: 'subscribedToUserIds',
          inArray: source.id,
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(userGraphType),
      resolve: async (source: any, args: any, fastify) => {
        return await fastify.db.users.findMany({
          key: 'id',
          equalsAnyOf: source.subscribedToUserIds,
        });
      },
    },
  }),
});
