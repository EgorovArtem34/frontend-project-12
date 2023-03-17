import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
import NotFoundPage from './components/NotFoundPage';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="h-100">
          <div className="h-100">
            <div className="d-flex flex-column h-100">
              <Navbar bg="white" expand="lg" className="shadow-sm">
                <Container>
                  <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
                  <AuthButton />
                </Container>
              </Navbar>
              <Routes>
                <Route path='/' element={(
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
                )} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
