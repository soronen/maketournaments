import { mergeTypeDefs } from '@graphql-tools/merge'
import { readFileSync } from 'fs'
import { join } from 'path'

const typeDefs = mergeTypeDefs([
  readFileSync(require.resolve('./Match.graphql'), 'utf8'),
  readFileSync(require.resolve('./Notification.graphql'), 'utf8'),
  readFileSync(require.resolve('./Ruleset.graphql'), 'utf8'),
  readFileSync(require.resolve('./Series.graphql'), 'utf8'),
  readFileSync(require.resolve('./Tournament.graphql'), 'utf8'),
  readFileSync(require.resolve('./User.graphql'), 'utf8'),
])

export default typeDefs
