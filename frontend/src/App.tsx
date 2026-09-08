import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import InspectionDashboard from "./pages/InspectionDashboard";
import InspectionReport from "./pages/InspectionReport";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* ================================================= */}
        {/* Public routes */}
        {/* ================================================= */}

        <Route
          path="/login"
          element={
            <Login />
          }
        />


        <Route
          path="/register"
          element={
            <Register />
          }
        />


        {/* ================================================= */}
        {/* Protected routes */}
        {/* ================================================= */}

        <Route
          element={
            <ProtectedRoute />
          }
        >

          <Route
            path="/"
            element={
              <InspectionDashboard />
            }
          />


          <Route
            path="/inspections/:id/report"
            element={
              <InspectionReport />
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}


export default App;