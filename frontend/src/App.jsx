import './App.css';
import React, { useCallback, useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Button, Navbar, Container } from 'react-bootstrap';
import store from './slices/index.js';
import contexts from './contexts/index.jsx';
import hooks from './hooks/index.jsx';
import LoginPage from './components/LoginPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import RegistrationPage from './components/RegistrationPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('user'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const AuthProvider = ({ children }) => {
  const { AuthContext } = contexts;
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(!!currentUser);
  const logIn = useCallback(() => {
    setLoggedIn(true);
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }, []);
  const providerValues = useMemo(
    () => ({
      loggedIn, logIn, logOut, getAuthHeader, currentUser,
    }),
    [loggedIn, logIn, logOut, currentUser],
  );

  return (
    <AuthContext.Provider value={providerValues}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthButton = () => {
  const { useAuth } = hooks;
  const auth = useAuth();
  const handleBtn = () => {
    localStorage.removeItem('user');
    auth.logOut();
  };
  return (
    auth.loggedIn
      ? <Button onClick={handleBtn}>Выйти</Button>
      : null
  );
};

const PrivateRoute = ({ children }) => {
  const { useAuth } = hooks;
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <Provider store={store}>
        <AuthProvider>
          <Router>
            <div className="d-flex flex-column h-100">
              <Navbar bg="white" expand="lg" className="shadow-sm">
                <Container>
                  <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
                  <AuthButton />
                </Container>
              </Navbar>
              <Routes>
                <Route
                  path="/"
                  element={(
                    <PrivateRoute>
                      <ChatPage />
                    </PrivateRoute>
                  )}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegistrationPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </Router>
          <ToastContainer />
        </AuthProvider>
      </Provider>
    </div>
  </div>
);

export default App;
