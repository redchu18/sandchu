const elementCount = 18;

const element = {
  ashId: 17,
  ablazeCharcoalId: 16,
  ablazePlantId: 15,
  purplePetalId: 14,
  pinkPetalId: 13,
  bluePetalId: 12,
  yellowPetalId: 11,
  redPetalId: 10,
  flowerStemId: 9,
  growingFlowerId: 8,
  seedId: 7,
  dirtId: 6,
  fireId: 5,
  oilId : 4,
  rockId: 3,
  waterId: 2,
  sandId: 1,
  emptyId: 0
}

const elementProps = {
  17: {
    name: 'Ash',
    color: [160, 155, 155, 255],
    density: 1,
    rigid: false,
    hidden: true
  },
  16: {
    name: 'Ablaze Charcoal',
    color: [50, 50, 50, 255],
    density: 1,
    rigid: true,
    hidden: true,
    class: 'plant',
    ashChance: .005
  },
  15: {
    name: 'Ablaze Plant',
    color: [140, 50, 1, 255],
    density: 1,
    rigid: true,
    hidden: true,
    class: 'plant',
    charcoalChance: .005,
    spreadChance: .01
  },
  14: {
    name: 'Purple Petal',
    color: [85, 10, 100, 255],
    density: 1,
    rigid: true,
    hidden: true,
    class: 'plant',
    flammability: .1
  },
  13: {
    name: 'Pink Petal',
    color: [250, 180, 195, 255],
    density: 1,
    rigid: true,
    hidden: true,
    class: 'plant',
    flammability: .1
  },
  12: {
    name: 'Blue Petal',
    color: [75, 105, 180, 255],
    density: 1,
    rigid: true,
    hidden: true,
    class: 'plant',
    flammability: .1
  },
  11: {
    name: 'Yellow Petal',
    color: [230, 195, 20, 255],
    density: 1,
    rigid: true,
    hidden: true,
    class: 'plant',
    flammability: .1
  },
  10: {
    name: 'Red Petal',
    color: [150, 5, 20, 255],
    density: 1,
    rigid: true,
    hidden: true,
    class: 'plant',
    flammability: .1
  },
  9: {
    name: 'Flower Stem',
    color: [30, 70, 20, 255],
    rigid: false,
    density: 1,
    hidden: true,
    class: 'plant',
    flammability: .1
  },
  8: {
    name: 'Growing Flower',
    color: [155, 120, 80, 255],
    rigid: false,
    density: 1,
    hidden: true,
    flammability: .05,
    topBias: .4,
    bloomChance: .1,
    hollowChance: .2,
    stopGrowingChance: .95,
    growOverStemChance: .1,
    class: 'plant'
  },
  7: {
    name: 'Seed',
    color: [140, 155, 90, 255],
    rigid: false,
    density: 1,
    flammability: .1
  },
  6: {
    name : 'Dirt',
    color : [110, 80, 60, 255],
    rigid : false,
    density : 1,
    flammability: 0
  },
  5: {
    name : 'Fire',
    color : [225, 90, 35, 255],
    rigid : false,
    density: 0,
    burnRate: .04,
    riseRate: .8,
    slowRate: .3
  },
  4: {
    name : 'Oil',
    color: [25, 50, 25, 255],
    rigid: false,
    density: 0.25,
    flammability: .25
  },
  3: {
    name : 'Rock',
    color: [105, 105, 105, 255],
    rigid: true,
    density: 1
  },
  2: {
    name : 'Water',
    color: [30, 130, 190, 255],
    rigid: false,
    density: 0.5,
    flammability: 0
  },
  1: {
    name : 'Sand',
    color: [190, 180, 130, 255],
    rigid: false,
    density: 1,
    flammability: 0
  },
  0: {
    name : 'Empty',
    color: [230, 230, 240, 255],
    rigid: false,
    density: 0
  }
}