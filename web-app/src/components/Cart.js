import React, {useState} from "react";
import CartGrid from  "../components/CartGrid";
import CartHeader from  "../components/CartHeader";


export default function Cart() {

  const [orderInProgress, setOrderInProgress] = useState(true);

  return ( !orderInProgress ?
        <CartHeader
          title='Your Basket'
          description='Thank you for your order!'
        />
        :
        <>
        <CartHeader
          title='Your Basket'
          description='Items you have added to your basket are shown below. Adjust the quantities or remove items before continuing purchase.'
        />
        <CartGrid
        onCartUpdates={() => setOrderInProgress(false)}
        />
        </>
  )
}



