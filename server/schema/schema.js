export const typeDefs = `#graphql
    type Client {
        id: ID!,
        name: String!,
        email: String!,
        phone: String!,
    }
    type Project {
        id: ID!,
        name: String!,
        description: String!,
        status: String!,
        client: Client,
    }

    type Query {
        clients: [Client]
        client(id: ID!): Client
        projects: [Project]
        project(id: ID!): Project
    }

    type Mutation {
        addClient(client: AddClientInput!): Client
        deleteClient(id: ID!): Client
        addProject(project: AddProjectInput!): Project
        updateProject(id: ID!, edits: EditProjectInput!): Project
        deleteProject(id: ID!): Project
    }

    input AddClientInput {
        name: String!,
        email: String!,
        phone: String!,
    }
    input AddProjectInput {
        name: String!,
        description: String!,
        status: String!,
        clientId: ID!,
    }
    input EditProjectInput {
        name: String!,
        description: String!,
        status: String!,
    }
`;
