import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePoll from './pages/CreatePoll';
import PollDetails from './components/PollDetails';
import '../src/index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePoll />} />
      <Route path="/poll/:id" element={<PollDetails />} />
    </Routes>
  );
}

export default App;
