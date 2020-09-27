import * as functions from "firebase-functions";

const scrape = require("../src/scrape");
const {
  starAlliesScrape,
  starAlliesExtrasScrape,
} = require("../src/starAlliesScrape");

const admin = require("firebase-admin");
admin.initializeApp();

const gameError = { success: false, response: "Please enter a valid game." };
const genericError = {
  success: false,
  response: "An unexpected error has occurred.",
};

exports.getGame = functions.https.onRequest(async (req: any, res: any) => {
  // Grab the text parameter.
  const game: string = req.query.game;
  const validGames = [
    "Kirby Planet Robobot",
    "Kirby Triple Deluxe",
    "Kirby Star Allies",
  ];
  if (!validGames.includes(game)) return res.json(gameError);

  const db = admin.firestore();
  const ref = db.collection("gameData").doc(game);
  ref
    .get()
    .then((doc: any) => {
      const data = doc.data();
      if (data) return res.json({ data });
      else {
        const ref2 = db.collection("Collectables").doc(game);
        ref2
          .get()
          .then((doc2: any) => {
            const dataToScrape = doc2.data()["Stages"];
            const scrapeFunction =
              game === "Kirby Star Allies" ? starAlliesScrape : scrape;
            scrapeFunction(dataToScrape).then((scrapedData: any) => {
              admin
                .firestore()
                .collection("gameData")
                .doc(game)
                .set({ storedData: scrapedData });
            });

            return res.json({ success: true, response: "Game data stored." });
          })
          .catch(() => {
            return res.json(genericError);
          });
      }
    })
    .catch(() => {
      return res.json(genericError);
    });
  //return res.json({ response: "Saved to database" });
});

exports.getExtras = functions.https.onRequest(async (req: any, res: any) => {
  // Grab the text parameter.
  const game: string = req.query.game;
  const validGames = ["Kirby Star Allies"];
  if (!validGames.includes(game)) return res.json(gameError);

  const db = admin.firestore();
  const ref = db.collection("sideData").doc(game);
  ref
    .get()
    .then((doc: any) => {
      const data = doc.data();
      if (data) return res.json({ data });
      else {
        const ref2 = db.collection("Collectables").doc(game);
        ref2
          .get()
          .then((doc2: any) => {
            const dataToScrape = doc2.data()["Extras"];
            starAlliesExtrasScrape(dataToScrape).then((scrapedData: any) => {
              admin
                .firestore()
                .collection("sideData")
                .doc(game)
                .set({ storedData: scrapedData });
            });

            return res.json({ success: true, response: "Game data stored." });
          })
          .catch(() => {
            return res.json(genericError);
          });
      }
    })
    .catch(() => {
      return res.json(genericError);
    });
  //return res.json({ response: "Saved to database" });
});
