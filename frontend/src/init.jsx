import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App';
import ru from './locales/ru.js';
import store from './slices/index.js';
import socketConfigure from './socketConfigure.js';
import { ApiContext } from './contexts/index.jsx';

const ApiProvider = ({ socket, children }) => {
  const socketData = socketConfigure(socket);
  return (
    <ApiContext.Provider value={socketData}>
      {children}
    </ApiContext.Provider>
  );
};
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
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <ApiProvider socket={socket}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ApiProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
