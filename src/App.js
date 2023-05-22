import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import NewTraining from "./NewTraining";
import TrainInvite from "./TrainInvite";
import AllRequests from "./AllRequests";
import TrainInviteBooking from "./TrainInviteBooking";
import MatchInviteBooking from "./MatchInviteBooking";
import Calendar from "./Calendar";
import LeaderboardFull from "./LeaderboardFull";
import NewMatch from "./NewMatch";
import MatchInvite from "./MatchInvite";
import Scores from "./Scores";
import Account from "./Account";
import ScoreForm from "./ScoreForm";
import Payments from "./Payments";
import Landing from "./Landing";
import LoginInitial from "./LoginInitial";
import RegisterInitial from "./RegisterInitial";
import Courts from "./Courts";
import ClubAccount from "./ClubAccount";
import ClubPaymentHistory from "./ClubPaymentHistory";
import ClubReservations from "./ClubReservations";
import PrivateRoutes from "./PrivateRoutes";
import ClubMain from "./ClubMain";
import TrainAllPlayers from "./TrainAllPlayers";
import ManagePlayerCard from "./ManagePlayerCard";
import AddPlayerCard from "./AddPlayerCard";
import AllEvents from "./AllEvents";
import EditCourt from "./EditCourt";
function App() {
  return (
    <div className="max-w-5xl mx-auto">
      <Header />
      <Routes>
        <Route path="/intro" element={<Landing />} />
        <Route path="/register" element={<RegisterInitial />} />
        <Route path="/login" element={<LoginInitial />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path="/" element={<Main />} />
          <Route path="/train" element={<NewTraining />} />
          <Route path="/match" element={<NewMatch />} />
          <Route path="/invite" element={<TrainInvite />} />
          <Route path="/train-all-players" element={<TrainAllPlayers />} />
          <Route path="/challenge" element={<MatchInvite />} />
          <Route path="/requests" element={<AllRequests />} />
          <Route
            path="/invite-booking/:invite_id"
            element={<TrainInviteBooking />}
          />
          <Route path="/challenge-booking" element={<MatchInviteBooking />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/leaderboard" element={<LeaderboardFull />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/score" element={<ScoreForm />} />
          <Route path="/account" element={<Account />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/club-dashboard" element={<ClubMain />} />
          <Route path="/club-courts" element={<Courts />} />
          <Route path="/club-account" element={<ClubAccount />} />
          <Route path="/club-payments" element={<ClubPaymentHistory />} />
          <Route path="/club-calendar" element={<ClubReservations />} />
          <Route path="/manage-player-card" element={<ManagePlayerCard />} />
          <Route path="/add-player-card" element={<AddPlayerCard />} />
          <Route path="/all-events" element={<AllEvents />} />
          <Route path="/edit-court/:court_id" element={<EditCourt />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
