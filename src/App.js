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
import AddBalance from "./AddBalance";
import Payments from "./Payments";
import Landing from "./Landing";
import Login from "./Login";
import RegisterInitial from "./RegisterInitial";
import Courts from "./Courts";
import ClubAccount from "./ClubAccount";
import ClubPaymentHistory from "./ClubPaymentHistory";
import ClubReservations from "./ClubReservations";
function App() {
  return (
    <div className="max-w-5xl mx-auto">
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/train" element={<NewTraining />} />
        <Route path="/match" element={<NewMatch />} />
        <Route path="/invite" element={<TrainInvite />} />
        <Route path="/challenge" element={<MatchInvite />} />
        <Route path="/requests" element={<AllRequests />} />
        <Route path="/invite-booking" element={<TrainInviteBooking />} />
        <Route path="/challenge-booking" element={<MatchInviteBooking />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/leaderboard" element={<LeaderboardFull />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/score" element={<ScoreForm />} />
        <Route path="/account" element={<Account />} />
        <Route path="/add-balance" element={<AddBalance />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/intro" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterInitial />} />
        <Route path="/club-courts" element={<Courts />} />
        <Route path="/club-account" element={<ClubAccount />} />
        <Route path="/club-payments" element={<ClubPaymentHistory />} />
        <Route path="/club-calendar" element={<ClubReservations />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
