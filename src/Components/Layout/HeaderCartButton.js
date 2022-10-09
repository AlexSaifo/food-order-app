import { useContext, useState, useEffect } from 'react';
import CartIcon from '../Cart/CartIcon ';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../Store/CartContext';


const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    const [btnIsHilghLighted, setBtnIsHilghLighted] = useState(false)
    const { items } = cartCtx;
    const btnClasses = `${classes.button} ${btnIsHilghLighted ? classes.bump : ''}`;

    const numberOfCartItems = cartCtx.items.reduce((curNumb, item) => {
        return curNumb + item.amount
    }, 0)


    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHilghLighted(true);
        const timer = setTimeout(() => {
            setBtnIsHilghLighted(false);
        }, 210)

        return ()=>{
            clearTimeout(timer)
        }
    }, [items])


    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.count}>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;