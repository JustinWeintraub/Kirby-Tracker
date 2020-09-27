const fetch = require("node-fetch");
const { URL } = require("url");

//: Array<Map<string, number>>

function convertToUrl(level) {
  level = level.replace(/\s+/g, "_");
  let res = "https://wikirby.com/wiki/" + level;
  return res;
}
async function fetcher(stages) {
  let res = {};
  for (let key in stages) {
    //TODO get key and amount
    res[key] = {};
    for (let level of stages[key]) {
      const url = convertToUrl(level);
      const response = await fetch(new URL(url));
      let text = await response.text();
      text = text.replace(/<[^>]*>/g, "");
      let start = text.lastIndexOf("Rare Picture Piece Guide[edit]");
      let end = text.lastIndexOf("Guest Star ???? Star Allies Go![edit]");
      if (end === -1)
        end = text.lastIndexOf("Guest Star&#160;???? Star Allies Go![edit]");
      if (end === -1)
        end = text.lastIndexOf("Enemies, Mid-Bosses and Abilities");
      if (end === -1) end = text.lastIndexOf("Enemies, Bosses and Abilities");
      if (end === -1) end = text.lastIndexOf("Enemies, Bosses, and Abilities");
      text = text.substring(start, end);
      //console.log(text);
      const splitters = ["Big Switch Guide[edit]", "Hidden Area[edit]"];
      let info = text.split(
        /(\n)|(Big Switch Guide[edit])|(Hidden Area[edit])/
      );
      /*for (let i = 0; i < info.length; i += 2) {
        //console.log(i + level);
        info = info.slice(j, info.length);
        j++;
      }*/
      //info = info.slice(1, info.length - 1);
      let filteredInfo = info
        .filter((item) => {
          return item != "" && item != undefined && item != "\n";
        })
        .map((item) => {
          if (item == "Smash Bros. Copy Essence Room[edit]")
            item = "Smash. Bros. Copy Essence Room -";
          return item;
        });
      //if (level == "Echo's Edge") console.log(filteredInfo);

      let objectedInfo = {};
      if (level === "Gatehouse Road")
        objectedInfo[filteredInfo[0]] = filteredInfo[1];
      else
        for (let i = 0; i < filteredInfo.length; i += 3) {
          //TODO replace edit
          if (i + 3 > filteredInfo.length && filteredInfo.length % 3 != 0) {
          } //objectedInfo[filteredInfo[i]] = filteredInfo[i + 2] +filteredInfo[i + 3]
          //TODO temp?
          else {
            const key = filteredInfo[i].replace("[edit]", "");
            objectedInfo[key] = filteredInfo[i + 2];
          }
        }
      res[key][level] = objectedInfo;
    }
  }
  return res;
  //TODO may also have a smash bros. copy essence room https://wikirby.com/wiki/Patched_Plains_-_Stage_4
}

module.exports = { fetcher, sideFetcher };

async function sideFetcher(stages) {
  let res = {};
  for (let stage of stages) {
    res[stage] = {};
    const url = convertToUrl(stage);
    const response = await fetch(new URL(url));
    let text = await response.text();
    text = text.replace(/<[^>]*>/g, "");
    text = text.replace("&amp;", "&");
    const startString = "The following are in order of appearance:";
    const start = text.lastIndexOf(startString);
    const end = text.lastIndexOf("Enemies &amp; Mid-Bosses[edit]");
    text = text.substring(start, end);
    let info = text.split(/(\n)/);
    let filteredInfo = info.filter((item) => {
      return (
        item != "" && item != undefined && item != "\n" && item != startString
      );
    });

    let currentPart = undefined;
    let heartNum = 1;
    for (let i = 0; i < filteredInfo.length; i++) {
      let infoPart = filteredInfo[i];
      if (infoPart.includes("[edit]")) {
        infoPart = infoPart.replace("[edit]", "");
        infoPart = infoPart.replace("&amp;", "&"); //TODO
        currentPart = infoPart;
        res[stage][currentPart] = {};
        heartNum = 1;
      } else {
        res[stage][currentPart]["Heart " + heartNum] = infoPart;
        heartNum++;
      }
    }
  }
  return res;
}
