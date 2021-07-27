import React, { useEffect } from 'react'
import Trending from '../Trending/Trending'
import Recent from '../Recent/Recent'
import "./Store.scss";
import StoreItems from '../StoreItems/StoreItems';
import MultiRangeSlider from '../Sidebar/Sidebar';

function Store() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="store">
            <StoreItems/>
        </div>
    )
}

export default Store
