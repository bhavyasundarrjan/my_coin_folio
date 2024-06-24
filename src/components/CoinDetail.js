import axios from "axios";
import { useEffect, useState } from "react";
import { PreviousChart } from "../constants";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import DurationButton from "./DurationButton";
import { chartDuration } from "../constants";
import { CurrencyState } from "../utilsContext/CurrencyContext";


const CoinDetail = ({ coin }) => {
  // coin - gets the coin id as a prop from CoinPage(parent)  

  // previousData - will hold the past one years coin data
  const [previousData, setPreviousData] = useState();

  //
  const [days, setDays] = useState(1);

  //overall currency details from state
  const { currency } = CurrencyState();

  const [flag,setflag] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      width: "75%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();


  //fetches the coins previous data upto a year
  const fetchPreviousData = async () => {
    const { data } = await axios.get(PreviousChart(coin.id, days, currency));
    setflag(true);
    //updates the prices to the state variable
    setPreviousData(data.prices);
  };


  //fetches previus data accoring to the number of days
  useEffect(() => {
    fetchPreviousData();
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {/* if there is no previous data then circular progress is shown */}
        {!previousData | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={50}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: previousData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    borderColor: "#EEBC1D",
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    data: previousData.map((coin) => coin[1]),
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDuration.map((day) => (
                <DurationButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </DurationButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinDetail;