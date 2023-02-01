## Assignment: Graphql

### Tasks:

1. Add logic to the restful endpoints (users, posts, profiles, member-types folders in ./src/routes).  
   1.1. npm run test - 100%
2. Add logic to the graphql endpoint (graphql folder in ./src/routes).  
   Constraints and logic for gql queries should be done based on restful implementation.  
   For each subtask provide an example of POST body in the PR.  
   All dynamic values should be sent via "variables" field.  
   If the properties of the entity are not specified, then return the id of it.  
   `userSubscribedTo` - these are users that the current user is following.  
   `subscribedToUser` - these are users who are following the current user.

   - Get gql requests:  
      2.1. Get users, profiles, posts, memberTypes - 4 operations in one query.
  
     `query  {
      getAllUsers {
         id
         firstName
         lastName
         email
      }
      getAllPosts {
         id
         title
         content
         userId
       }
      getAllProfiles {
         id
         avatar
         sex
         birthday
         country
         street
         city
         userId
         memberTypeId
        }
      getAllMemberTypes {
         id
         discount
         monthPostsLimit
      }
     }`
     
     2.2. Get user, profile, post, memberType by id - 4 operations in one query.  
     
     `query ($userId: String, $postId: String, $profileId: String, $memberId: String){
         getUser(userId: $userId) {
            id
            firstName
            lastName
         }
         getPost(postId: $postId) {
            id
            title
            content
         }
         getProfile(profileId: $profileId) {
            id
            avatar
            sex
            birthday
         }
         getMemberType(memberId: $memberId) {
            id
            discount
         }
      }`

 *VARIABLES*: существующие ID
 `{  
         "userId": "b2f907f5-c108-4525-81ec-00f54d335d82",
         "postId": "88247c12-f95b-44c5-a368-cd1bcd6085b9",
         "profileId": "f96a20a2-629e-4116-a87c-603f96f08556",
         "memberId": "basic"
      }`
      
2.3. Get users with their posts, profiles, memberTypes

     query {
         getAllUsers {
            id
            firstName
            lastName
            posts {
               id
               title
               content
            }
            profile {
               id
               avatar
            }
            memberType {
                id
            }
         }
      }

      

 2.4. Get user by id with his posts, profile, memberType.
 
      `query ($userId: String){
         getUser (userId: $userId){
            id
            firstName
            lastName
            posts {
               id
               title
               content
            }
            profile {
               id
               avatar
            }
            memberType {
                id
            }
         }
      }`
      
 *VARIABLES*: существующие ID

      `{"userId": "ExistingID"}`

 2.5. Get users with their `userSubscribedTo`, profile.
 
 `query {
        getAllUsers{
         id
         firstName
         lastName
         userSubscribedTo {
            id
            firstName
            lastName
        }
        profile {
            id
        }
        memberType {
                id
            }
       }
      }`
      
  2.6. Get user by id with his `subscribedToUser`, posts.
      
      query ($userId: String){
         getUser (userId: $userId){
            id
            firstName
            lastName
            subscribedToUser{
               id
               firstName
               lastName
            }
            posts{
                id
                title
                content
            }
          }
         }

*VARIABLES*: // существующие ID

      `{"userId": "ExistingID"}`

 2.7. Get users with their `userSubscribedTo`, `subscribedToUser` (additionally for each user in `userSubscribedTo`, `subscribedToUser` add their `userSubscribedTo`, `subscribedToUser`).

      
 `query {
    getAllUsers{
        id
        firstName
        lastName
        userSubscribedTo{
            id
            firstName
            lastName
            userSubscribedTo{
                id
                firstName
                lastName
            }
            subscribedToUser{
                id
                firstName
                lastName
            }
        }
        subscribedToUser{
            id
            firstName
            lastName
            userSubscribedTo{
                id
                firstName
                lastName
            }
            subscribedToUser{
                id
                firstName
                lastName
            }
        }
    }
  }`

   - Create gql requests:  
  2.8. Create user.  
      `mutation createUser($data: userCreationType) {
         createUser(data: $data) {
            id
            firstName
            lastName
            email
         }
      }`
      
   *VARIABLES*:
   
   `{
      "data": {
         "firstName": "Masha",
         "lastName": "Ivanova", 
         "email": "ivanova@gmail.com"
      }
   }`
   
