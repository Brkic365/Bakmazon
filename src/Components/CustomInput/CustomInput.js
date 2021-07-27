import React, { useState } from 'react'
import './CustomInput.scss'

function CustomInput({names, isRequired, buttonText, parentCallback}) {

    const inputs = [];
    const max = Array.isArray(names) ? names.length : 1;
    let required = false;

    let text;

    let type = "text";

    const types = {"email": "email", "phone": "tel", "zip": "number", "password" : "password"};


    const handleChange = (text) => (e) => {
        e.preventDefault();
        let object = {};
        object[text] = e.target.value;
        parentCallback(object);
    }


    for(let i = 0; i < max; i++){

        text = Array.isArray(names) ? names[i] : names;
        type = "text";

        required = !text.includes("optional");
        if (isRequired != null)
            required = isRequired;

        for (const [containing_word, typeValue] of Object.entries(types)) {
            if (text.toLowerCase().includes(containing_word))
                type = typeValue;
        }

        inputs.push(<div className="custominput__field">
                        <label>{text}
                                {required ? (
                                    <span style={{color: "#EB5E55"}}> *</span>
                                ): (
                                    null
                                )}</label>
                        
                        <div className="custominput__input-button">
                            <input onChange={handleChange(text)} type={type} required={required}/>

                            {buttonText ? (
                                <button type="text">{buttonText}</button>
                            ): null}
                        </div>
                    </div>);
    };

    return (
        <div className="custominput">
            {inputs}
        </div>
    )
}

export default CustomInput
