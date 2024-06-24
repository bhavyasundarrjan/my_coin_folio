import React , {useState, useEffect} from 'react';
import { CoinList } from '../constants';
import { CurrencyState } from '../utilsContext/CurrencyContext';
import axios from 'axios';
import Pagination from "@material-ui/lab/Pagination";
import { useNavigate } from 'react-router-dom';
import { Container,makeStyles, createTheme,LinearProgress,Table,TableContainer,TableHead,TableRow,TableCell,TextField,ThemeProvider, Typography, TableBody } from '@material-ui/core';

//Theme for the component
const darkTheme = createTheme({
    palette: {
      primary: {
        main:'#fff'
      },
      type:'dark'
    },
  });
  // numbers will be seperated with commas
  export function NumberSeperatedWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //styles for the table
  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });

const CoinTable = () => {
  //coins -  will hold the list of coin details
  const [coins, setCoins] = useState([]);
  // loading - will show linear progress when the data is loaading
  const [loading, setLoading] = useState(false);
  //search - will have the term which is searched in the search box
  const [search, setSearch] = useState("");
  //page - it will hold the current page number
  const [page, setPage] = useState(1); 
  //currenecy and symbol is taken from the global state
  const{currency, symbol} = CurrencyState();
  //to access styles through classes
  const classes = useStyles();
  //helps to naviagte to the particular coin page information
  //on click of each roww
  const history = useNavigate();
  
  //fetches coin data list
  const fetchCoins = async () => {
    //before fetching loading set to true
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data)
    //after data is fetched loading is set to false
    setLoading(false);
  }

  //coin data list should be fetched initially and
  //after the currency gets changed
  useEffect(()=>{
    fetchCoins();
  },[currency])

  //filters the data accoding to the search
  //filters by both symbol and name
  const handleSearch = () => {
  return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return (
   <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign:"center"}}>
      <Typography variant="h4" style={{margin:18,fontFamily:"Montserrat"}}>CryptoCurrency Prices by Market Cap</Typography>
      <TextField label="Search here" variant="outlined" style={{marginBottom:20,width:"100%"}} onChange={(e) => {
        setSearch(e.target.value);
        }}>
      </TextField>
      <TableContainer>
        {
            loading?(
                <LinearProgress style={{backgroundColor:"gold"}}></LinearProgress>
            ):(
                <>
                <Table>
                    <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                      <TableRow>
                      {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            handleSearch().slice((page-1)*10,(page-1)*10 + 10).map((row) => {
                                const profit = row.price_change_percentage_24h > 0;
                                return(
                                    <TableRow className={classes.row} key={row.name} onClick={() => history(`/coins/${row.id}`)}>
                                      <TableCell component="th" scope="row" style={{display: "flex", gap: 15}}>
                                        <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}}/>
                                        <div style={{display:"flex",flexDirection:"column"}}>
                                            <span style={{
                                                textTransform:"uppercase",
                                                fontSize: 22,
                                                }}>{row.symbol}
                                            </span>
                                            <span style={{ color: "darkgrey" }}>
                                                {row.name}
                                            </span>
                                        </div>
                                      </TableCell>
                                      <TableCell align="right">
                                       {symbol}{" "}
                                       {NumberSeperatedWithCommas(row.current_price.toFixed(2))}
                                      </TableCell>
                                      <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {NumberSeperatedWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                                    </TableRow>
                                    
                                )
                            })
                        }
                    </TableBody>
                </Table>
                </>
            )
        }
      </TableContainer>
      <Pagination
          count={parseInt((handleSearch()?.length / 10))}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
    </Container>
   </ThemeProvider>
  )
}

export default CoinTable
