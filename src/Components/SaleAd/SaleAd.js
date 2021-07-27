import React from 'react'
import './SaleAd.scss'
import { motion } from 'framer-motion'

function SaleAd() {
    return (
        <div className="salead">
            <div className="salead__content">
                <h1>BLACK FRIDAY SALE</h1>
                <p>Up to 80% discount!</p>
                <motion.button className="salead__cta" type="text" whileHover={{scale: 1.1}} whileTap={{scale: 1}}>Start Buying!</motion.button>
            </div>
        </div>
    )
}

export default SaleAd
