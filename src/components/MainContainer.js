import { Container, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';

//styles for the container
const useStyles = makeStyles(()=>({
    cotainerContent:{
        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop: 15,
        justifyContent:"space-around"
    },
    tagline:{
        display:"flex",
        height: "30%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
    }
}))

const MainContainer = () => {
    //styles will be accessed through classes
    const classes = useStyles();
  return (
    <div>
        <Container className={classes.cotainerContent}>
           <div className={classes.tagline}>
            <Typography variant="h2" style={{
                fontWeight:"bold",
                marginBottom:15,
                fontFamily:"Montserrat"
            }}>
            Coin Folio
            </Typography>
            <Typography variant="subtitle2" style={{
                color:"darkgrey",
                textTransform:"capitalize",
                fontFamily:"Montserrat"
            }}>
            Get all the information regarding your Crypto
            </Typography>
            <Carousel></Carousel>
           </div>
        </Container>
    </div>
  )
}

export default MainContainer;
