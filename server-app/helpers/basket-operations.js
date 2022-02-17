import { readRecordById, updateRecordById, findRecords } from './crud.js'
import { ERRORS } from './errors.js'
import {ObjectID} from "mongodb";

/**
 * Returns Basket with mapped Products data.
 */
const readByBasketId = async (db, basketId) => {
  const result = getOrUpdateProductsStock(db, basketId);

  return result;
}

/**
 * Updates products in basket based on user actions - order basket/ save basket data
 */
const updateByBasketId = async (db, basketId, basket) => {

  let result;
  let status;

  if(basket.placeOrder === true){
    // update products stockLevel based on new order
    result = await getOrUpdateProductsStock(db, basketId, basket, 'updateProducts');
    status = 'FINISHED';
  } else {
    result = await getOrUpdateProductsStock(db, basketId, basket);
    status = 'UPDATED';
  }
  result.basket && (result.basket.status = status);

  // If Data Error do not update DB
  if(!result.errors.length){

    if(status === 'FINISHED' && result.productsToUpdate.length) {
      await updateProducts(db, result.productsToUpdate);
    }
    const newBasket = createBasketObject(result.basket, status);
    const query = {'_id': new ObjectID(newBasket._id)};
    delete newBasket._id;
    await updateRecordById(db, 'basket', query, newBasket);
  }

  return result;
}

/**
 * Updates all Products with the new data
 */
const updateProducts = async (db, products) =>{
  let productPromises = [];
  for (const product of products) {
    const query = {_id: product._id};
    delete product._id;
    productPromises.push(updateRecordById(db,'products',query, product));
  }
  const results = await Promise.all(productPromises);
  return results;
}


/**
 * Creates Basket Object based on given
 */
const createBasketObject = (old, status) =>{
  const newProducts = old.products.map(item => ({ _id: item._id, quantity: item.quantity }));
  const newBasket = {
    _id: old._id,
    status: status,
    title: old.title || 'New',
    products: newProducts
  }
  return newBasket;
}

/**
 * Builds new error/basket object.
 */
const getOrUpdateProductsStock = async (db, basketId, userBasket = null, type = '') => {

  const { products, basket } = await readBasketProducts(db, basketId, userBasket);
  const basketProducts = basket.products;

  let dataProducts = [];
  let updatedProducts = [];
  let errorMessages = [];

  while(await products.hasNext()) {
    const product = await products.next();
    const  bProducts = basketProducts.filter(pr => {
      return pr._id.toString() === product._id.toString();
    });

    if(!bProducts.length) {
      errorMessages.push(ERRORS.NOT_FOUND());
      continue;
    }

    const basketProduct = bProducts[0];

    if (product.stockLevel === 0){
      errorMessages.push(ERRORS.OUT_OF_STOCK(product));
    }

    let currentProduct = product;
    if(product.stockLevel >= basketProduct.quantity){
      if(type === 'updateProducts') {
        const newStock = product.stockLevel - basketProduct.quantity;
        currentProduct = {...product, stockLevel: newStock };
        updatedProducts.push(currentProduct);
      }
    } else {
      errorMessages.push(ERRORS.LOW_STOCK(currentProduct));
    }
    dataProducts.push({...basketProduct,...currentProduct});
  }

return { errors: errorMessages,  basket: {...basket, products: dataProducts }, productsToUpdate: updatedProducts };
}

/**
 * Returns basket and product objects by BasketId
 */
const readBasketProducts = async (db, basketId, userBasket) => {

  let basket = userBasket;
  let product_ids = [];
  if(!basket) {
    basket = await readRecordById(db, 'basket', basketId);
    product_ids = basket.products.map(item =>item._id);
  } else if(userBasket.products) {
    product_ids = userBasket.products.map(item => new ObjectID(item._id));
  }

  if(!basket){
    return {};
  }

  //read all products from basket
  const query = {_id: {$in: product_ids}};
  const products = await findRecords(db, 'products', query);

  return { products, basket };
}

export {  readByBasketId, updateByBasketId };