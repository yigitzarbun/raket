/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("bookings").truncate();
  await knex("scores").truncate();
  await knex("invites").truncate();
  await knex("challenges").truncate();
  await knex("courts").truncate();
  await knex("player_payments").truncate();
  await knex("club_payments").truncate();
  await knex("points").truncate();
  await knex("players").truncate();
  await knex("clubs").truncate();
  await knex("districts").truncate();
  await knex("payment_types").truncate();
  await knex("indoor_outdoor").truncate();
  await knex("levels").truncate();
  await knex("court_types").truncate();
  await knex("genders").truncate();

  await knex("genders").insert([
    { gender_id: 1, gender: "male" },
    { gender_id: 2, gender: "female" },
  ]);
  await knex("court_types").insert([
    { court_type_id: 1, court_type: "hard" },
    { court_type_id: 2, court_type: "clay" },
    { court_type_id: 3, court_type: "grass" },
    { court_type_id: 4, court_type: "artificial_grass" },
    { court_type_id: 5, court_type: "other" },
  ]);
  await knex("levels").insert([
    { level_id: 1, level: "beginner" },
    { level_id: 2, level: "intermediate" },
    { level_id: 3, level: "advanced" },
    { level_id: 4, level: "pro" },
  ]);
  await knex("indoor_outdoor").insert([
    { indoor_outdoor_id: 1, indoor_outdoor: "indoor" },
    { indoor_outdoor_id: 2, indoor_outdoor: "outdoor" },
    { indoor_outdoor_id: 3, indoor_outdoor: "both" },
  ]);
  await knex("payment_types").insert([
    { payment_type_id: 1, payment_type: "training" },
    { payment_type_id: 2, payment_type: "registration" },
    { payment_type_id: 3, payment_type: "promotion" },
    { payment_type_id: 4, payment_type: "membership" },
    { payment_type_id: 5, payment_type: "refund" },
  ]);
  await knex("districts").insert([
    { district_id: 1, district: "adalar" },
    { district_id: 2, district: "ataşehir" },
    { district_id: 3, district: "beşiktaş" },
    { district_id: 4, district: "beykoz" },
    { district_id: 5, district: "beylikdüzü" },
    { district_id: 6, district: "beyoğlu" },
    { district_id: 7, district: "çekmeköy" },
    { district_id: 8, district: "kadıköy" },
    { district_id: 9, district: "kartal" },
    { district_id: 10, district: "maltepe" },
    { district_id: 11, district: "pendik" },
    { district_id: 12, district: "tuzla" },
  ]);
  await knex("clubs").insert([
    {
      club_id: 1,
      user_type: "club",
      registry_date: "13.04.2023",
      name: "Wimbledon",
      email: "wimbledon@raket.com",
      court_quantity: 14,
      logo_image: "/images/wimbledon_logo.png",
      club_image: "/images/wimbledon-club.jpeg",
      password: "1234",
      indoor_outdoor_id: 3,
      court_type_1_id: 3,
      court_type_2_id: 3,
      court_type_3_id: 4,
      district_id: 1,
    },
    {
      club_id: 2,
      user_type: "club",
      registry_date: "13.04.2023",
      name: "Rolland Garros",
      email: "rg@raket.com",
      court_quantity: 11,
      logo_image: "/images/rolland-garros-logo.png",
      club_image: "/images/rolland-garros-club.jpeg",
      password: "1234",
      indoor_outdoor_id: 3,
      court_type_1_id: 2,
      court_type_2_id: 2,
      court_type_3_id: 2,
      district_id: 2,
    },
    {
      club_id: 3,
      user_type: "club",
      registry_date: "13.04.2023",
      name: "USTA Billie Jean King National Tennis Center",
      email: "usopen@raket.com",
      court_quantity: 19,
      logo_image: "/images/usopen-logo.jpeg",
      club_image: "/images/usopen-club.jpeg",
      password: "1234",
      indoor_outdoor_id: 3,
      court_type_1_id: 2,
      court_type_2_id: 2,
      court_type_3_id: 2,
      district_id: 2,
    },
  ]);
  await knex("players").insert([
    {
      player_id: 1,
      user_type: "player",
      registry_date: "13.04.2023",
      fname: "Roger",
      lname: "Federer",
      email: "roger@raket.com",
      birth_year: 1981,
      face_image: "/images/federer-face.png",
      body_image: "/images/federer.png",
      password: "1234",
      level_id: 4,
      gender_id: 1,
      club_preference_1_id: 1,
      club_preference_2_id: 2,
      club_preference_3_id: 3,
    },
    {
      player_id: 2,
      user_type: "player",
      registry_date: "14.04.2023",
      fname: "Rafael",
      lname: "Nadal",
      email: "rafa@raket.com",
      birth_year: 1986,
      face_image: "/images/nadal-face.png",
      body_image: "/images/nadal-body.png",
      password: "1234",
      level_id: 4,
      gender_id: 1,
      club_preference_1_id: 1,
      club_preference_2_id: 2,
      club_preference_3_id: 3,
    },
    {
      player_id: 3,
      user_type: "player",
      registry_date: "16.04.2023",
      fname: "Novak",
      lname: "Djokovic",
      email: "novak@raket.com",
      birth_year: 1987,
      face_image: "/images/djokovic-face.png",
      body_image: "/images/djokovic.png",
      password: "1234",
      level_id: 4,
      gender_id: 1,
      club_preference_1_id: 1,
      club_preference_2_id: 2,
      club_preference_3_id: 3,
    },
  ]);
  await knex("points").insert([
    { point_id: 1, points: 12, player_id: 1 },
    { point_id: 2, points: 14, player_id: 2 },
    { point_id: 3, points: 18, player_id: 3 },
  ]);
  await knex("club_payments").insert([
    {
      club_payment_id: 1,
      amount: 100,
      date: "2023-04-25",
      club_id: 1,
      payment_type_id: 1,
    },
    {
      club_payment_id: 2,
      amount: 200,
      date: "2023-04-25",
      club_id: 1,
      payment_type_id: 1,
    },
  ]);
  await knex("player_payments").insert([
    {
      player_payment_id: 1,
      amount: 200,
      date: "2023-04-25",
      player_id: 1,
      payment_type_id: 1,
    },
    {
      player_payment_id: 2,
      amount: 50,
      date: "2023-04-25",
      player_id: 1,
      payment_type_id: 2,
    },
  ]);
  await knex("courts").insert([
    {
      court_id: 1,
      court_name: "1",
      opening: 0800,
      closing: 2200,
      price: 150,
      club_id: 1,
      indoor_outdoor_id: 2,
      court_type_id: 3,
    },
    {
      court_id: 2,
      court_name: "1",
      opening: 0800,
      closing: 2200,
      price: 150,
      club_id: 2,
      indoor_outdoor_id: 2,
      court_type_id: 2,
    },
    {
      court_id: 3,
      court_name: "1",
      opening: 0800,
      closing: 2200,
      price: 150,
      club_id: 3,
      indoor_outdoor_id: 2,
      court_type_id: 1,
    },
  ]);
  await knex("challenges").insert([
    {
      challenge_id: 1,
      status: "pending",
      event_type: "match",
      event_date: "2023-04-01",
      time: 1300,
      date: "1685900182914",
      message: "Hey, are you up for a match?",
      challenger_id: 1,
      challengee_id: 2,
      court_id: 1,
      club_id: 1,
    },
    {
      challenge_id: 2,
      status: "pending",
      event_type: "match",
      event_date: "2023-04-01",
      time: 1500,
      date: "1685900182914",
      message: "Hey, are you up for a match?",
      challenger_id: 2,
      challengee_id: 3,
      court_id: 2,
      club_id: 2,
    },
  ]);
  await knex("invites").insert([
    {
      invite_id: 1,
      status: "confirmed",
      event_type: "training",
      event_date: "2023-04-01",
      time: 1400,
      date: "1685900182914",
      message: "Hey, are you up for a match?",
      inviter_id: 1,
      invitee_id: 2,
      court_id: 1,
      club_id: 1,
    },
    {
      invite_id: 2,
      status: "pending",
      event_type: "training",
      event_date: "2023-04-01",
      time: 1600,
      date: "1685900182914",
      message: "Hey, are you up for a match?",
      inviter_id: 2,
      invitee_id: 3,
      court_id: 2,
      club_id: 2,
    },
  ]);
  await knex("scores").insert([
    {
      score_id: 1,
      first_set_challenger: 6,
      first_set_challengee: 2,
      second_set_challenger: 6,
      second_set_challengee: 4,
      tie_break_challenger: null,
      tie_break_challengee: null,
      challenge_id: 1,
      winner_id: 1,
      challenger_id: 1,
      challengee_id: 2,
      loser_id: 2,
    },
    {
      score_id: 2,
      first_set_challenger: 6,
      first_set_challengee: 3,
      second_set_challenger: 6,
      second_set_challengee: 2,
      tie_break_challenger: null,
      tie_break_challengee: null,
      challenge_id: 2,
      winner_id: 3,
      challenger_id: 3,
      challengee_id: 2,
      loser_id: 2,
    },
  ]);
  await knex("bookings").insert([
    {
      booking_id: 1,
      status: "confirmed",
      date: "21.04.2023",
      event_date: "21.04.2023",
      time: 1300,
      club_id: 1,
      court_id: 1,
    },
    {
      booking_id: 2,
      status: "confirmed",
      date: "20.04.2023",
      event_date: "22.04.2023",
      time: 1500,
      club_id: 2,
      court_id: 2,
    },
  ]);
};
