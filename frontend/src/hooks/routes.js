const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signup: () => [apiPath, 'signup'].join('/'),
};

export default routes;
