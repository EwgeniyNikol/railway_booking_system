import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChooseTrainPage from './pages/ChooseTrainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/choose-train" element={<ChooseTrainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
