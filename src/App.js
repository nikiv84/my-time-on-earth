import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import bg from './bg.png'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #d83434 30%, #8f121c 90%)',
    border: 0,
    borderRadius: 5,
    color: 'white !important',
    height: 48,
    padding: '10px',
    '& input, & label, & .Mui-focused': {
      color: '#fff'
    },
    '& .MuiIconButton-label': {
      color: '#fff'
    },
    '& .MuiInputLabel-formControl': {
      top: 'initial',
      left: 'initial'
    },
    '.MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderColor: '#fff'
    },
    '.MuiPaper-root .MuiPickersToolbar-toolbar': {
      backgroundColor: '#c41d22 !important'
    }
  },
});

function App() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(Date.now());
  const [daysOnEarth, setDaysOnEarth] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);


  const setDaysSinceBirth = date => {
    const DOB = moment(date);
    const difference = moment().diff(DOB);
    const duration = new moment.duration(difference);
    setDaysOnEarth(Math.round(duration.asDays()));
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    setDaysSinceBirth(date);
    setIsVisible(true);
  };

  return (
    <>
      <div className="app-main">
        <div className="date-container">
          <Typography variant="h1" gutterBottom className="heading-main">
            MY TIME ON EARTH
            <span className="subtitle"><a href="http://www.vukvidor.com/" rel="noopener noreferrer" target="_blank">by Vuk Vidor</a></span>
          </Typography>
          <Typography variant="h5" gutterBottom>
            Please enter your date of birth:
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="flex-start">
              <KeyboardDatePicker
                className={classes.root}
                margin="normal"
                id="date-picker-dialog"
                label="Please choose date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          {isVisible && <Typography variant="h4" gutterBottom>
            You are exactly <span className="days-on-earth">{daysOnEarth}</span> days on Earth.
            </Typography>}
        </div>
        <div className="bg-img">
          <img src={bg} alt="" />
        </div>
      </div>
    </>
  )
}

export default App;
