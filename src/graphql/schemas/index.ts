import { mergeTypeDefs } from '@graphql-tools/merge'

import matchSchema from './Match.graphql'
import notificationSchema from './Notification.graphql'
import rulesetSchema from './Ruleset.graphql'
import seriesSchema from './Series.graphql'
import tournamentSchema from './Tournament.graphql'
import userSchema from './User.graphql'

const typeDefs = mergeTypeDefs([
  matchSchema,
  notificationSchema,
  rulesetSchema,
  seriesSchema,
  tournamentSchema,
  userSchema,
])

export default typeDefs
