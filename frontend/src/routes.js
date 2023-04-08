const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signUp: () => [apiPath, 'signup'].join('/'),
  defaultPath: () => '/',
  loginPagePath: () => '/login',
  signUpPagePath: () => '/signup',
  restPath: () => '*',
};

export default routes;
