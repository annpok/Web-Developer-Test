const CURRENT_ENVIRONMENT = 'dev';

const config = {
  dev: {
    url: 'http://localhost:8000/basket/',
  },
  prod: {
    url: 'http://localhost:8000/basket/',  // change after deployment
  }
}

config.getCurrent = () => {
  const environment = CURRENT_ENVIRONMENT.toLowerCase();
  return config[environment];
}

export default config;