2.9. Create profile. 
      
      `mutation createProfile($data: profileCreationType) {
         createProfile(data: $data) {
            avatar
            sex
            birthday
            country
            street
            city
            userId
            memberTypeId
         }
      }`
      
*VARIABLES*:
   
   `{
      "data": {
         "avatar": "Masha",
         "sex": "Ivanova", 
         "birthday": 121212,
         "country": "data",
         "street": "data",
         "city": "data",
         "userId": "EXISTING_ID",   //существующий id юзера
         "memberTypeId": "basic"
      }
   } `
   
 2.10. Create post.  
     
     `mutation createPost($data: postCreationType) {
         createPost(data: $data) {
            title
            content
            userId
         }
      }`

 *VARIABLES*: // существующие ID
     
     `{
      "data": {
         "title": "title",
         "content": "Ivanova", 
         "userId": "EXISTING_ID",   //существующий id юзера
       }
     }` 

2.11. [InputObjectType](https://graphql.org/graphql-js/type/#graphqlinputobjecttype) for DTOs.
     
   - Update gql requests:  
 2.12. Update user.  
     
     `mutation ($id: String, $data: userUpdateType) {
         updateUser(id: $id, data: $data) {
            firstName
            lastName
            email
         }
      }`

*VARIABLES*: // существующие ID
  
  `{
    "id": "EXI5TIBG",
    "data": {
    "firstName": "SASHA"
    }
   }`

2.13. Update profile. 

     `mutation ($id: String, $data: profileUpdateType) {
         updateProfile(id: $id, data: $data) {
            avatar
            sex
            city
            country
         }
      }`

*VARIABLES*: // существующие ID
   
   `{
    "id": "EXI5TIBG",
    "data": {
    "country": "Belarus"
    }
   }`
   
2.14. Update post.  

        `mutation ($id: String, $data: postUpdateType) {
         updatePost(id: $id, data: $data) {
            title
            id
            content
         }
      }`

*VARIABLES*: // существующие ID
   
   `{
    "id": "EXI5TIBG",
    "data": {
    "content": "new content"
    }
   }`

2.15. Update memberType.  
     
     `mutation ($id: String, $data: memberTypeUpdateType) {
         updateMemberType(id: $id, data: $data) {
            id
            discount
         }
      }`

*VARIABLES*: // существующие ID
   
   `{
    "id": "business",
    "data": {
    "discount": 7
    }
   } `
   
2.16. Subscribe to; unsubscribe from. 

     `mutation ($userToSubscribeId: String, $userId: String){
         subscribeTo(userToSubscribeId: $userToSubscribeId, userId: $userId){
               id
               userSubscribedTo {
                      id
               }
            }
      }`

*VARIABLES*: существующие ID

`{
  "userToSubscribeId": "hhhh",
  "userId": "ffff"
} `

`mutation unsubscribeFrom($userUnsubscribeFromId: String, $userId: String){
  unsubscribeFrom(userUnsubscribeFromId: $userUnsubscribeFromId, userId: $userId){
    id
    userSubscribedTo {
        id
    }
  }
}`

 *VARIABLES*: // существующие ID
 
`{
  "userToUnsubscribeFromId": "dddddd",
  "userId": "fffff"
}`

2.17. [InputObjectType](https://graphql.org/graphql-js/type/#graphqlinputobjecttype) for DTOs.


4. Limit the complexity of the graphql queries by their depth with [graphql-depth-limit](https://www.npmjs.com/package/graphql-depth-limit) package.  
   4.1. Provide a link to the line of code where it was used.  
   4.2. Specify a POST body of gql query that ends with an error due to the operation of the rule. Request result should be with `errors` field (and with or without `data:null`) describing the error.

   `query {
    getAllUsers{
        id
        userSubscribedTo{
            id
            userSubscribedTo{
                id
                userSubscribedTo{
                    id
                    userSubscribedTo{
                        id
                        userSubscribedTo{
                            id
                        }
                    }
                }
            }
        }
    }
  }`
