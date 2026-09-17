import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChooseTrainPage from './pages/ChooseTrainPage';
import ChooseSeatsPage from './pages/ChooseSeatsPage';
import PassengersPage from './pages/PassengersPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/choose-train" element={<ChooseTrainPage />} />
        <Route path="/choose-seats" element={<ChooseSeatsPage />} />
        <Route path="/passengers" element={<PassengersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
