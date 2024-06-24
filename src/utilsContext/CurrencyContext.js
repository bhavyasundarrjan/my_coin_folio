import { createContext, useState, useEffect, useContext } from "react";


const Currency = createContext();

const CurrencyContext = ({children}) => {
    //maintains state for the currency
    const [currency, setCurrency] = useState('INR');
    //maintains state for the symbol
    const [symbol, setSymbol] = useState("₹");
    
    //updates the state symbol when currency changes
    useEffect(()=>{
     if(currency === "INR") setSymbol("₹");
     else if(currency === "USD") setSymbol("$");
    },[currency])

    return <Currency.Provider value={{currency,symbol,setCurrency}}>{children}</Currency.Provider>
}
export default CurrencyContext;

export const CurrencyState = () => {
    return useContext(Currency)
}