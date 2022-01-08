import gql from 'graphql-tag';

export default gql` {
    getPosts {
      id
      title
      content
      premium
      author {
          id
          firstName
          lastName
      }
    }
  }
`;