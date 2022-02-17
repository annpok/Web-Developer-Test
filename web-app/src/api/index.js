import config from './config'
const url = config.getCurrent().url;

const executeRequest = async (requestUrl, method, body=null) => {
  const headers = {
     Authenticate: `user-token-id`,
    'Content-Type': 'application/json',
  };
  const payload  = { method, headers}
  body && (payload.body=JSON.stringify(body));
  return fetch(requestUrl, payload);
};

const getBasketList = () => {
  return executeRequest(url, 'GET');
};

const getBasket = id => {
  return executeRequest(`${url}${id}`,'GET');
};

const saveBasket = (id , payload)=> {
  return executeRequest(`${url}${id}`,'PUT', payload);
};

const submitOrder = (basketId, payload) => {
  return executeRequest(`${url}${basketId}`,'PUT', payload);
};


export {
  getBasketList,
  getBasket,
  saveBasket,
  submitOrder
};
