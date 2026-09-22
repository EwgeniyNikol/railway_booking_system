import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChooseTrainPage from './pages/ChooseTrainPage';
import ChooseSeatsPage from './pages/ChooseSeatsPage';
import PassengersPage from './pages/PassengersPage';
import PaymentPage from './pages/PaymentPage';
import OrderPage from './pages/OrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/choose-train" element={<ChooseTrainPage />} />
        <Route path="/choose-seats" element={<ChooseSeatsPage />} />
        <Route path="/passengers" element={<PassengersPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;