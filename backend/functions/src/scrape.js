const fetch = require("node-fetch");
//: Array<Map<string, number>>

function convertToUrl(stage, level) {
  stage = stage.replace(/\s+/g, "_");
  let res = "https://wikirby.com/wiki/" + stage + "_-_Stage_" + level;
  return res;
}
//basic function for scraping planet robobot and triple deluxe
async function fetcher(stages) {
  console.log("Here");
  let res = {};
  for (let key in stages) {
    res[key] = {};
    const value = stages[key];
    for (let i = value; i > 0; i--) {
      let level = i;
      if (i == value || (value == 8 && i == value - 1)) level += "_EX";
      const url = convertToUrl(key, level);
      const response = await fetch(url);
      let text = await response.text();
      //console.log(text);
      text = text.replace(/<[^>]*>/g, "");
      let start = text.lastIndexOf("Sun Stone &amp; Gold Keychain Guide");
      if (start == -1)
        start = text.lastIndexOf("Sun Stone &amp; Rare Keychain Guide");
      if (start == -1)
        start = text.lastIndexOf("Code Cube &amp; Gold Sticker Guide");
      let end = text.lastIndexOf("Enemies, Mid-Bosses and Abilities");
      if (end == -1) end = text.lastIndexOf("Enemies, Bosses and Abilities");
      text = text.substring(start, end);
      let info = text.split(
        /(Sun Stone \d - )|(Sun Stone - )|(Gold Keychain - )|(Rare Keychain - )|(Code Cube \d - )|(Code Cube - )|(Gold Sticker - )|\n/
      ); //
      info = info.slice(1, info.length - 1);
      const filteredInfo = info
        .filter((item) => {
          return item != "" && item != undefined;
        })
        .map((item) => {
          if (item == "Smash Bros. Copy Essence Room[edit]")
            item = "Smash. Bros. Copy Essence Room -";
          return item;
        });
      let objectedInfo = {};
      for (let i = 0; i < filteredInfo.length; i += 2) {
        objectedInfo[filteredInfo[i]] = filteredInfo[i + 1];
      }
      res[key][key + " " + level] = objectedInfo;
    }
  }
  return res;
  //TODO may also have a smash bros. copy essence room https://wikirby.com/wiki/Patched_Plains_-_Stage_4
}

module.exports = fetcher;

/*fetcher({"Access Ark":
  "8",
  "Gigabyte Grounds":
  "7",
  "Overload Ocean":
  "7",
  "Patched Plains":
  "6",
  "Resolution Road":
  "6",
  "Rhythm Route":
  "7"})*/
/*const writeResult = await admin
    .firestore()
    .collection("Kirby Planet Robobot")
    .add({stage: { label: data }});*/
