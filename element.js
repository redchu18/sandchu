const element = {
  fireId: 5,
  oilId : 4,
  rockId: 3,
  waterId: 2,
  sandId: 1,
  emptyId: 0
}

const elementProps = {
  5: {
    name : 'fire',
    color : [225, 90, 35, 255],
    rigid : false,
    density: 0,
    burnRate: .04,
    riseRate: .8
  },
  4: {
    name : 'oil',
    color: [25, 50, 25, 255],
    rigid: false,
    density: 0.25,
    flammability: .25
  },
  3: {
    name : 'rock',
    color: [105, 105, 105, 255],
    rigid: true,
    density: 1
  },
  2: {
    name : 'water',
    color: [30, 130, 190, 255],
    rigid: false,
    density: 0.5,
    flammability: 0
  },
  1: {
    name : 'sand',
    color: [190, 180, 130, 255],
    rigid: false,
    density: 1
  },
  0: {
    name : 'empty',
    color: [230, 230, 230, 255],
    rigid: false,
    density: 0
  }
}