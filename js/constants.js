import { INITLEVEL, TOTALLEVELS } from "./leveling-system.js"

export const verbs = {
  vt1: [
    'puhua', 'kirjoittaa', 'lukea', 'ymmärtää'
  ],
  vt2: [
    'syödä', 'juoda', 'viedä', 'imuroida'
  ],
  vt3: [
    'ajatella', 'purra', 'mennä', 'pestä'
  ],
  vt4: [
    'haluta', 'tavata', 'osata', 'pudota'
  ],
  vt5: [
    'valita', 'tarvita', 'mainita', 'häiritä'
  ],
  vt6: [
    'paeta', 'kyetä', 'vanheta', 'pidetä'
  ]
}

// export const randomVerbs = [
//   'having',
//   'doing',
//   'saying',
//   'going',
//   'getting',
//   'thinking',
//   'taking',
//   'seeing',
//   'coming',
//   'using',
//   'finding',
//   'giving',
//   'working',
//   'calling',
//   'trying',
//   'asking',
//   'needing',
//   'feeling',
//   'becoming',
//   'leaving'
// ]

// export const names = [
//   'Amelia',
//   'Olivia',
//   'Isla',
//   'Emily',
//   'Poppy',
//   'Ava',
//   'Isabella',
//   'Jessica',
//   'Lily',
//   'Jack',
//   'Harry',
//   'Jacob',
//   'Charlie',
//   'Thomas',
//   'George',
//   'Oscar',
//   'James',
//   'William'
// ]

export const TOTALWORDS = Math.round((verbs.vt1.length + verbs.vt2.length + verbs.vt3.length + verbs.vt4.length + verbs.vt5.length + verbs.vt6.length) / TOTALLEVELS)
