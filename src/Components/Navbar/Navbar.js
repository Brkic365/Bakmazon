import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { db, auth } from "../Firebase/Firebase";
import { BiExit, BiMenuAltLeft } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSearch, FaUserAlt, FaUserPlus } from "react-icons/fa";
import cart from "../../imgs/cart.svg";
import CartDropdown from "../CartDropdown/CartDropdown";
import { motion } from "framer-motion";
import AccountDropdown from "../AccountDropdown/AccountDropdown";

function Navbar() {
  // States

  const [itemCount, setItemCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [displayCartDropdown, setDisplayCartDropdown] = useState(false);
  const [displayAccDropdown, setDisplayAccDropdown] = useState(false);
  const [username, setUsername] = useState([]);
  const [pfpUrl, setPfpUrl] = useState(null);

  // Functions

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && user.displayName) {
        setUsername(user.displayName.split(' '));
        console.log(user.displayName);

        db.collection("pfps").doc(`${auth.currentUser.uid}`).get().then((snapshot) => {
          setPfpUrl(snapshot.data() ? snapshot.data()["pfp"] : null);
        })
      } else {
        setUsername([]);
        console.log("User logged out");
      }
    });
  }, [])

  useEffect(() => {
    if(auth.currentUser) {
      db.collection("cart").doc(`${auth.currentUser.uid}`).onSnapshot(snapshot => {
        if(snapshot.data()){
          console.log("here");
          if(Object.values(snapshot.data()).length > 0){
            setItemCount(Object.values(snapshot.data()).reduce((a, b) => a + b));
          }else {
            setItemCount(0);
          }
          console.log(itemCount);
        }
      })
    }
  }, [auth.currentUser]);

  // Variants

  const dropdownVariants = {
    open: { opacity: 1, x: 0, display: "flex" },
    closed: { opacity: 0, x: "100%", display: "none" }
  };

  const mobileMenuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0.5, x: "-100%" },
  };

  return (
    <div className="navbar">
      <nav>
        <BiMenuAltLeft className="navbar__menu" onClick={() => setMobileMenuOpen(true)}/>
        <Link to="/" className="navbar__logo-link"><h1 className="navbar__logo">BAKMAZON</h1></Link>

        <motion.ul className="navbar__list-mobile" animate={mobileMenuOpen ? "open" : "closed"} transition={{duration: 0.5}} variants={mobileMenuVariants}>
            <BiExit className="navbar__mobile-menu-exit" onClick={() => setMobileMenuOpen(false)}/>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/store">STORE</Link></li>
            <li><Link to="/sell">SELL</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
            <li><Link to="/register">REGISTER</Link></li>
            <li><Link to="/login">LOG IN</Link></li>
          </motion.ul>

        <ul className="navbar__list">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/store">STORE</Link></li>
          <li><Link to="/sell">SELL</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>

        <SearchBar className="navbar__searchbar" />

        <div className="navbar__icons">

            {
              username.length > 1 ? 
              <div className="navbar__user-and-dropdown" onMouseLeave={() => setDisplayAccDropdown(false)}>
                <Link className="navbar__user" onMouseEnter={() => setDisplayAccDropdown(true)} to="/account">
                  <p className="navbar__username">{username[0]} <br/> {username[1]}</p>
                  {
                    pfpUrl ? <img src={pfpUrl} className="navbar__user-img" style={{borderRadius: "50%", border: "1px solid lightgray"}}/>
                    : <FaUserAlt className="navbar__user-img"/>
                  }  
                  <IoMdArrowDropdown  className="navbar__user-dropicon"/>
                </Link>  
              
                <motion.div className="navbar__dropdown"
                  animate={displayAccDropdown ? "open" : "closed"} variants={dropdownVariants}>
                  <AccountDropdown />
                </motion.div>
              </div>
              :
              <div className="navbar__user">
                <Link to="/login" className="navbar__user-link"><FaUserPlus className="navbar__user-img navbar__user-img-plus"/></Link>  
              </div> 
            }       
          
      
          <FaSearch className="navbar__search"/>

          <div className="navbar__cart-and-dropdown" onMouseLeave={() => setDisplayCartDropdown(false)}>
            <Link to="/cart" className="navbar__cart-link" onMouseEnter={() => setDisplayCartDropdown(true)}>
              <div className="navbar__cart">
                <img src={cart} alt="cart" className="navbar__cart-img"/>
                <p className="navbar__cart-num">{itemCount}</p>
                <IoMdArrowDropdown className="navbar__cart-dropicon"/>
              </div>
            </Link>

            <motion.div className="navbar__dropdown"
            animate={displayCartDropdown ? "open" : "closed"} variants={dropdownVariants}>
              <CartDropdown />
            </motion.div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
