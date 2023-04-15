const clubsModel = require("../clubs/clubs-model");

const credentialsExist = (req, res, next) => {
  const {
    club_image,
    court_quantity,
    court_type_1_id,
    court_type_2_id,
    court_type_3_id,
    district_id,
    email,
    indoor_outdoor_id,
    logo_image,
    name,
    password,
    registry_date,
    user_type,
  } = req.body;
  if (
    !club_image ||
    !court_quantity ||
    !court_type_1_id ||
    !court_type_2_id ||
    !court_type_3_id ||
    !district_id ||
    !email ||
    !indoor_outdoor_id ||
    !logo_image ||
    !name ||
    !password ||
    !registry_date ||
    !user_type
  ) {
    res.status(400).json({ message: "Required fields are missing" });
  } else {
    next();
  }
};

const emailUnique = async (req, res, next) => {
  const { email } = req.body;
  const emailExist = await clubsModel.getByFilter({ email });
  if (emailExist) {
    res.status(400).json({ message: "Email is already registered" });
  } else {
    next();
  }
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const emailExists = await clubsModel.getByFilter({ email });
  if (!emailExists) {
    res.status(400).json({ message: "Invalid credentials" });
  } else {
    next();
  }
};

const loginCredentialsExist = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Invalid credentials" });
  } else {
    next();
  }
};

module.exports = {
  credentialsExist,
  emailUnique,
  emailExists,
  loginCredentialsExist,
};
