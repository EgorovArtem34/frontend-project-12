import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App';
import ru from './locales/ru.js';
import socketConfigure from './components/socketConfigure.jsx';
import { SocketContext } from './contexts/index.jsx';

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      lng: 'ru',
      fallbackLng: 'ru',
    });
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };
  leoProfanity.add(leoProfanity.getDictionary('ru'));
  const SocketProvider = ({ children }) => {
    const socketData = socketConfigure(socket);
    return (
      <SocketContext.Provider value={socketData}>
        {children}
      </SocketContext.Provider>
    );
  };
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <SocketProvider>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </SocketProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
