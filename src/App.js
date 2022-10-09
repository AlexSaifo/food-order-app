import logo from './logo.svg';
import './App.css';
import { Fragment , useState   } from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';

 function App() {
  const [cartIsShown , setCartIsShown] =useState(false);
  
  const showCartHandler=()=>{
    setCartIsShown(true);
  }

  const hideCartHandler=()=>{
    setCartIsShown(false);
  }

  return (
    <Fragment>
      { cartIsShown && <Cart onCartHide={hideCartHandler}/>}
      <Header onCartShow={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </Fragment>
  );
}

export default App;