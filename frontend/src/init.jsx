import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import ru from './locales/ru.js';
import socketConfigure from './components/socketConfigure.jsx';
import contexts from './contexts/index.jsx';

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      lng: 'ru',
      fallbackLng: 'ru',
    });

  const SocketProvider = ({ children }) => {
    const socketData = socketConfigure(socket);
    const { SocketContext } = contexts;
    return (
      <SocketContext.Provider value={socketData}>
        {children}
      </SocketContext.Provider>
    );
  };

  return (
    <SocketProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </SocketProvider>
  );
};

export default init;
