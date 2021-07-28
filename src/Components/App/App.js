import './App.scss';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import Account from '../Account/Account';
import ProductDetails from '../ProductDetails/ProductDetails';

function App() {

  const [links, setLinks] = useState(["/", "/store", "/store", "/cart", "/checkout", "/product/", "/search/", "/sell", "/login", "/register", "/account"]);
  const [components, setComponents] = useState([Home, Sidebar, Store, Cart, Checkout, ProductDetails, Search, SellProduct, Login, Register, Account]);

  useEffect(() => {
    setTimeout(() =>{
      if(!auth.currentUser) {
        firebase.auth().signInAnonymously()
        .then(() => {
          console.log("Signed in anonymusly with uid of " + auth.currentUser.uid);
        })
        .catch((error) => {
          console.log("Cannot sign in.. Error: " + error.message);
        });
      }}, 1000);
  }, [])

  return (
    <Router>
      <div className="app">
        <Navbar />
        {
          links.map((link, index) => (
            <Route path={link} exact={!(link[link.length - 1] == "/" && link.length > 1)} component={components[index]} />
          ))
        }
        <Footer className="app__footer"/>
        <ChatPopup />
      </div>
    </Router>
  )
}

export default App;