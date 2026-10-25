// Every image on the public site comes from /public/images. Swap a photo by replacing the file or
// repointing the path here — nothing else in the code references image files directly.
//
// Files marked [Xinhua] carry a visible Xinhua News logo in the original photo.

export const IMG = {
  // Lake Kivu & landscape
  lakesideResort: '/images/lakeside-resort.webp',
  gomaVolcano: '/images/goma-volcano.webp',
  lakeAerialPortrait: '/images/lake-aerial-portrait.webp',
  lakeTownBay: '/images/lake-town-bay.webp',
  waterCarriers: '/images/water-carriers.webp',
  // Markets, trade & logistics
  lakesideMarket: '/images/lakeside-market.webp',
  cartPorter: '/images/cart-porter.webp',
  marketVegetables: '/images/market-vegetables.webp', // [Xinhua]
  marketGrainSellers: '/images/market-grain-sellers.webp', // [Xinhua]
  drinksDistribution: '/images/drinks-distribution.webp', // [Xinhua]
  fashionStorefront: '/images/fashion-storefront.webp', // [Xinhua]
  // City streets
  roundaboutMoto: '/images/roundabout-moto.webp', // [Xinhua]
  streetMotoTraffic: '/images/street-moto-traffic.webp', // [Xinhua]
  intersectionTraffic: '/images/intersection-traffic.webp', // [Xinhua]
} as const
