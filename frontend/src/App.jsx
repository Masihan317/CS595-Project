import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DifficultyPage from './pages/DifficultyPage';
import Chatbot from './pages/Chatbot';
import Flashcards from './pages/Flashcards';
import Summarization from './pages/Summarization';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/difficulty" element={<DifficultyPage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/summarization" element={<Summarization />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
