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
    const [selectLngCode, setSelectLngCode] = useState('en-GB')
    const [toLngCode, setToLngCode] = useState('bn-IN')

    useEffect(() => {
        if (formText === "") {
            setOutput("")
        }
    }, [formText])

    const handleTranslation = (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        if (!formText) {
            setError("You have not entered any text!!!")
        } else {
            const api = `https://api.mymemory.translated.net/get?q=${formText.trim()}&langpair=${selectLngCode}|${toLngCode}`
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    if(data.responseData.translatedText == "" || data.responseData.translatedText == null){
                        setError("No translated language is available!!")
                    }else{
                        setOutput(data.responseData.translatedText)
                    }
                    setLoading(false) 
                })
        }
    }

    const handleCopy = async (copy) => {
        if (copy == "from") {
            try {
                await navigator.clipboard.writeText(formText)
                setIsCopied("from")
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(output)
                setIsCopied("output")
            } catch (error) {
                console.log(error);
            }
        }
        setTimeout(() => {
            setIsCopied(false)
        }, 1000);
    }

    // const handleSpeak = (text) => {
    //     let speakingText
    //     if (text === 'from') {
    //         speakingText = new SpeechSynthesisUtterance(formText)
    //         speakingText.lang = selectLngCode
    //     } else {
    //         speakingText = new SpeechSynthesisUtterance(output)
    //         speakingText.lang = toLngCode
    //         console.log(toLngCode)
    //     }
    //     speechSynthesis.speak(speakingText)
    //     const voices = speechSynthesis.getVoices()
    //     console.log("voice exist..", voices);
    // }
    const handleSpeak = (text) => {
        let speakingText;
        
        if (text === 'from') {
          speakingText = new SpeechSynthesisUtterance(formText);
          speakingText.lang = selectLngCode;
        } else {
          speakingText = new SpeechSynthesisUtterance(output);
          speakingText.lang = toLngCode;
        }
        const voices = speechSynthesis.getVoices();
        const selectedVoice = voices.find(voice => voice.lang === speakingText.lang);
        if (selectedVoice) {
          speakingText.voice = selectedVoice;
          speechSynthesis.speak(speakingText);
        } else {
          setError("No voice available for the specified language!!")
        }

        setTimeout(() => {
            setError("")
        }, 2000);
      };
      
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
                                <GiSpeaker onClick={() => handleSpeak("from")} size={22} style={{ cursor: 'pointer' }} />
                            </div>
                            <div style={{ position: "relative" }}>
                                {isCopied == 'from' && <p className='copy'>Copied</p>}
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

                            <div style={{ position: 'relative' }}>
                                {isCopied == 'output'  && <p className='copy'>Copied</p>}
                                <AiOutlineCopy onClick={() => handleCopy("to")} size={22} style={{ cursor: 'pointer' }} />
                            </div>
                            <div>
                                <GiSpeaker onClick={() => handleSpeak("to")} size={22} style={{ cursor: 'pointer' }} />
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