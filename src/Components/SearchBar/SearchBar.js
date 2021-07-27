import React, {useState} from 'react';
import "./SearchBar.scss";
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { db, auth } from '../Firebase/Firebase';
import firebase from 'firebase';
import Search from '../Search/Search';
import StoreItems from '../StoreItems/StoreItems';

function SearchBar() {

    // States

    const [input, setInput] = useState('');
    const [userSearchDataCollected, setUserSearchDataCollected] = useState(false);

    // Variables

    const history = useHistory();

    // Functions

    const handleChange = (e) => {
        setInput(e.target.value);

        if(e.target.value == ""){
            history.push(`/`);
        }
    }

    const handleSubmit = () => {
        console.log("Searching: " + input)
        search(input);
        setInput('');
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            search(e.target.value);
            setInput('');
        }
    }

    const search = (text) => {

        document.getElementById("text").blur();

        // Saves search to database
        db.collection("search").get().then(snapshot => {

            // Creates user data for search info if not available
            if(snapshot.docs.indexOf(`${auth.currentUser.uid}`) == -1 && !userSearchDataCollected) {
                db.collection("search").doc(`${auth.currentUser.uid}`).set({[firebase.firestore.Timestamp.now().seconds]: `${text}`});
                setUserSearchDataCollected(true);

            // Updates user search data
            } else {
                db.collection("search").doc(`${auth.currentUser.uid}`).update({[firebase.firestore.Timestamp.now().seconds]: `${text}`});
            }
        })

        history.push(`/search/${text}`);
    }

    return (
        <div className="searchbar">
            <input placeholder="Search..." className="searchbar__input" onChange={handleChange} value={input} onKeyPress={handleKeyPress} id="text"/>
            <FiSearch id="button" className={input.length === 0 ? "searchbar__searchicon" : "searchbar__searchicon-enable"} onClick={input.length === 0 ? '' : handleSubmit} stroke={input.length === 0 ? "#C1C1C1" : "black"}/>
        </div>
    )
}

export default SearchBar;
