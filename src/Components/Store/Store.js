import React, { useEffect } from 'react'
import "./Store.scss";
import StoreItems from '../StoreItems/StoreItems';

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
