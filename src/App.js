// import { Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from "@material-ui/core"

//styles for the whole app container
 const useStyles = makeStyles(()=>({
    App:{
      backgroundColor: '#14161a',
      color:'white',
      minHeight:'100vh'
    }
  }));

function App() {
  //styles can be used through classes
  const classes = useStyles();
  return (
       <BrowserRouter>
        <div className={classes.App}>
          <Header></Header>
          <Routes>
          <Route path='/' element={<HomePage/>} exact></Route>
          <Route path='/coins/:id' element={<CoinPage/>}></Route> 
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
