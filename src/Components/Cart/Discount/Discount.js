import React, { useState, useEffect } from 'react'
import './Discount.scss'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscError } from "react-icons/vsc"
import { FiArrowRight } from "react-icons/fi";
import { RiPriceTag3Fill } from "react-icons/ri";
import { db, auth } from '../../Firebase/Firebase';

function Discount({price}) {

    const [discountCode, setDiscountCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [appliedCode, setAppliedCode] = useState(null);
    const [discountEntered, setDiscountEntered] = useState(false);

    // Functions

    useEffect(() => {
      let value = appliedCode ? Number(discount) : 0;
      if(auth.currentUser) {
        db.collection("discountCodes").doc("codes").collection("appliedCodes").doc(`${auth.currentUser.uid}`).set({[appliedCode] : value});
      }
    }, [appliedCode])
    
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
        applyDiscountCode();
        }
    }

    const applyDiscountCode = () => {
        setDiscountEntered(true);
        db.collection("discountCodes").doc("codes").get().then(snapshot => {
        Object.keys(snapshot.data()).forEach((code, i) => {
            if(discountCode == code) {
            console.log("applied " + snapshot.data()[code] + "% discount with code " + code + "!");
            setDiscount(snapshot.data()[code]);
            setAppliedCode(discountCode);
            }
        });
        })

        setDiscountCode("");
    }

    const handleRemove = () => {
        setAppliedCode(null);
        setDiscountEntered(false);
        setDiscount(0);
    }

    return (
        <div className="discount">
        <label for="discount">Apply Discount Code (optional)</label>
        {appliedCode ? 
            <div className="discount__field">
                <input type="text" id="discount" placeholder="Enter code" value={appliedCode} readonly={true} onChange={e => setDiscountCode(e.target.value)} onKeyPress={handleKeyPress}/> 
                <h4 onClick={handleRemove}>Remove</h4>
            </div> :
            <div className="discount__field">
                <input type="text" id="discount" placeholder="Enter code" value={discountCode} readonly={true} onChange={e => setDiscountCode(e.target.value)} onKeyPress={handleKeyPress}/> 
                <FiArrowRight className="discount__arrow" onClick={applyDiscountCode}/>
            </div>
        }
        {
          discountEntered ? 
          (
              discount != 0 ? 
              (
                <div className="discount__message">
                  <div className="discount__msg-title">
                    <IoMdCheckmarkCircleOutline color="green" size="2em"/>
                    <h4>Coupon Code Applied!</h4>
                  </div>
                  <p>You saved ${price * (discount/100)}!</p>
                </div>
              ) : 
              (
                <div className="discount__message">
                  <div className="discount__msg-title">
                    <VscError color="#eb5e55" size="2em"/>
                    <h4>The coupon code is invalid. Please try again.</h4>
                  </div>
                </div>
              )
            ) : null
        }
      </div>
    )
}

export default Discount
