import React from "react";
import classes from './CartItem.module.css';
export default function CartItem(props) {
    const price = `$${props.price.toFixed(2)}`
    return(
        <li id={props.id} className={classes['cart-item']}>
            <div>
                <h2>{props.name}</h2>
                <div className={classes.summary}>
                    <div className={classes.price}> {price}</div>
                    <div className={classes.amount}>x{props.amount}</div>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onRemove.bind(null,props.id)}>-</button>
                <button onClick={props.onAdd.bind(null,props.item)}>+</button>
            </div>
        </li>
    );
}