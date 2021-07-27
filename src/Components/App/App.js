import './App.scss';
import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import ProductList from '../ProductList/ProductList';
import Catalog from '../Catalog/Catalog';
import Footer from '../Footer/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Store from '../Store/Store';
import Checkout from '../Checkout/Checkout';
import { auth } from '../Firebase/Firebase';
import Cart from '../Cart/Cart';
import Sidebar from '../Sidebar/Sidebar';
import firebase from 'firebase';
import Search from '../Search/Search';
import SellProduct from '../SellProduct/SellProduct';
import ChatPopup from '../ChatPopup/ChatPopup';
import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {

  useEffect(() => {
    if(!auth.currentUser) {
      firebase.auth().signInAnonymously()
      .then(() => {
        console.log("Signed in anonymusly with uid of " + auth.currentUser.uid);
      })
      .catch((error) => {
        console.log("Cannot sign in.. Error: " + error.message);
      });
    }
  }, [])

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/store" exact component={Sidebar} />
        <Route path="/store" exact component={Store} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/checkout" exact component={Checkout}/>
        <Route path="/product/" />
        <Route path="/search/" component={Search} />
        <Route path="/sell" exact component={SellProduct} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Footer className="app__footer"/>
        <ChatPopup />
      </div>
    </Router>
  )
}

export default App;