import { Types } from 'mongoose'
import { Document } from 'mongoose'

interface Tournament extends Document {
  name: string
  description: string
  ruleset: Types.ObjectId[]
  date: Date
  players: Types.ObjectId[]
  admin: Types.ObjectId[]
  matches: Types.ObjectId[]
  invitationOnly: boolean
  maxPlayers: number
}

interface TournamentInput {
  name: string
  description: string
  rules: number[]
  date: Date
  players: number[]
  admin: Types.ObjectId[]
  matches: number[]
}

export type { Tournament, TournamentInput }
