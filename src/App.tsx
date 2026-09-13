import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChooseTrainPage from './pages/ChooseTrainPage';
import ChooseSeatsPage from './pages/ChooseSeatsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/choose-train" element={<ChooseTrainPage />} />
        <Route path="/choose-seats" element={<ChooseSeatsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
