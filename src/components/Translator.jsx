import './Translator.css'
import { GiSpeaker } from 'react-icons/gi'
import { AiOutlineCopy } from 'react-icons/ai'
import { BiTransfer } from 'react-icons/bi'

import countries from '../data.js';
import { useState } from 'react';
const Translator = () => {
    const [output, setOutput] = useState("")
    // const [selectLng, setSelectLng] = useState('English')
    const [selectLngCode, setSelectLngCode] = useState('en-GB')
    // const [toLng, setToLng] = useState('Bengali')
    const [toLngCode, setToLngCode] = useState('bn-IN')
    const handleTranslation = (e) => {
        e.preventDefault()
        const form = e.target 
        const input = form.selectLanguage.value
        setOutput("Functionality is not addeded!!! It's underconstruction")
        // console.log("selected lang", selectLng)
        // console.log("output langauge", toLng);
        console.log("input", input);
        console.log("select langauge code", selectLngCode, "output language code", toLngCode);
    }

    return (
        <div className='container'>
            <div className="content">
                <form onSubmit={handleTranslation}>
                    <div className='selected-lang'>
                        <textarea spellCheck={false} name="selectLanguage" id="" placeholder='Enter Your Text' cols="40" rows="15"></textarea>
                        <textarea spellCheck={false} name="outputLanguage" id="" placeholder='Translation' defaultValue={output} cols="40" rows="15" readOnly></textarea>
                        <div className='option'>
                            <div>
                                <GiSpeaker size={22} style={{ cursor: 'pointer' }} />
                            </div>
                            <div>
                                <AiOutlineCopy size={22} style={{ cursor: 'pointer' }} />
                            </div>
                            <div>
                                <select onChange={(e) => 
                                setSelectLngCode(e.target.value)
                                
                                }>
                                    {
                                        Object.keys(countries).map((key, index) =><option key={index} value={key} selected={countries[key] == "English"}>{countries[key]}</option>)
                                    }
                                </select>
                            </div>
                            <div>
                                <BiTransfer onClick={handleTranslation} size={22} style={{ cursor: 'pointer' }} />
                            </div>
                            <div>
                                <select onChange={(e) => setToLngCode(e.target.value)}>
                                    {
                                        Object.keys(countries).map((key, index) => <option key={index} value={key} selected={countries[key] == "Bengali"}>{countries[key]}</option>)
                                    }
                                </select>
                            </div>
                            <div>
                                <GiSpeaker size={22} style={{ cursor: 'pointer' }} />
                            </div>
                            <div>
                                <AiOutlineCopy size={22} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                    </div>
                        <button type='submit'>Translate</button>
                </form>
            </div>
        </div>
    );
};

export default Translator;