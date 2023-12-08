import React, { useState } from 'react'
import './checkbox.css'

const Checkbox = ({  }: {}) => {
   
    const [ttsStatus, setChecked] = useState(false); 
    const handleChange = () => { 
        
        console.log('Text TO Speech toggle'); 
        setChecked(!ttsStatus); 
    }; 

    return (
        <input type="checkbox" id="toggleTts" onChange={handleChange} name="toggleTts"/>
    );
};

export default Checkbox;