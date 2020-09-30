import React from 'react';
import logo from './images/idk.png';
import hair from './images/curly.png';
import world from './images/world.png';
import happy from './images/happy.png';
import shock from './images/shock.png';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import './styles/App.css';
import './styles/Footer.css';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function App() {

  {/*Setting hair texture value given user input and getting product recommendations from a popular review website.
  In the future, plan to use web scrapping to find products matching the user's input*/}
  const [select, setSelect] = React.useState('');
  const [link, setLink] = React.useState('');
  const handleSelect = (event) => {
      setSelect(event.target.value);
  };

  {/*Controlling open and close state of dialog with results*/}
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setLink("https://www.influenster.com/reviews/search?q=" + select);
    getHumidity(location);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  {/*Setting location given user input*/}
  const [location, setLocation] = React.useState('');
  const handleChange = (event) => {
      setLocation(event.target.value);
  };

  {/*Function to get humidity from OpenWeatherMap API */}
  const [Currhumidity,setCurrhumidity] = React.useState(0);
  const [frizz,setFrizz] = React.useState('');
  const [pic,setPic] = React.useState('')

  const getHumidity = (location)=>{
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5a5474fd63875fccee47ce53a36563d5&units=metric`;
      fetch(url).then(response => response.json())
        .then(data => { 
          setCurrhumidity(data['main']['humidity']);
          if(Currhumidity < 50){
            setFrizz('no frizz');
            setPic(happy);
          }
          if(Currhumidity >= 50){
            setFrizz('frizz');
            setPic(shock);
          }
        });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          FrizzQuiz
        </h1>
        <h2>Will my hair frizz up today?</h2>
        <p><i>Avoid the hassle of trying to figure it out, and get product recommendations by completing this quiz!</i></p>

        {/*Question 1: Hair type */}
        <h2>Question 1: Hair Type</h2>
        <img src={hair} alt="woman with curly hair" style={{height: '40vmin'}}/>
        <p><i>How curly (or not!) is your hair?</i></p>
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Hair Type</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={select}
            onChange={handleSelect}
            label="Hair Type"
            style={{minWidth:'120px'}}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'wavy'}>Wavy</MenuItem>
            <MenuItem value={'curly'}>Curly</MenuItem>
            <MenuItem value={'coily'}>Coily</MenuItem>
          </Select>
        </FormControl>

        {/*Question 2: Location */}
        <h2>Question 2: Weather</h2>
        <img src={world} alt="globe" style={{height: '40vmin'}}/>
            <p><i>What is your current location?</i></p>
            <TextField name="location" id="outlined-basic" label="City,Country" variant="outlined" location={location} onChange={handleChange}/>
      </header>

      {/*Footer with results*/}
      <div className="Footer">
        <Button onClick={handleClickOpen} style={{color:'white'}}>
          See Results
        </Button>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogContent dividers>
            <img src={pic} alt="expression"/>
            <p> Seems like there is {frizz} in your forecast for today!</p>
            <a href={link} target="_blank" rel="noopener noreferrer">See product recommendations</a>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
