const elementCount = 11;

const element = {
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
  14: {
    name: 'Purple Petal',
    color: [85, 10, 100, 255],
    density: 1,
    rigid: true,
    hidden: true
  },
  13: {
    name: 'Pink Petal',
    color: [250, 180, 195, 255],
    density: 1,
    rigid: true,
    hidden: true
  },
  12: {
    name: 'Blue Petal',
    color: [75, 105, 180, 255],
    density: 1,
    rigid: true,
    hidden: true
  },
  11: {
    name: 'Yellow Petal',
    color: [230, 195, 20, 255],
    density: 1,
    rigid: true,
    hidden: true
  },
  10: {
    name: 'Red Petal',
    color: [150, 5, 20, 255],
    density: 1,
    rigid: true,
    hidden: true
  },
  9: {
    name: 'Flower Stem',
    color: [30, 70, 20, 255],
    rigid: false,
    density: 1,
    hidden: false
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
    hollowChance: .2
  },
  7: {
    name: 'Seed',
    color: [140, 155, 90, 255],
    rigid: false,
    density: 1,
    flammability: .05
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
    riseRate: .8
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