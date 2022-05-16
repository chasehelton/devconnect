export const FOLLOW_USER = `
    mutation ($clientMutationId: String!, $userId: ID!) {
        followUser(input: {clientMutationId: $clientMutationId, userId: $userId}) {
            clientMutationId
        }
    }
`;

export const UNFOLLOW_USER = `
    mutation ($clientMutationId: String!, $userId: ID!) {
        unfollowUser(input: {clientMutationId: $clientMutationId, userId: $userId}) {
            clientMutationId
        }
    }
`;
