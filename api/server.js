const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const api_key = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: api_key,
});

const openai = new OpenAIApi(configuration);

// routers
const playersRouter = require("./players/players-router");
const playersAuthRouter = require("./players_auth/auth-router");
const clubsRouter = require("./clubs/clubs-router");
const clubsAuthRouter = require("./clubs_auth/auth-router");
const gendersRouter = require("./genders/genders-router");
const levelsRouter = require("./levels/levels-router");
const invitesRouter = require("./invites/invites-router");
const courtsRouter = require("./courts/courts-router");
const playersPaymentRouter = require("./player-payments/payments-router");
const playersCardsRouter = require("./player-cards/cards-router");
const bookingsRouter = require("./bookings/bookings-router");
const courtTypesRouter = require("./court_types/court_types_router");
const indoorOutdoorRouter = require("./indoor_outdoor/indoor_outdoor_router");
// server
const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use routers
server.use("/api/players", playersRouter);
server.use("/api/playersAuth", playersAuthRouter);
server.use("/api/clubs", clubsRouter);
server.use("/api/clubsAuth", clubsAuthRouter);
server.use("/api/genders", gendersRouter);
server.use("/api/levels", levelsRouter);
server.use("/api/invites", invitesRouter);
server.use("/api/courts", courtsRouter);
server.use("/api/player-payments", playersPaymentRouter);
server.use("/api/player-cards", playersCardsRouter);
server.use("/api/bookings", bookingsRouter);
server.use("/api/court-types", courtTypesRouter);
server.use("/api/indoor-outdoor", indoorOutdoorRouter);

server.post("/api/chatgpt", async (req, res, next) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            req.body.prompt +
            "The user is on a platform called Raket, where they can find partners to train and match, according to their level, and preferences like gender and location in Turkey.  They can also book tennis courts at various clubs in Turkey. They can also buy tennis equipment on their Raket dashboard page. Only if the user asks a question about finding a tennis partner, booking a tennis court of buying tennis equipment, try to prompt user to use Raket. If it is a general question about tennis, don't mention anything about Raket in your response. We don't want your responses to be heavily sales and marketing oriented. Try to limit your answer by approximately 40 characters. If the user prompt is not related to tennis, return an answer that prompts the user to only ask questions about tennis. If the users prompt is related to tennis, do not prompt the user to ask questions about tennis.",
        },
      ],
    });
    if (completion.data.choices && completion.data.choices.length > 0) {
      res
        .status(200)
        .json({ message: completion.data.choices[0].message.content });
    } else {
      console.log("No completion choices found.");
    }
  } catch (error) {
    next(error);
  }
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

server.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

module.exports = server;
