import { gql } from "@apollo/client";

const GET_AUTHENTICATED_USER = gql`
  query GetAutheticatedUser {
    authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;

export default GET_AUTHENTICATED_USER;
