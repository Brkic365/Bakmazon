import React, { useEffect , useState} from 'react'
import './Home.scss'
import Trending from '../Trending/Trending';
import {Carousel} from 'react-bootstrap';
import PopularCategories from '../PopularCategories/PopularCategories';
import SaleAd from '../SaleAd/SaleAd';
import { motion } from 'framer-motion';
import { db } from '../Firebase/Firebase';
import {Link} from 'react-router-dom';

function Home() {

    // States
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [products, setProducts] = useState([]);

    useEffect(() => {
      db.collection('products').orderBy('orders', 'desc').limit(5).onSnapshot(snapshot => {
        setProducts(snapshot.docs.map(doc => ({
          id: doc.id,
          product: {...doc.data(), ...{id: doc.id}}
        })))
      })
    }, [])

    return (
      <div className="home">
      <div className="header">
        <div className="content">
          <h1>Buy Best Products From All Of The World</h1>
          <p>All Of The Newest Trends And Everything You Need In One Place</p>
          <div className="buttons">
            <Link to="/store"><motion.button className="btn1" whileHover={{scale: 1.05}} whileTap={{scale:0.95}}>Explore</motion.button></Link>
            <Link to="/login"><motion.button className="btn2" whileHover={{scale: 1.05}} whileTap={{scale:0.95}}>Sign Up</motion.button></Link>
          </div>
        </div>
        <div className="image">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
            alt="Header"
          />
        </div>
      </div>
      <PopularCategories />
      <SaleAd />
    </div>
    );
}

export default Home
