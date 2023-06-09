/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('../public/images/hero.jpeg')",
        heroTrain: "url('../public/images/training.jpeg')",
        heroRequests: "url('../public/images/requests.jpeg')",
        heroInvite: "url('../public/images/inviteBooking.jpeg')",
        heroCalendar: "url('../public/images/calendar.jpeg')",
        heroLeaderboard: "url('../public/images/leaderboard.jpeg')",
        heroMatch: "url('../public/images/match.jpeg')",
        heroChallenge: "url('../public/images/challengeBooking.jpeg')",
        heroScores: "url('../public/images/scores.jpeg')",
        heroAccount: "url('../public/images/account.jpeg')",
        heroBalance: "url('../public/images/add-balance.jpeg')",
        heroPayments: "url('../public/images/payment-history.jpeg')",
        heroLanding: "url('../public/images/landing.jpeg')",
        heroLogin: "url('../public/images/login.jpeg')",
        heroRegister: "url('../public/images/register.jpeg')",
        heroCourts: "url('../public/images/courts.jpeg')",
        heroClubAccount: "url('../public/images/clubAccount.jpeg')",
        heroClubCalendar: "url('../public/images/clubCalendar.png')",
        heroAllPlayers: "url('../public/images/allPlayers.jpeg')",
        heroAllEvents: "url('../public/images/allEvents.jpeg')",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0%)" },
      },
    },
  },
  plugins: [],
};
