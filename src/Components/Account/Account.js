import React, { useState, useEffect, useRef } from 'react'
import './Account.scss'
import CustomInput from "../CustomInput/CustomInput"
import { Link } from 'react-router-dom'
import { FaPen } from "react-icons/fa"
import { auth, storage, db } from "../Firebase/Firebase"
import defaultPfp from "../../imgs/pfp.svg";

function Account() {

    // States

    const [username, setUsername] = useState("Guest");
    const [email, setEmail] = useState("");
    const [realtimeInfo, setRealtimeInfo] = useState({});
    const [pfp, setPfp] = useState();
    const [pfpUrl, setPfpUrl] = useState(defaultPfp);

    // Refs

    const fileInput = useRef(null);

    // Functions

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user && user.displayName){
                setUsername(user.displayName);
                setEmail(user.email);

                db.collection("pfps").doc(`${auth.currentUser.uid}`).get().then((snapshot) => {
                    setPfpUrl(snapshot.data() ? snapshot.data()["pfp"] : defaultPfp);
                })
            } else {
                setUsername("Guest");
                setEmail("");   
            }
        });
    }, [])

    useEffect(() => {
        if(pfp){
            const uploadTask = storage.ref(`pfps/${pfp.name}`).put(pfp);

            uploadTask.on(
                "state_changed",
                // While uploading
                (snapshot) => {
                    console.log("Uploading image... " + Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100) + "%");
                },
                // Error handling
                (err) => {
                    console.log(err.message);
                    alert("Failed to upload profile picture. Please try again.");
                },
                // Finished
                () => {
                    storage
                        .ref("pfps")
                        .child(pfp.name)
                        .getDownloadURL()
                        .then(url => {
                            db.collection("pfps").doc(`${auth.currentUser.uid}`).set({"pfp": url});
                            setPfpUrl(url);
                        })
                }
            )
        }
    }, [pfp])

    const handlePfpUpdate = (e) => {
        if(e.target.files[0]) {
            setPfp(e.target.files[0]);
        }
    }

    return (
        <div className="acc">
            <div className="acc__links">
                <ul>
                    <li><Link to="/account">My Account</Link></li>
                    <li><Link to="/history">Order History</Link></li>
                </ul>
            </div>
            <div className="acc__content">
                <div className="acc__main-details">
                    <div className="acc__pfp">
                        <img src={pfpUrl} className="acc__pfp-img"/>
                        {
                            auth.currentUser && auth.currentUser.displayName && <p onClick={() => fileInput.current.click()}>Change Profile Picture</p>
                        }
                        <input ref={fileInput} onChange={handlePfpUpdate} type="file" style={{visibility: "hidden", position: "absolute"}}/>
                    </div>
                    <div className="acc__name-and-email">
                        <div className="acc__name">
                            <h1>{username}</h1>
                            <FaPen className="acc__pen-icon"/>
                        </div>
                        <div className="acc__email">
                            <p>{email}</p>
                        </div>
                    </div>
                </div>
                <div className="acc__inputs">
                    <h2>Checkout Details</h2>
                    <CustomInput names={["Phone number (optional)", "ZIP Code"]} parentCallback={(data) => setRealtimeInfo({...realtimeInfo, ...data})}/>
                    <CustomInput names={["Country", "Town/City"]} parentCallback={(data) => setRealtimeInfo({...realtimeInfo, ...data})}/>
                    <CustomInput names="Address" parentCallback={(data) => setRealtimeInfo({...realtimeInfo, ...data})}/>
                    <CustomInput names="Company Name (optional)" parentCallback={(data) => setRealtimeInfo({...realtimeInfo, ...data})}/>
                    <button>UPDATE</button>
                </div>
                <div className="acc__danger-buttons">
                    <button>Log Out</button>
                    <button>Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export default Account
