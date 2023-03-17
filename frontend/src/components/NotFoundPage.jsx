import logo from '../assets/notFound.svg';

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <img src={logo} className="img-fluid h-25" alt="Страница не найдена" />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти
        {' '}
        <a href="/">на главную страницу</a>
      </p>
    </div>
  )
};

export default NotFoundPage;