import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { MostSearchedCoins } from '../constants';
import { CurrencyState } from '../utilsContext/CurrencyContext';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {Link} from 'react-router-dom'

//styles for the carousel
const useStyles = makeStyles(()=>({
    carousel:{
        height:"50%",
        display:"flex",
        alignItems:"center"
    },
    carouselItem:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        cursor:"pointer",
        textTransform:"uppercase",
        color:"white"
    }
}))
//to seperate number with proper commas
export function seperateWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const classes = useStyles();
    //mostSearched - it will hold the highly searched coins
    const [mostSearched , setMostSearched] = useState([]);
    //currenecy and symbol is taken from the global state
    const {currency,symbol} = CurrencyState();

    //fetches the most serached coin and assign to mostSearched state variable
    const fetchMostSearchedCoins = async() => {
     const {data} = await axios.get(MostSearchedCoins(currency));
     setMostSearched(data)
    }

   //fetches the most serached coin on initial render
   //and everytime the currecny changes
    useEffect(()=>{
        fetchMostSearchedCoins();
    },[currency])
    
    //to make it responsive to mobile and web
    //for mobile two elements will be shown in carousel
    //for web four element will be shown
    const responsive = {
        0:{
            items:2,
        },
        512:{
            items:4,
        }
    }
    //this items should be populated to the carousel
    const items = mostSearched.map((coin) => {
        let profit = coin?.price_change_percentage_24h>=0;
        
        return (
        
        <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
            <img src={coin?.image} alt={coin.name} height="80" style={{marginBottom:10}}/>
            <span>{coin?.symbol}&nbsp;
                <span style={{
                    color: profit>0 ? "green":"red"
                }}>
                {profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
            </span>
            <span style={{ fontSize: 22, fontWeight:500}}>
                {symbol} {seperateWithCommas(coin?.current_price.toFixed(2))}

            </span>
        </Link>
    )})

  return (
    <div className={classes.carousel}>
      <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableDotsControls disableButtonsControls
       responsive={responsive} autoPlay items={items}>
      </AliceCarousel>
    </div>
  )
}

export default Carousel
