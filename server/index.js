import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { config } from "dotenv";

import { connectDB } from "./config/db.js";
import Client from "./models/Client.js";
import Project from "./models/Project.js";
import { typeDefs } from "./schema/schema.js";

//Config
config();

//Connect DB
connectDB();

const resolvers = {
  Query: {
    clients: async () => await Client.find(),
    client: async (_, args) => await Client.findById(args.id),
    projects: async () => await Project.find(),
    project: async (_, args) => await Project.findById(args.id),
  },
  Project: {
    client: async (parent) => await Client.findById(parent.clientId),
  },
  Mutation: {
    addClient: async (_, args) => {
      let newClient = new Client({
        id: Math.floor(Math.random() * 1000).toString(),
        name: args.client.name,
        email: args.client.email,
        phone: args.client.phone,
      });

      return await newClient.save();
    },
    deleteClient: async (_, args) => {
      Project.find({ clientId: args.id }).then((projects) => {
        projects.forEach((project) => {
          Project.findOneAndDelete({ _id: project._id });
        });
      });
      
      let deletedClient = Client.findOneAndDelete({ _id: args.id });
      return await deletedClient;
    },
    addProject: async (_, args) => {
      let newProject = new Project({
        id: Math.floor(Math.random() * 1000).toString(),
        name: args.project.name,
        description: args.project.description,
        status: args.project.status,
        clientId: args.project.clientId,
      });

      return await newProject.save();
    },
    updateProject: async (_, args) => {
      let updatedProject = Project.findByIdAndUpdate(args.id, args.edits);
      return await updatedProject;
    },
    deleteProject: async (_, args) => {
      let deletedProject = Project.findOneAndDelete({ _id: args.id });
      return await deletedProject;
    },
  },
};

const port = process.env.PORT || 4000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// new webpack.DefinePlugin({
//     'process.env': {
//       'NODE_ENV': JSON.stringify('production')
//     },
// })

const { url } = await startStandaloneServer(server, { port: port });
console.log(`🚀  Server ready at: ${url}`);
