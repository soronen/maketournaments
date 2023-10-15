import { mergeTypeDefs } from '@graphql-tools/merge'
import { readFileSync } from 'fs'
import { join } from 'path'

const typeDefs = mergeTypeDefs([
  readFileSync(join(__dirname, './Match.graphql'), 'utf8'),
  readFileSync(join(__dirname, './Notification.graphql'), 'utf8'),
  readFileSync(join(__dirname, './Ruleset.graphql'), 'utf8'),
  readFileSync(join(__dirname, './Series.graphql'), 'utf8'),
  readFileSync(join(__dirname, './Tournament.graphql'), 'utf8'),
  readFileSync(join(__dirname, './User.graphql'), 'utf8'),
])

export default typeDefs
