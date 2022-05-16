export const GET_BASIC_USER = `
query ($username: String!) {
  user(login: $username) {
    avatarUrl
    login
    email
    name
    url
  }
}
`;

export const GET_USER_SOCIAL = `
query ($username: String!) {
  user(login: $username) {
    avatarUrl
    name
    login
    bio
    company
    location
    email
    websiteUrl
    followers(first: 10) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          url
          name
          login
        }
      }
      totalCount
    }
    following(first: 10){
      pageInfo {
        startCursor
        hasNextPage
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges{
        node{
          url
          name
          login
        }
      }
      totalCount
    }
  }
}
`;

export const GET_LANGUAGES = `
query ($username: String!) {
    user(login: $username) {
      repositories(first: 100) {
        edges {
          node {
            ... on Repository {
              name
              languages(first: 10) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
}
`;

export const GET_PINNED_REPOS = `
query ($username: String!) {
  user(login: $username) {
    pinnedItems(first: 10) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            pushedAt
            url
            homepageUrl
          }
        }
      }
    }
  }
}
`;

export const IS_FOLLOWING_USER = `
query ($username: String!) {
  user(login: $username) {
    viewerIsFollowing
    id
  }
}
`;

export const GET_USER_ID = `
query ($username: String!) {
  user(login: $username) {
    id
  }
}
`;
