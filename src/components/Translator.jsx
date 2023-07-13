import './Translator.css'
import { GiSpeaker } from 'react-icons/gi'
import { AiOutlineCopy } from 'react-icons/ai'
import { BiTransfer } from 'react-icons/bi'
import { useState } from 'react';
const Translator = () => {
    const [output, setOutput] = useState("")
    const [countries, setCountries] = useState([])
    const handleTranslation = (e) => {
        e.preventDefault()
        setOutput("Functionality is not addeded!!! It's underconstruction")
    }
    
    return (
        <div className='container'>
            <div className="content">
                <form onSubmit={handleTranslation}>
                    <div className='selected-lang'>
                        <textarea spellCheck={false} name="select-language" id="" placeholder='Enter Your Text' cols="40" rows="15"></textarea>
                        <textarea spellCheck={false} name="output-language" id="" placeholder='Translation' defaultValue={output} cols="40" rows="15" readOnly></textarea>
                        <div className='option'>
                            <div>
                                <GiSpeaker size={22} style={{ cursor: 'pointer' }} />
                            </div>
                            <div>
                                <AiOutlineCopy size={22} style={{ cursor: 'pointer' }} />
                            </div>
                            <div>
                                <select name="" id="">
                                    <option value="English">English</option>
                                    <option value="English">English</option>
                                    <option value="English">English</option>
                                </select>
                            </div>
                            <div>
                                <BiTransfer size={22} style={{ cursor: 'pointer' }} />
                            </div>
                            <div>
                                <select name="" id="">
                                    <option value="English">English</option>
                                    <option value="English">English</option>
                                    <option value="English">English</option>
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