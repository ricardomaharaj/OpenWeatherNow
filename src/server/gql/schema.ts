import { createSchema } from 'graphql-yoga'
import { weatherResolver } from '~/server/gql/resolvers/weather'
import { typeDefs } from './typeDefs'

export const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: {
    Query: {
      weather: weatherResolver,
    },
  },
})
