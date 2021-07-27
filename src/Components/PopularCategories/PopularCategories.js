import React, { useState } from 'react'
import './PopularCategories.scss'
import { motion } from 'framer-motion';

import shoes from "../../imgs/category_imgs/shoes.svg";
import watches from "../../imgs/category_imgs/watches.svg";
import shirts from "../../imgs/category_imgs/shirts.svg";
import jeans from "../../imgs/category_imgs/jeans.svg";
import caps from "../../imgs/category_imgs/caps.svg";
import hoodies from "../../imgs/category_imgs/hoodies.svg";

function PopularCategories() {

    // States

    const [imgs, setImgs] = useState([shoes, watches, shirts, jeans, caps, hoodies]);
    const [imgName, setImgName] = useState(["Shoes", "Watches", "Shirts", "Jeans", "Caps", "Hoodies"])

    return (
        <div className="pop-categories">
        <h1>Popular Categories</h1>
        <div className="pop-categories__imgs">
            {
            imgs.map((img, index) => (
                <div className="pop-categories__category">
                <motion.img src={img} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}/>
                <h2>{imgName[index]}</h2>
                </div>
            ))
            }
        </div>
        </div>
    )
}

export default PopularCategories
