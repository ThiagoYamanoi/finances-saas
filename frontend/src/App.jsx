import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoutes';
import AllTransactions from './Pages/AllTransactions';

function App() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      <Route
        path="/transactions"
        element={<AllTransactions />}
      />

    </Routes>
  );
}

export default App;