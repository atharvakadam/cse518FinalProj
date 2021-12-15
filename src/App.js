import {React, useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import ReactTypingEffect from 'react-typing-effect';
import {Form, Button, Tooltip, OverlayTrigger, Offcanvas, Alert} from 'react-bootstrap';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';


function App() {
  const [modalShow, setModalShow] = useState(false);
  const [text, setText] = useState('')
  const [rateSlider, setRateSlider] = useState(1);
  const [pitchSlider, setPitchSlider] = useState(1);
  const [voicesList, setVoicesList] = useState(["Open this select menu"]);
  const [voice, setVoice] = useState('');
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSpeakAlert, setShowSpeakAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      // console.log(voicesList)
    }
    fetchAllVoices();
  },[])

  const body = document.querySelector('body')
  
  const speak = () => {
    
    if (synth.speaking) {
      // console.error('Already Speaking...')
      // return;
      // window.alert('Already speaking!')
      setShowSpeakAlert(true)
      return;
    }
    if (text === ''){
      setShowAlert(true)
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
        // console.log("Eachvoice",eachvoice.name)
        // console.log("voice",voice)
        if (eachvoice.name === voice){
          speechText.voice = eachvoice;
        }
      });

      speechText.rate = rateSlider;
      speechText.pitch = pitchSlider;

      synth.speak(speechText)

    }
    // if (text.value)
  }
  
  let sayitoutloud = function(msg){
    var speech = new SpeechSynthesisUtterance();
    speech.text = msg;
    window.speechSynthesis.speak(speech);
  }

  const instructions = 'Step 1: Type in anything in the input box OR paste any text you want. Step 2: Drag to adjust the slider for setting the rate of the voice. Step 3: Drag to adjust the next slider for setting the pitch of the voice. Step 4: Click on the dropdown menu to open it and then select any one voice/accent. Step 5: Click on Speak it button!'

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to say it out loud!
    </Tooltip>
  );

  const renderTooltipSelectAccent = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Select one of the voices!
    </Tooltip>
  );

  const renderTooltipPitch = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Drag the slider below to adjust the pitch!
    </Tooltip>
  );

  const renderTooltipRate = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Drag the slider below to adjust the rate!
    </Tooltip>
  );

  const renderTooltipInputText = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please type anything! OR Paste something!
    </Tooltip>
  );

  return (
    <div className="App" 
    // style={{background:'#282c34 url(../public/wave.gif)',
    //     backgroundSize: "cover",
    //     height: "100vh",}}
        >
      <Alert variant={'warning'} show={showAlert} dismissible onClose={() => setShowAlert(false)}>
        Please type something in the input box or paste something in! 
        <span></span>
        <Alert.Link onClick={() => sayitoutloud('Please type something in the input box or paste something in!')}> Listen</Alert.Link>
        
      </Alert>
      <Alert variant={'warning'} show={showSpeakAlert} dismissible onClose={() => setShowSpeakAlert(false)}>
        Still Speaking! Wait for speech to end!
        <span></span>
        <Alert.Link onClick={() => sayitoutloud('Still Speaking! Wait for speech to end!')}> Listen</Alert.Link>
       
      </Alert>
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
        onClick={() => sayitoutloud('Welcome to Decibel!')}
      />
      </header>
      <div className='TextInput'>
      <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltipInputText}
        >
        <Form.Group className="mb-3" style={{width:'500px'}} controlId="exampleForm.ControlTextarea1">
          {/* <Form.Label>Example textarea</Form.Label> */}
          <Form.Control as="textarea" rows={3} width='50px' placeholder='Enter Anything...' defaultValue= "" onChange={(e) => {setText(e.target.value); console.log(text)}} />
        </Form.Group>
        </OverlayTrigger>
        {/* <Button>Hello World</Button> */}
      </div>
      {/* <Slider /> */}
      <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltipRate}
        >
      <Form.Label className='TextInput' onClick={() => sayitoutloud('Drag the slider below to adjust rate of speech')}>Rate</Form.Label>
      </OverlayTrigger>
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
          step={0.2}
          />
      </div>
      <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltipPitch}
        >
        <Form.Label className='TextInput' style={{paddingTop:'25px'}} onClick={() => sayitoutloud('Drag the slider below to adjust pitch of speech')}>Pitch</Form.Label>
      </OverlayTrigger>
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
          step={0.2}
        />
      </div>
      <Form.Label className='TextInput' style={{paddingTop:'25px'}}> Select Accent/Language</Form.Label>
      <div className='TextInput'>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltipSelectAccent}
        >
        <Form.Select aria-label="Default select example" style={{width:'500px'}} onChange={(e) => { setVoice(e.target.value.substring(0,e.target.value.indexOf('('))); console.log(e.target.value.substring(0,e.target.value.indexOf('(')))}}>
          <option key="Open this select menu">Open this select menu</option>
          {voicesList.map((voice, i) => 
            <option key={i}>{voice.name + '(' + voice.lang + ')'}</option>
          )}
          {/* <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>    */}
        </Form.Select>
        </OverlayTrigger>
      </div>
      <div className='TextInput' style={{paddingTop:'10px'}}>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
      <Button style={{width:'500px'}} onClick={() => {speak()}}>Speak It!</Button>
      </OverlayTrigger>
      </div>
      <div className='TextInput' style={{paddingTop:'10px'}}>
      <Button variant="warning" onClick={handleShow}>
        Need Help?
      </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose} style={{backgroundColor:'#282c34', color:'white'}}>
        <Offcanvas.Header closeButton closeVariant='white'>
          <Offcanvas.Title>Instructions to run Decibel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>Step 1: Type in anything in the input box OR paste any text you want</div>
          <br></br>
          <div>Step 2: Drag to adjust the slider for setting the rate of the voice</div>
          <br></br>
          <div>Step 3: Drag to adjust the next slider for setting the pitch of the voice</div>
          <br></br>
          <div>Step 4: Click on the dropdown menu to open it and then select any one voice/accent</div>
          <br></br>
          <div>Step 5: Click on 'Speak it!'</div>
          <br></br>
          <Button onClick={() => sayitoutloud(instructions)}>Read out all instructions</Button>
        </Offcanvas.Body>
      </Offcanvas>
      
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