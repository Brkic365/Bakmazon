import React, { useState } from 'react'
import './ChatPopup.scss'
import { BsChatFill } from "react-icons/bs"
import { motion } from 'framer-motion'
import CustomInput from '../CustomInput/CustomInput'
import { FaRegWindowMinimize } from "react-icons/fa"

function ChatPopup() {

    // States

    const [chatOpened, setChatOpened] = useState(false);

    // Variants

    const chatVariants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "300%" },
    };

    return (
        <div className="chat">
            <motion.div className="chat__minimized" 
                animate={chatOpened ? "closed" : "open"} 
                variants={chatVariants}
                whileHover={{scale: 1.1}} 
                whileTap={{scale: 0.9}} 
                onClick={() => setChatOpened(true)}
            >
                <BsChatFill className="chat__img"/>
                <h1 className="chat__title">Chat</h1>
            </motion.div>

            <motion.div className="chat__menu" animate={chatOpened ? "open" : "closed"} variants={chatVariants}>
                <div className="chat__menu-title">
                    <h1>Chat with us</h1>  
                    <FaRegWindowMinimize className="chat__menu-minimize" onClick={() => setChatOpened(false)}/>
                </div>
                <div className="chat__menu-content">
                    <CustomInput names="Name (optional)"/>
                    <CustomInput names="Email (optional)"/>
                    <div className="chat__menu-msg">
                        <label htmlFor="msg">Message</label>
                        <textarea name="text" id="msg" cols="30" rows="10"></textarea>
                    </div>

                    <button type="submit" className="chat__menu-submit">Submit</button>
                </div>
            </motion.div>
        </div>
    )
}

export default ChatPopup
