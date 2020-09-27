const games = [
  {
    name: "Kirby Planet Robobot",
    image: require("../assets/KirbyPlanetRobobot.png"),
    stageOrder: [
      "Patched Plains",
      "Resolution Road",
      "Overload Ocean",
      "Gigabyte Grounds",
      "Rhythm Route",
      "Access Ark",
    ],
  },
  {
    name: "Kirby Triple Deluxe",
    image: require("../assets/KirbyTripleDeluxe.jpg"),
    stageOrder: [
      "Fine Fields",
      "Lollipop Land",
      "Old Odyssey",
      "Wild World",
      "Endless Explosions",
      "Royal Road",
    ],
  },
  {
    name: "Kirby Star Allies",
    image: require("../assets/KirbyStarAllies.jpg"),
    stageOrder: [
      "World of Peace - Dream Land",
      "World of Miracles - Planet Popstar",
      "Fortress of Shadows - Jambastion",
      "Far-Flung Starlight Heroes",
    ],
    extraOrder: [
      "Heroes in Another Dimension - Dimension I",
      "Heroes in Another Dimension - Dimension II",
      "Heroes in Another Dimension - Dimension III",
      "Heroes in Another Dimension - Dimension IV",
    ],
  },
];

const stages: StagesInterface = {
  "Patched Plains": {
    color: "green",
    image: require("../assets/KirbyPlanetRobobot/PatchedPlains.jpg"),
  },
  "Resolution Road": {
    color: "black",
    image: require("../assets/KirbyPlanetRobobot/ResolutionRoad.jpg"),
  },
  "Overload Ocean": {
    color: "blue",
    image: require("../assets/KirbyPlanetRobobot/OverloadOcean.jpg"),
  },
  "Gigabyte Grounds": {
    color: "orange",
    image: require("../assets/KirbyPlanetRobobot/GigabyteGrounds.png"),
  },
  "Rhythm Route": {
    color: "purple",
    image: require("../assets/KirbyPlanetRobobot/RhythmRoute.jpg"),
  },
  "Access Ark": {
    color: "gray",
    image: require("../assets/KirbyPlanetRobobot/AccessArk.jpg"),
  },
  "Fine Fields": {
    color: "green",

    image: require("../assets/KirbyTripleDeluxe/FineFields.png"),
  },
  "Lollipop Land": {
    color: "#eed4b4",
    image: require("../assets/KirbyTripleDeluxe/LollipopLand.png"),
  },
  "Old Odyssey": {
    color: "orange",
    image: require("../assets/KirbyTripleDeluxe/OldOdyssey.png"),
  },
  "Wild World": {
    color: "brown",
    image: require("../assets/KirbyTripleDeluxe/WildWorld.png"),
  },
  "Endless Explosions": {
    color: "darkred",
    image: require("../assets/KirbyTripleDeluxe/EndlessExplosions.jpg"),
  },
  "Royal Road": {
    color: "darkblue",
    image: require("../assets/KirbyTripleDeluxe/RoyalRoad.png"),
  },
  "World of Peace - Dream Land": {
    color: "green",
    image: require("../assets/KirbyStarAllies/WorldOfPeace.jpg"),
    levelOrder: [
      "Green Gardens",
      "Donut Dome",
      "Honey Hill",
      "Fruity Forest",
      "Clash at Castle Dedede",
      "Extra Eclair",
    ],
  },
  "World of Miracles - Planet Popstar": {
    color: "gold",
    image: require("../assets/KirbyStarAllies/WorldOfMiracles.jpg"),
    levelOrder: [
      "Friendly Field",
      "Reef Resort",
      "Echo's Edge",
      "Nature's Navel",
      "Sacred Square",
      "Inside Islands",
      "Duplex Dream",
    ],
  },
  "Fortress of Shadows - Jambastion": {
    color: "red",
    image: require("../assets/KirbyStarAllies/FortressOfShadows.jpg"),
    levelOrder: [
      "Gatehouse Road",
      "Eastern Wall",
      "Longview Corridor",
      "Western Outer Wall",
      "Inner Sanctum",
      "Heavenly Hall",
      "Sector A",
      "Sector B",
      "Sector C",
    ],
  },
  "Far-Flung Starlight Heroes": {
    color: "purple",
    image: require("../assets/KirbyStarAllies/FarFlung.jpg"),
    levelOrder: [
      "Planet Earthfall",
      "Falluna Moon",
      "Planet Misteen",
      "Mareen Moon",
      "Planet Caverna",
      "Grott Moon",
      "Planet Frostak",
      "Blizzno Moon",
      "Planet Towara",
      "Gabbel Moon",
      "Star Lavadom",
      "Sizzlai Moon",
      "Jambandra Base",
      "The Divine Terminus",
      "Extra Planet α",
      "Extra Planet β",
      "Extra Planet γ",
      "Extra Planet δ",
    ],
  },
  "Heroes in Another Dimension - Dimension I": {
    color: "black",
    image: require("../assets/KirbyStarAllies/Heroes.png"),
  },
  "Heroes in Another Dimension - Dimension II": {
    color: "darkblue",
    image: require("../assets/KirbyStarAllies/Heroes.png"),
  },
  "Heroes in Another Dimension - Dimension III": {
    color: "darkgreen",
    image: require("../assets/KirbyStarAllies/Heroes.png"),
  },
  "Heroes in Another Dimension - Dimension IV": {
    color: "purple",
    image: require("../assets/KirbyStarAllies/Heroes.png"),
  },
};

interface StageInterface {
  color: string;
  image: any;
  levelOrder?: Array<string>;
}

interface StagesInterface {
  [key: string]: StageInterface;
}

export { games, stages }; //TODO change names
