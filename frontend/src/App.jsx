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
import { Button, Navbar, Container } from 'react-bootstrap';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import store from './slices/index.js';
import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
import NotFoundPage from './components/NotFoundPage';
import ru from './locales/ru.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('user'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const AuthProvider = ({ children }) => {
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
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : null
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      lng: 'ru',
    });

  return (
    <Provider store={store}>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
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
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </Router>
        </I18nextProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
