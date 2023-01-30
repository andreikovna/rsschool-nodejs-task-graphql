import { GraphQLID } from 'graphql/type';
import { UserEntity } from './../../utils/DB/entities/DBUsers';
import { GraphQLString } from 'graphql/type';
import { GraphQLList, GraphQLSchema } from 'graphql/type';
import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphqlBodySchema } from './schema';
import { graphql } from 'graphql/graphql';
import { memberTypeGraphType } from './types/memberType';
import { profileGraphType } from './types/profileType';
import { postGraphType } from './types/postType';
import { userGraphType } from './types/userType';
import { userCreationType } from './creation/createUser';
import { profileCreationType } from './creation/createProfile';
import { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import { postCreationType } from './creation/createPost';
import { PostEntity } from '../../utils/DB/entities/DBPosts';
import { userUpdateType } from './update/updateUser';
import { postUpdateType } from './update/updatePost';
import { profileUpdateType } from './update/updateProfile';
import { memberTypeUpdateType } from './update/updateMemberType';
import { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async function (request, reply) {
      const query = new GraphQLObjectType({
        name: 'query',
        fields: {
          getAllMemberTypes: {
            type: new GraphQLList(memberTypeGraphType),
            resolve: async () => {
              return await fastify.db.memberTypes.findMany();
            },
          },
          getAllProfiles: {
            type: new GraphQLList(profileGraphType),
            resolve: async () => {
              return await fastify.db.profiles.findMany();
            },
          },
          getAllPosts: {
            type: new GraphQLList(postGraphType),
            resolve: async () => {
              return await fastify.db.posts.findMany();
            },
          },
          getAllUsers: {
            type: new GraphQLList(userGraphType),
            resolve: async () => {
              return await fastify.db.users.findMany();
            },
          },
          getUser: {
            type: userGraphType,
            args: { userId: { type: GraphQLString } },
            resolve: async (parent, args) => {
              const userId = request.body.variables?.userId as string;
              const user = await fastify.db.users.findOne({
                key: 'id',
                equals: userId,
              });
              return user;
            },
          },
          getPost: {
            type: postGraphType,
            args: { postId: { type: GraphQLString } },
            resolve: async (parent, args) => {
              const postId = request.body.variables?.postId as string;
              const post = await fastify.db.posts.findOne({
                key: 'id',
                equals: postId,
              });
              return post;
            },
          },
          getProfile: {
            type: profileGraphType,
            args: { profileId: { type: GraphQLString } },
            resolve: async (parent, args) => {
              const profileId = request.body.variables?.profileId as string;
              const profile = await fastify.db.profiles.findOne({
                key: 'id',
                equals: profileId,
              });
              return profile;
            },
          },
          getMemberType: {
            type: memberTypeGraphType,
            args: { memberId: { type: GraphQLString } },
            resolve: async (parent, args) => {
              const memberId = request.body.variables?.memberId as string;
              const memberType = await fastify.db.memberTypes.findOne({
                key: 'id',
                equals: memberId,
              });
              return memberType;
            },
          },
        },
      });
      const mutation = new GraphQLObjectType({
        name: 'mutation',
        fields: {
          createUser: {
            type: userGraphType,
            args: {
              data: { type: userCreationType },
            },
            resolve: async (parents, args) => {
              const data = request.body.variables?.data as UserEntity;
              return await fastify.db.users.create(data);
            },
          },
          createProfile: {
            type: profileGraphType,
            args: {
              data: { type: profileCreationType },
            },
            resolve: async (parents, args) => {
              const data = request.body.variables?.data as ProfileEntity;
              const user = await fastify.db.users.findOne({
                key: 'id',
                equals: data.userId,
              });
              if (user) {
                return await fastify.db.profiles.create(data);
              }
            },
          },
          createPost: {
            type: postGraphType,
            args: {
              data: { type: postCreationType },
            },
            resolve: async (parents, args) => {
              const data = request.body.variables?.data as PostEntity;
              const user = await fastify.db.users.findOne({
                key: 'id',
                equals: data.userId,
              });
              if (user) {
                return await fastify.db.posts.create(data);
              }
            },
          },
          updateUser: {
            type: userGraphType,
            args: {
              id: {type: GraphQLString},
              data: { type: userUpdateType },
            },
            resolve: async (parents, args) => {
              const data = request.body.variables?.data as UserEntity;
              const id = request.body.variables?.id as string;
              const user = await fastify.db.users.findOne({
                key: 'id',
                equals: id,
              });
              if (user) {
                return await fastify.db.users.change(id, data);
              }
            },
          },
          updatePost: {
            type: postGraphType,
            args: {
              id: {type: GraphQLString},
              data: { type: postUpdateType },
            },
            resolve: async (parents, args) => {
              const data = request.body.variables?.data as PostEntity;
              const id = request.body.variables?.id as string;
              const post = await fastify.db.posts.findOne({
                key: 'id',
                equals: id,
              });
              if (post) {
                return await fastify.db.posts.change(id, data);
              }
            },
          },
          updateProfile: {
            type: profileGraphType,
            args: {
              id: {type: GraphQLString},
              data: { type: profileUpdateType },
            },
            resolve: async (parents, args) => {
              const data = request.body.variables?.data as ProfileEntity;
              const id = request.body.variables?.id as string;
              const profile = await fastify.db.profiles.findOne({
                key: 'id',
                equals: id,
              });
              if (profile) {
                return await fastify.db.profiles.change(id, data);
              }
            },
          },
          updateMemberType: {
            type: memberTypeGraphType,
            args: {
              id: {type: GraphQLString},
              data: { type: memberTypeUpdateType },
            },
            resolve: async (parents, args) => {
              const data = request.body.variables?.data as MemberTypeEntity;
              const id = request.body.variables?.id as string;
              const memberType = await fastify.db.memberTypes.findOne({
                key: 'id',
                equals: id,
              });
              if (memberType) {
                return await fastify.db.memberTypes.change(id, data);
              }
            },
          },
          subscribeTo: {
            type: userGraphType,
            args: {
              userToSubscribeId: { type: new GraphQLNonNull(GraphQLID) },
              userId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: async (parents, args) => {
              const userId = request.body.variables?.userId as string;
              const userToSubscribeId = request.body.variables?.userId as string;
              const user = await fastify.db.users.findOne({
                key: 'id',
                equals: userId,
              });
              if (user && !user.subscribedToUserIds.includes(userToSubscribeId)) {
                return await fastify.db.users.change(userId, {
                  subscribedToUserIds: [
                    ...user.subscribedToUserIds,
                    userToSubscribeId,
                  ],
                });
              }
            },
          },
          unsubscribeFrom: {
            type: userGraphType,
            args: {
              userUnsubscribeFromId: { type: new GraphQLNonNull(GraphQLID) },
              userId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: async (parent, args, fastify) => {
              const userId = request.body.variables?.userId as string;
              const userUnsubscribeFromId = request.body.variables?.userId as string;
              const user = await fastify.db.users.findOne({
                key: 'id',
                equals: userId,
              });
              if (user) {
                const newSubscribers = user.subscribedToUserIds.filter(
                  (item: string) => item !== userUnsubscribeFromId
                );
                return await fastify.db.users.change(userId, {
                  subscribedToUserIds: newSubscribers,
                });
              }
            },
          }
        },
      });

      const schema = new GraphQLSchema({
        query,
        mutation,
      });

      return await graphql({
        schema,
        source: String(request.body.query),
        contextValue: fastify,
      });
    }
  );
};

export default plugin;
