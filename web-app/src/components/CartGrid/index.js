import {useEffect, useMemo, useState, useCallback} from "react";
import * as Icons from "../Icons";
import {Grid, Row, Col, ButtonWrapperBuy} from './styled.js'
import QuantityButton from '../QuantityButton'
import { getBasket, saveBasket, submitOrder} from '../../api'
import {curretBasket_id} from '../../_config_basket.js'
import Button from "../Button";
import { toast } from 'react-toastify';

import _clone from 'lodash/cloneDeep';


export default function CartGrid(props) {
  const { onCartUpdates } = props
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [originBasket, setOriginBasket] = useState({});

  useEffect(() => {
    (async () => {
      const result = await getBasket(curretBasket_id);
      const data = await result.json();
      const basket = data?.basket;
      const productsData = basket?.products;
      basket?.errors?.forEach((err,idx) => {
        toast.error(err.error,{id: idx});
      })
      setProducts(productsData);
      setOriginBasket(_clone(data?.basket));
      setIsLoading(false);
    })();

    window.onbeforeunload = function(e) {
      // Not all browsers support this feature
      // Autosave can be implemented
      return 'Save basket before leaving this page';
  };

  }, []);


  // On product Quantity change update products object
  const onChange = useCallback((value, id)=>{
    let newProducts = [...products];

    const changedProduct = newProducts.filter(product => product._id === id);
    changedProduct && (changedProduct[0].quantity = value);
    setProducts(newProducts);
  },[products]);

  // On product Quantity change calculate new subtotal, vat, total
  const calculation = useMemo(() => {
    const subtotal = products.reduce((prev, product) => prev + product.price*product.quantity, 0)
    const vat = (subtotal*0.2);
    const calc = {
      subtotal: subtotal.toFixed(2),
      vat: vat.toFixed(2),
      total: (subtotal + vat).toFixed(2),
    }
    return calc;
  }, [products]);


  // On submit Order saves new basket to DB, update products stocklevel
  const onSubmitOrder = useCallback(async() =>{
    const newBasket = {...originBasket, products: products, placeOrder: true }
    const result = await submitOrder(newBasket._id, newBasket);
    const data = await result.json();
    if(!data.errors?.length){
      toast.success('Your order was successfully placed and is waiting to be processed');
      onCartUpdates();
    } else {
      data.errors.forEach((err,idx) => {
        toast.error(err.error,{id: idx});
      });
    }

    },[products])


  // On save Order saves new basket to DB
  const onSaveCart = useCallback(async() =>{
    const newBasket = {...originBasket, products: products }
    const result = await saveBasket(newBasket._id, newBasket);
    const data = await result.json();
    if(!data.errors?.length){
      toast.success('Your basket was successfully saved!');
    }else {
      data.errors.forEach((err,idx) => {
        toast.error(err.error,{id: idx});
      });
    }
  },[products])

  // On product remove from cart
  const onRemoveProduct = searchId => async id => {
    const newProducts = products.filter(product => product._id!== searchId);
    setProducts([...newProducts]);
};

  return  isLoading ?
      <div>Data is loading...</div>
      :
      <Grid>
      <Row  style={{fontWeight: 'bold'}}>
        <Col size={5} style={{textAlign: 'left'}}>Product</Col>
        <Col size={5}>Price</Col>
        <Col size={5}>Quantity</Col>
        <Col size={5} style={{textAlign: 'right'}} >Cost</Col>
        <Col size={5}></Col>
      </Row>
      {products.map(product => (
        <Row key={product._id}>
          <Col size={5}  style={{textAlign: 'left'}}> {product.name}, {product.size ? product.size : 'one size' } </Col>
          <Col size={5} > £{product.price} </Col>
          <Col size={5}>
            <QuantityButton
              quantity={product.quantity}
              key={product._id}
              id={product._id}
              onAction={onChange}
              max={product.stockLevel}
              />
           </Col>
          <Col size={5} style={{textAlign: 'right'}}> £{(product.quantity*product.price).toFixed(2)} </Col>
          <Col size={5}> <Button name={<Icons.Bin/>} onAction={onRemoveProduct(product._id)} />  </Col>
        </Row>
    ))}
      <Row>
        <Col size={1} style={{textAlign: 'left'}}>Subtotal</Col>
        <Col size={2}></Col>
        <Col size={1} style={{textAlign: 'right'}}>£{calculation.subtotal}</Col>
        <Col size={1}>
        </Col>
      </Row>
      <Row>
        <Col size={1} style={{textAlign: 'left'}}>VAT at 20%</Col>
        <Col size={2}></Col>
        <Col size={1} style={{textAlign: 'right'}}>£{calculation.vat}</Col>
        <Col size={1}></Col>
      </Row>
      <Row>
        <Col size={1} style={{textAlign: 'left'}}>Total cost</Col>
        <Col size={2}></Col>
        <Col size={1} style={{textAlign: 'right'}}>£{calculation.total}</Col>
        <Col size={1}></Col>
      </Row>
      <Row>
        <Col size={2}></Col>
        <Col size={1}></Col>
        <Col size={1} style={{justifyContent: 'end',display: 'flex'}}>
          <ButtonWrapperBuy className='square-button' disabled={!products.length} name="BUY NOW" onAction={onSubmitOrder} />
        </Col>
        <Col size={1}>
          <ButtonWrapperBuy className='square-button' disabled={!products.length} name="SAVE CART" onAction={onSaveCart} />
        </Col>
      </Row>
    </Grid>;
}
