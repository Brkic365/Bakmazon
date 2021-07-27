import React, { useState, useEffect } from 'react'
import StoreItems from '../StoreItems/StoreItems'
import { auth, db } from '../Firebase/Firebase'
import "./Search.scss";


function Search() {

    // States

    const [search, setSearch] = useState("");

    // Functions

    // Retrieves user search from database
    useEffect(() => {
        db.collection("search").doc(`${auth.currentUser?.uid}`).onSnapshot(snapshot => {
            try {
                let obj = snapshot.data();
                setSearch(obj[Object.keys(obj)[Object.keys(obj).length-1]]);
            } catch {
                setSearch("");
            }
        })
        console.log("Search is: " + search);
    }, [])
    
    return (
        <div class="search">
            <StoreItems search={search} />
        </div>
    )
}

export default Search