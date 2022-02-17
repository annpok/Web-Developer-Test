import React, { useCallback } from "react";
import Button from '../Button/index.js'
import { toast } from 'react-toastify';
import { QuantityBox } from './styled.js'


export default function QuantityButton(props) {
  const { step = 1, onAction, quantity = 0, id, max = 1, min = 0 } = props;

  const validate  = useCallback((value, valid=true) =>{

    if(!valid){
      return false;
    }

    if (value < min || value % 1 !== 0) {
      toast.error('Please enter valid number or remove item from basket');
      return false;
    }
    if (value > max) {
      toast.error(`Item Stock is low. Available: ${max} items. Please do not add more.`);
      return false;
    }
    return true;
  },[min,max]);

  const updateQuantity = useCallback((event)=> {
    const value = event.target.value;
    const valid = event.target.validity.valid;
    const isValid = validate(value,valid);
    if (isValid && onAction) {
      onAction(value, id);
    }
  },[validate, onAction, id]);

  const decrementCount = useCallback(() => {
    const newValue = quantity - step;
    const isValid = validate(newValue);
    if (isValid && onAction) {
      onAction(newValue, id);
    }
  },[step, onAction,validate, id ]);

  const incrementCount = useCallback(() => {
    const newValue = quantity + step;
    const isValid = validate(newValue);
    if (isValid && onAction) {
      onAction(newValue, id);
    }
  },[step,onAction, validate,id ]);

  return (
    <QuantityBox>
      <Button name={"-"} onAction={decrementCount} />
      <input pattern="[0-9]*" type="text" value={quantity} onChange={updateQuantity} ></input>
      <Button name={"+"} onAction={incrementCount} />
    </QuantityBox>
  );
}
