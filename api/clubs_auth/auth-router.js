const router = require("express").Router();
const { JWT_SECRET } = require("../../config/secrets");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const clubsModel = require("../clubs/clubs-model");
const secrets = require("../secrets");
const clubsMd = require("../clubs_auth/auth-middleware");

router.post(
  "/register",
  clubsMd.credentialsExist,
  clubsMd.emailUnique,
  async (req, res, next) => {
    try {
      const credentials = req.body;
      const hash = bcrypt.hashSync(credentials.password, 8);
      credentials.password = hash;
      const newClub = await clubsModel.add(credentials);
      res.status(201).json(newClub);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  clubsMd.loginCredentialsExist,
  clubsMd.emailExists,
  (req, res, next) => {
    const { email, password } = req.body;
    clubsModel
      .getByFilter({ email })
      .then((club) => {
        if (club && bcrypt.compareSync(password, club.password)) {
          const token = generateToken(club);
          res.status(200).json({ club, token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(next);
  }
);

function generateToken(club) {
  const payload = {
    club_id: club.club_id,
    email: club.email,
  };
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, secrets.JWT_SECRET, options);
  return token;
}

module.exports = router;
