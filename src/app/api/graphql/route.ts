import { ApolloServer } from '@apollo/server'
import typeDefs from './schemas/index'
import resolvers from './resolvers/index'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextRequest } from 'next/server'
import { connectToDatabase } from '@/utils/db'

connectToDatabase()


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server)

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}
