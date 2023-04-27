/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("genders", (tbl) => {
      tbl.increments("gender_id");
      tbl.string("gender").notNullable();
    })
    .createTable("court_types", (tbl) => {
      tbl.increments("court_type_id");
      tbl.string("court_type");
    })
    .createTable("levels", (tbl) => {
      tbl.increments("level_id");
      tbl.string("level").notNullable();
    })
    .createTable("indoor_outdoor", (tbl) => {
      tbl.increments("indoor_outdoor_id");
      tbl.string("indoor_outdoor");
    })
    .createTable("payment_types", (tbl) => {
      tbl.increments("payment_type_id");
      tbl.string("payment_type").notNullable();
    })
    .createTable("districts", (tbl) => {
      tbl.increments("district_id");
      tbl.string("district").notNullable();
    })
    .createTable("clubs", (tbl) => {
      tbl.increments("club_id");
      tbl.string("user_type").notNullable();
      tbl.timestamp("registry_date").notNullable();
      tbl.string("name").notNullable().unique();
      tbl.string("email").notNullable().unique();
      tbl.integer("court_quantity").notNullable();
      tbl.string("logo_image").notNullable();
      tbl.string("club_image").notNullable();
      tbl.string("password").notNullable();
      tbl
        .integer("indoor_outdoor_id")
        .unsigned()
        .notNullable()
        .references("indoor_outdoor_id")
        .inTable("indoor_outdoor")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("court_type_1_id")
        .unsigned()
        .notNullable()
        .references("court_type_id")
        .inTable("court_types")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("court_type_2_id")
        .unsigned()
        .notNullable()
        .references("court_type_id")
        .inTable("court_types")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("court_type_3_id")
        .unsigned()
        .notNullable()
        .references("court_type_id")
        .inTable("court_types")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("district_id")
        .unsigned()
        .notNullable()
        .references("district_id")
        .inTable("districts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("players", (tbl) => {
      tbl.increments("player_id");
      tbl.string("user_type").notNullable();
      tbl.timestamp("registry_date").notNullable();
      tbl.string("fname").notNullable();
      tbl.string("lname").notNullable();
      tbl.string("email").notNullable().unique();
      tbl.integer("birth_year").notNullable();
      tbl.string("face_image").notNullable();
      tbl.string("body_image").notNullable();
      tbl.string("password").notNullable();
      tbl
        .integer("level_id")
        .unsigned()
        .notNullable()
        .references("level_id")
        .inTable("levels")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("gender_id")
        .unsigned()
        .notNullable()
        .references("gender_id")
        .inTable("genders")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("club_preference_1_id")
        .unsigned()
        .notNullable()
        .references("club_id")
        .inTable("clubs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("club_preference_2_id")
        .unsigned()
        .notNullable()
        .references("club_id")
        .inTable("clubs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("club_preference_3_id")
        .unsigned()
        .notNullable()
        .references("club_id")
        .inTable("clubs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("points", (tbl) => {
      tbl.increments("point_id");
      tbl.integer("points");
      tbl
        .integer("player_id")
        .unsigned()
        .notNullable()
        .references("player_id")
        .inTable("players")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("club_payments", (tbl) => {
      tbl.increments("club_payment_id");
      tbl.integer("amount").notNullable();
      tbl.timestamp("date").notNullable();
      tbl
        .integer("club_id")
        .unsigned()
        .notNullable()
        .references("club_id")
        .inTable("clubs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("payment_type_id")
        .unsigned()
        .notNullable()
        .references("payment_type_id")
        .inTable("payment_types")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("player_payments", (tbl) => {
      tbl.increments("player_payment_id");
      tbl.integer("amount").notNullable();
      tbl.timestamp("date").notNullable();
      tbl
        .integer("player_id")
        .unsigned()
        .notNullable()
        .references("player_id")
        .inTable("players")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("payment_type_id")
        .unsigned()
        .notNullable()
        .references("payment_type_id")
        .inTable("payment_types")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("courts", (tbl) => {
      tbl.increments("court_id");
      tbl.string("court_name").notNullable();
      tbl.integer("opening").notNullable();
      tbl.integer("closing").notNullable();
      tbl.integer("price").notNullable();
      tbl
        .integer("club_id")
        .unsigned()
        .notNullable()
        .references("club_id")
        .inTable("clubs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("indoor_outdoor_id")
        .unsigned()
        .notNullable()
        .references("indoor_outdoor_id")
        .inTable("indoor_outdoor")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("court_type_id")
        .unsigned()
        .notNullable()
        .references("court_type_id")
        .inTable("court_types")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("challenges", (tbl) => {
      tbl.increments("challenge_id");
      tbl.timestamp("event_date").notNullable();
      tbl.integer("time").notNullable();
      tbl.timestamp("date").notNullable();
      tbl.string("message");
      tbl
        .integer("challenger_id")
        .unsigned()
        .notNullable()
        .references("player_id")
        .inTable("players")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("challengee_id")
        .unsigned()
        .notNullable()
        .references("player_id")
        .inTable("players")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("court_id")
        .unsigned()
        .notNullable()
        .references("court_id")
        .inTable("courts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("club_id")
        .unsigned()
        .notNullable()
        .references("club_id")
        .inTable("clubs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("invites", (tbl) => {
      tbl.increments("invite_id");
      tbl.string("status").notNullable().defaultTo("Pending");
      tbl.timestamp("event_date").notNullable();
      tbl.integer("time").notNullable();
      tbl.timestamp("date").notNullable();
      tbl.string("message");
      tbl
        .integer("inviter_id")
        .unsigned()
        .notNullable()
        .references("player_id")
        .inTable("players")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("invitee_id")
        .unsigned()
        .notNullable()
        .references("player_id")
        .inTable("players")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("court_id")
        .unsigned()
        .notNullable()
        .references("court_id")
        .inTable("courts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("club_id")
        .unsigned()
        .notNullable()
        .references("club_id")
        .inTable("clubs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("scores", (tbl) => {
      tbl.increments("score_id");
      tbl.integer("first_set_challenger").notNullable();
      tbl.integer("first_set_challengee").notNullable();
      tbl.integer("second_set_challenger").notNullable();
      tbl.integer("second_set_challengee").notNullable();
      tbl.integer("tie_break_challenger");
      tbl.integer("tie_break_challengee");
      tbl
        .integer("challenge_id")
        .unsigned()
        .notNullable()
        .references("challenge_id")
        .inTable("challenges")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("winner_id")
        .unsigned()
        .notNullable()
        .references("player_id")
        .inTable("players")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("challenger_id")
        .unsigned()
        .notNullable()
        .references("player_id")
        .inTable("players")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("challengee_id")
        .unsigned()
        .notNullable()
        .references("player_id")
        .inTable("players")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("loser_id")
        .unsigned()
        .notNullable()
        .references("challenge_id")
        .inTable("challenges")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("bookings", (tbl) => {
      tbl.increments("booking_id");
      tbl.timestamp("date").notNullable();
      tbl.timestamp("event_date").notNullable();
      tbl.integer("time").notNullable();
      tbl
        .integer("club_id")
        .unsigned()
        .notNullable()
        .references("club_id")
        .inTable("clubs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("court_id")
        .unsigned()
        .notNullable()
        .references("court_id")
        .inTable("courts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("player_cards", (tbl) => {
      tbl.increments("player_card_id");
      tbl.string("name_on_card").notNullable();
      tbl.integer("card_number").notNullable();
      tbl.integer("expiry_month").notNullable();
      tbl.integer("expiry_year").notNullable();
      tbl.integer("cvc").notNullable();
      tbl
        .integer("player_id")
        .unsigned()
        .notNullable()
        .references("player_id")
        .inTable("players")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("player_cards")
    .dropTableIfExists("bookings")
    .dropTableIfExists("scores")
    .dropTableIfExists("invites")
    .dropTableIfExists("challenges")
    .dropTableIfExists("courts")
    .dropTableIfExists("player_payments")
    .dropTableIfExists("club_payments")
    .dropTableIfExists("points")
    .dropTableIfExists("players")
    .dropTableIfExists("clubs")
    .dropTableIfExists("districts")
    .dropTableIfExists("payment_types")
    .dropTableIfExists("indoor_outdoor")
    .dropTableIfExists("levels")
    .dropTableIfExists("court_types")
    .dropTableIfExists("genders");
};
