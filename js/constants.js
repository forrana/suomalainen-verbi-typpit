import { INITLEVEL, TOTALLEVELS } from "./leveling-system.js"

export const verbs = {
  gerunds: [
    'postpone',
    'resist',
    'delay',
    'suggest',
    'mind',
    'recommend',
    'deny',
    'consider',
    'risk',
    'encourage someone'
  ],
  infinitives: [
    'get',
    'decide',
    'care',
    'arrange',
    'agree',
    'appear',
    'claim',
    'hesitate',
    'pretend',
    'refuse',
    'happen',
    'learn',
    'encourage',
    'yearn'
  ],
  indifferents: [
    'try',
    'remember',
    'stop',
    'regret',
    'forget'
  ]
}

export const randomVerbs = [
  'having',
  'doing',
  'saying',
  'going',
  'getting',
  'thinking',
  'taking',
  'seeing',
  'coming',
  'using',
  'finding',
  'giving',
  'working',
  'calling',
  'trying',
  'asking',
  'needing',
  'feeling',
  'becoming',
  'leaving'
]

export const names = [
  'Amelia',
  'Olivia',
  'Isla',
  'Emily',
  'Poppy',
  'Ava',
  'Isabella',
  'Jessica',
  'Lily',
  'Jack',
  'Harry',
  'Jacob',
  'Charlie',
  'Thomas',
  'George',
  'Oscar',
  'James',
  'William'
]

export const TOTALWORDS = Math.round((verbs.gerunds.length + verbs.infinitives.length + verbs.indifferents.length) / TOTALLEVELS)
