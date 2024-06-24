import { AppBar, Container, MenuItem, Select, Toolbar, Typography, makeStyles,createTheme, ThemeProvider } from '@material-ui/core'
import React from 'react';
import { Link } from 'react-router-dom';
import { CurrencyState } from '../utilsContext/CurrencyContext';
import { useNavigate } from 'react-router-dom';
//styles for the header component
const useStyles = makeStyles(()=>({
  title:{
    flex: 1,
    color: "gold",
    fontFamily:"Montserrat",
    fontWeight:"bold",
    cursor:"pointer",
  }
}));

//theme for the header
const darkTheme = createTheme({
  palette: {
    primary: {
      main:'#edf2ff'
    },
    type:'dark'
  },
});

const Header = () => {
  const classes = useStyles();
  //currenecy is taken from the global state
  const {currency , setCurrency} = CurrencyState();
  //on click of the logo/header navigates to the home page
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
         <Typography className={classes.title} variant="h6" onClick={() => navigate(`/`)}>
            Coin Folio
          </Typography>
          <Select variant="outlined" style={{
            width: 100,
            height: 40,
            marginRight:15,
          }} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <MenuItem value={'USD'}>USD </MenuItem>
            <MenuItem value={'INR'}>INR </MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header
