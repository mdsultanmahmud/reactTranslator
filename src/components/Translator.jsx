import './Translator.css'
import { GiSpeaker } from 'react-icons/gi'
import { AiOutlineCopy } from 'react-icons/ai'
import { BiTransfer } from 'react-icons/bi'

import countries from '../data.js';
import { useEffect, useState } from 'react';
const Translator = () => {
    const [formText, setFormText] = useState('')
    const [output, setOutput] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    // const [selectLng, setSelectLng] = useState('English')
    const [selectLngCode, setSelectLngCode] = useState('en-GB')
    // const [toLng, setToLng] = useState('Bengali')
    const [toLngCode, setToLngCode] = useState('bn-IN')

    useEffect(() => {
        if (formText === "") {
            setOutput("")
        }
    }, [formText])

    const handleTranslation = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(formText.trim()) 
        setOutput("Functionality is not addeded!!! It's underconstruction")
        console.log("select langauge code", selectLngCode, "output language code", toLngCode);
        if (!formText) {
            setError("You have not entered any text!!!")
        } else {
            const api = `https://api.mymemory.translated.net/get?q=${formText}&langpair=${selectLngCode}|${toLngCode}`
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    setOutput(data.responseData.translatedText)
                    setLoading(false)
                })
        }
    }

    const handleCopy = async(copy) =>{
        if(copy == "from"){
            try {
                await navigator.clipboard.writeText(formText)
                setIsCopied(true)
            } catch (error) {
                console.log(error);
            }
        }else{
            try {
                await navigator.clipboard.writeText(output)
                setIsCopied(true)
            } catch (error) {
                console.log(error);

            }
        }
    }

    return (
        <div className='container'>
            <div className="content">
                <form onSubmit={handleTranslation}>
                    <div className='selected-lang'>
                        <textarea onKeyUp={(e) => {
                            setFormText(e.target.value)
                            setError('')
                            setOutput('')
                           
                        }
                        } spellCheck={false} name="selectLanguage" id="" placeholder='Enter Your Text' cols="40" rows="15"></textarea>
                        <textarea spellCheck={false} name="outputLanguage" id="" placeholder='Translation' defaultValue={loading ? "Translating..." : output} cols="40" rows="15" readOnly></textarea>
                        <div className='option'>
                            <div>
                                <GiSpeaker size={22} style={{ cursor: 'pointer' }} />
                            </div>
                            <div>
                                <AiOutlineCopy onClick={() => handleCopy("from")} size={22} style={{ cursor: 'pointer' }} />
                            </div>
                            <div>
                                <select onChange={(e) =>
                                    setSelectLngCode(e.target.value)

                                }>
                                    {
                                        Object.keys(countries).map((key, index) => <option key={index} value={key} selected={countries[key] == "English"}>{countries[key]}</option>)
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
                                <AiOutlineCopy onClick={() => handleCopy("to")} size={22} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                    </div>
                    {error && <p className='danger'>{error}</p>}
                    <button type='submit'>Translate</button>
                </form>
            </div>
        </div>
    );
};

export default Translator;