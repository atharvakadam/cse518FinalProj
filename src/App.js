import {React, useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import ReactTypingEffect from 'react-typing-effect';
import {Form, Button} from 'react-bootstrap';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';



function App() {
  const [modalShow, setModalShow] = useState(false);
  const [text, setText] = useState('')
  const [rateSlider, setRateSlider] = useState(0);
  const [pitchSlider, setPitchSlider] = useState(0);
  const [voicesList, setVoicesList] = useState(["Open this select menu"]);
  const [voice, setVoice] = useState('');
  const synth = window.speechSynthesis;
  const allVoicesObtained = new Promise(function(resolve, reject) {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length !== 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", function() {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      });
    }
  });
  console.log(allVoicesObtained)
  
  useEffect(() => {
    const fetchAllVoices = async () => {
      const voices = await allVoicesObtained;
      setVoicesList(voices)
      console.log(voicesList)
    }
    fetchAllVoices();
  },[])

  
  const speak = () => {
    if (synth.speaking) {
      console.error('Already Speaking...')
      return;
    }
    if (text !== ''){
      const speechText = new SpeechSynthesisUtterance(text);
      // end of speech
      speechText.onend = e => {
        console.log('Done speaking!')
      }
      // speech error
      speechText.onerror = e => {
        console.error('Something went wrong!')
      }
      // selected voice
      // if ((voice === 'Open this select menu') || (voice === '')){
      //   window.alert('Please select a voice')
      // }
      voicesList.forEach((eachvoice) => {
        if (eachvoice.name === voice){
          speechText.voice = voice;
        }
      });

      speechText.rate = rateSlider;
      speechText.pitch = pitchSlider;

      synth.speak(speechText)

    }
    // if (text.value)
  }
  
  // let sayitoutloud = function(msg){
  //   var speech = new SpeechSynthesisUtterance();
  //   speech.text = msg;
  //   window.speechSynthesis.speak(speech);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ReactTypingEffect
        text={["Decibel", "dB"]}
        typingDelay='20'
        speed='50'
        eraseSpeed='50'
        eraseDelay='1500'
        style={{
          whiteSpace: 'nowrap',
          display: 'inline',
          fontSize:'75px',
          fontColor:'white'}}
      />
      </header>
      <div className='TextInput'>
        <Form.Group className="mb-3" style={{width:'500px'}} controlId="exampleForm.ControlTextarea1">
          {/* <Form.Label>Example textarea</Form.Label> */}
          <Form.Control as="textarea" rows={3} width='50px' placeholder='Enter Anything...' defaultValue= "" onChange={(e) => {setText(e.target.value); console.log(text)}} />
        </Form.Group>
        {/* <Button>Hello World</Button> */}
      </div>
      {/* <Slider /> */}
      <Form.Label className='TextInput'>Rate</Form.Label>
      {/* <Form.Range /> */}
      <div className='TextInput'>
        <RangeSlider
          value={rateSlider}
          onChange={changeEvent => setRateSlider(changeEvent.target.value)}
          style={{
            width:'500px'
          }}
          min={0}
          max={2}
          />
      </div>
      <Form.Label className='TextInput' style={{paddingTop:'25px'}}>Pitch</Form.Label>
      {/* <Form.Range /> */}
      <div className='TextInput'>
          <RangeSlider
          value={pitchSlider}
          onChange={changeEvent => setPitchSlider(changeEvent.target.value)}
          style={{
            width:'500px'
          }}
          min={0}
          max={2}
        />
      </div>
      <Form.Label className='TextInput' style={{paddingTop:'25px'}}> Select Accent/Language</Form.Label>
      <div className='TextInput'>
        <Form.Select aria-label="Default select example" style={{width:'500px'}} onChange={(e) => {console.log(e.target.value)}}>
          <option key="Open this select menu">Open this select menu</option>
          {voicesList.map((voice, i) => 
            <option key={i}>{voice.name + '(' + voice.lang + ')'}</option>
          )}
          {/* <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>    */}
        </Form.Select>
      </div>
      <div className='TextInput' style={{paddingTop:'10px'}}>
      <Button style={{width:'500px'}} onClick={() => {speak()}}>Speak It!</Button>
      </div>
      
      
    </div>
  );
}

export default App;



/**
 * 
 <p 
        // className="App-logo"
        style={{whiteSpace: 'nowrap',display: 'inline', fontSize:'100px'}}
        >
          Decibel
        </p>

 * <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {sayitoutloud("Learn React")}}
        >
          Learn React
        </a>
 */