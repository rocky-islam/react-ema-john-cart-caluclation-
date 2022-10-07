import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Orders = () => {
    const {products, initialCart} = useLoaderData();
    const [cart, setCart] = useState(initialCart);

    // remove item
    const handelRemoveItem = (id) =>{
        // console.log(id);
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
        
    }

    const clearCart = () => {
      setCart([]);
      deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
           <div className='order-container'>
                {
                    cart.map(product => <ReviewItem
                    key={product.id}
                    product={product}
                    handelRemoveItem={handelRemoveItem}
                    ></ReviewItem>)
                }
                {
                    cart.length === 0 && <h2>No items for review. please <Link to='/shop'>Shop</Link></h2>
                }
           </div>
           <div className='cart-container'>
            <Cart 
            clearCart={clearCart}
            cart={cart}></Cart>
           </div>
        </div>
    );
};

export default Orders;