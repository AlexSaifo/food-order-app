import * as React from "react";
import classes from './Checkout.module.css';
const { useRef, useState } = React;


const isNotEmpty = val => val.trim() !== '';
const isFiveChars = val => +val.trim().length === 5


const Checkout = (props) => {

    //Start Hooks
    const [formInputValidation, setFormInputValidation] = useState({
        name: true,
        postal: true,
        street: true,
        city: true,
    })
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    //End Hooks
    function confirmHandler(event) {
        event.preventDefault();
        //Entered Values
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        //Validation
        const enteredNameIsValid = isNotEmpty(enteredName);
        const enteredStreetIsValid = isNotEmpty(enteredStreet);
        const enteredCityIsValid = isNotEmpty(enteredCity);
        const enteredPostalIsValid = isFiveChars(enteredPostal);
        setFormInputValidation({
            name: enteredNameIsValid,
            postal: enteredPostalIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
        })
        //Form Validation
        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPostalIsValid;
        if (!formIsValid)
            return;
        //Send Post Request To FireBase
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            posatlCode:enteredPostal
        });
        //Rest Inputs
        nameInputRef.current.value = '';
        streetInputRef.current.value = '';
        postalInputRef.current.value = '';
        cityInputRef.current.value = '';
    }

    return (
        <form onSubmit={confirmHandler} className={classes['form-control']}>
            <div className={`${classes.control} ${formInputValidation.name ? '' :classes.invalid}`}>
                <label htmlFor="name">Your Name</label>
                <input type='text' id="name" ref={nameInputRef} />
                {!formInputValidation.name && <p>Please Enter a Valid Name ! </p>}
            </div>
            <div className={`${classes.control} ${formInputValidation.street ? '' :classes.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type='text' id="street" ref={streetInputRef} />
                {!formInputValidation.street && <p>Please Enter a Valid Street ! </p>}
            </div>
            <div className={`${classes.control} ${formInputValidation.postal ? '' :classes.invalid}`}>
                <label htmlFor="postal">Postal Code</label>
                <input type='text' id="postal" ref={postalInputRef} />
                {!formInputValidation.postal && <p>Please Enter a Valid Postal Code (5 Characters Long ) ! ! </p>}
            </div>
            <div className={`${classes.control} ${formInputValidation.city ? '' :classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input type='text' id="city" ref={cityInputRef} />
                {!formInputValidation.city && <p>Please Enter a Valid City ! </p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel} className={classes['button--alt']}>Cancel</button>
                <button type="submit" className={classes.button} >Confirm</button>
            </div>
        </form>
    );

}
export default Checkout;