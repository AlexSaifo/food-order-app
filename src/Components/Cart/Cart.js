import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartContext from '../../Store/CartContext';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [didSubmit, setdidSubmit] = useState(false);

    const ctxContext = useContext(CartContext);
    const totalAmount = `$${ctxContext.totalAmount.toFixed(2)}`;
    const hasItems = ctxContext.items.length > 0 ? true : false;

    const cartItemRemoveHandler = (id) => {
        ctxContext.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        ctxContext.addItem({ ...item, amount: 1 });
    };

    const orderHandler = (event) => {
        event.preventDefault();
        setIsCheckout(true)
    }
    const submitOrderHanler = async (userData) => {
        setIsSubmiting(true)
        const Response = await fetch('https://react-http-a7870-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                userData,
                orderedItems: ctxContext.items,
                totalAmount: ctxContext.totalAmount.toFixed(2),
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        })
        setIsSubmiting(false);
        setdidSubmit(true);
        ctxContext.clearItems();
    }


    const cartItems = <ul className={classes['cart-items']}>
        {ctxContext.items.map(item =>
            <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                item={item}
                onAdd={cartItemAddHandler}
                onRemove={cartItemRemoveHandler} />
        )}
    </ul>
    const CartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && hasItems && <Checkout onCancel={props.onCartHide} onConfirm={submitOrderHanler} />}
            {
                (!isCheckout || !hasItems) &&
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onCartHide}>Close</button>
                    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
                </div>
            }
        </React.Fragment>
    );
    const isSubmitingModalContent = <p>Sending order data ...</p>
    const didSubmitgModalContent = (
        <React.Fragment>
            <p>Successfully sent the order :)</p>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCartHide}>Close</button>
            </div>
        </React.Fragment>
    )


    return (
        <Modal onClose={props.onCartHide}>
            {!isSubmiting && !didSubmit && CartModalContent}
            {isSubmiting && isSubmitingModalContent}
            {!isSubmiting && didSubmit && didSubmitgModalContent}
        </Modal>
    );
}

export default Cart;