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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AuthContext } from './contexts/index.jsx';
import { useAuth } from './hooks/index.jsx';
import LoginPage from './components/LoginPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import routes from './hooks/routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('user'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);
  const providerValues = useMemo(
    () => ({
      user, logIn, logOut, getAuthHeader,
    }),
    [user, logIn, logOut],
  );

  return (
    <AuthContext.Provider value={providerValues}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const handleBtn = () => {
    auth.logOut();
  };
  return (
    auth.user
      ? <Button onClick={handleBtn}>{t('logOut')}</Button>
      : null
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.user ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const { t } = useTranslation();
  return (
    <div className="vh-100" id="chat">
      <AuthProvider>
        <Router>
          <div className="d-flex flex-column h-100">
            <Navbar bg="white" expand="lg" className="shadow-sm">
              <Container>
                <Navbar.Brand as={Link} to="/">{t('hexletChat')}</Navbar.Brand>
                <AuthButton />
              </Container>
            </Navbar>
            <Routes>
              <Route
                path={routes.defaultPath()}
                element={(
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
                )}
              />
              <Route path={routes.loginPagePath()} element={<LoginPage />} />
              <Route path={routes.signUpPagePath()} element={<SignUpPage />} />
              <Route path={routes.restPath()} element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </AuthProvider>
    </div>
  );
};

export default App;
