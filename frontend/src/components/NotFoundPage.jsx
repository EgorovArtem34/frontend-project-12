import { useTranslation } from 'react-i18next';
import logo from '../assets/notFound.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img src={logo} className="img-fluid h-25" alt={t('notFound.header')} />
      <h1 className="h4 text-muted">{t('notFound.header')}</h1>
      <p className="text-muted">
        {t('notFound.canMove')}
        {' '}
        <a href="/">{t('notFound.link')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
