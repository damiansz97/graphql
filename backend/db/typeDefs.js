const {gql} = require('apollo-server');

const typeDefs = gql`
  
  type Post {
    id: ID
    title: String
    content: String
    author: User
    premium: Boolean
  }
  input findPostInput {
    id: ID!
  }
  input addPostInput {
    title: String!
    content: String!
    userId: Int!
    premium: Boolean!
  }
  input updatePostInput {
    id: ID!
    title: String
    content: String
    premium: Boolean,
    author: Int
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    posts: [Post]
  }
  input findUserInput {
    id: ID!
  }
  input addUserInput {
    firstName: String!
    lastName: String!
  }
  input updateUserInput {
    id: ID!
    firstName: String
    lastName: String
  }  
  
  type Query {
    getUser(input: findUserInput): User
    getUsers: [User]
    getPost(input: findPostInput): Post
    getPosts: [Post]
  }
  type Mutation {
    addUser(input: addUserInput): User
    updateUser(input: updateUserInput): User
    removeUser(input: findUserInput): User

    addPost(input: addPostInput): Post
    updatePost(input: updatePostInput): Post
    removePost(input: findPostInput): Post
  }
`;

module.exports = typeDefs