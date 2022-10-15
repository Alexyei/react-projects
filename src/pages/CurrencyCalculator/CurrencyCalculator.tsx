import {FC, useEffect, useMemo, useRef, useState} from "react";
import classes from "./CurrencyCalculator.module.scss"

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

const Block: FC<{ value: number, currency: string, onChangeValue: (value: number) => void, onChangeCurrency: (currency: string) => void }> = ({
                                                                                                                                                  value,
                                                                                                                                                  currency,
                                                                                                                                                  onChangeValue,
                                                                                                                                                  onChangeCurrency
                                                                                                                                              }) => {
    return (
        <div className={classes.block}>
            <ul className={classes.currencies}>
                {defaultCurrencies.map((cur) => (
                    <li
                        onClick={() => onChangeCurrency(cur)}
                        className={currency === cur ? classes.active : ''}
                        key={cur}>
                        {cur}
                    </li>
                ))}
                <li>
                    <svg height="50px" viewBox="0 0 50 50" width="50px">
                        <rect fill="none" height="50" width="50"/>
                        <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 "/>
                    </svg>
                </li>
            </ul>
            <input
                onChange={(e) => {

                    console.log("target: ",e.target.value)
                    onChangeValue(parseFloat(e.target.value))}}
                value={value.toFixed(3)}
                type="number"
                step="any"
                placeholder={"0"}
            />
        </div>
    )
}

const CurrencyCalculator: FC = () => {
    const currencyRates = useRef<{ [x: string]: number }>()
    const [isLoading, setIsLoading] = useState(true)

    const [firstValue, setFirstValue] = useState(0)
    const [firstCurrency, setFirstCurrency] = useState("RUB")
    const [secondValue, setSecondValue] = useState(0)
    const [secondCurrency, setSecondCurrency] = useState("USD")

    // const memorizedFirstCurrencyRate = useMemo(()=>{
    //     if (isLoading) return 0;
    //     return  currencyRates.current![secondCurrency] / currencyRates.current![firstCurrency] * secondValue;
    // },[secondCurrency, firstCurrency, secondValue,isLoading])
    //
    // const memorizedSecondCurrencyRate = useMemo(()=>{
    //     if (isLoading) return 0;
    //     return currencyRates.current![firstCurrency] / currencyRates.current![secondCurrency] * firstValue;
    // },[secondCurrency, firstCurrency, firstValue,isLoading])

    function onChangeFirstCurrencyHandler(newCurrency:string){
        setFirstCurrency(newCurrency);
        setSecondValue(getSecondCurrencyRate(firstValue,newCurrency,secondCurrency))
    }

    function onChangeSecondCurrencyHandler(newCurrency:string){

        setSecondCurrency(newCurrency);
        setSecondValue(getSecondCurrencyRate(firstValue,firstCurrency,newCurrency))
    }

    // useEffect(()=>{
    //     console.log("effect")
    //     if (!isLoading)
    //     onChangeFirstValueHandler(firstValue)
    // },[firstCurrency,secondCurrency])


    function onChangeFirstValueHandler(newValue:number){
        setFirstValue(newValue)
        setSecondValue(getSecondCurrencyRate(newValue,firstCurrency,secondCurrency));
       // setSecondValue(memorizedSecondCurrencyRate)
    }

    function onChangeSecondValueHandler(newValue:number){
        console.log("on change second value")
        setSecondValue(newValue)
        setFirstValue(getFirstCurrencyRate(newValue,secondCurrency,firstCurrency))
       // setFirstValue(memorizedFirstCurrencyRate)
    }

    function getFirstCurrencyRate(secondValue:number, secondCurrency:string, firstCurrency:string){
        return  currencyRates.current![secondCurrency] / currencyRates.current![firstCurrency] * secondValue;
    }

    function getSecondCurrencyRate(firstValue:number,firstCurrency:string, secondCurrency:string){
        return currencyRates.current![firstCurrency] / currencyRates.current![secondCurrency] * firstValue;
    }

    // function initValues(){
    //     setFirstValue(1);
    //     setSecondValue(getSecondCurrencyRate(1,firstCurrency,secondCurrency));
    // }

    useEffect(() => {
        fetch("https://cdn.cur.su/api/latest.json")
            .then(response => response.json())
            .then(json => currencyRates.current = json.rates)
            .catch(e => alert("Ошибка при загрузке данных!"))
            .finally(() => setIsLoading(false))
            .finally(()=> onChangeFirstValueHandler(1))
           // .finally(()=>initValues())
    }, [])


    return (
        <div className={classes.container}>
            {isLoading ? "Loading..." :
                <>
                    <Block value={firstValue} currency={firstCurrency} onChangeCurrency={onChangeFirstCurrencyHandler}
                           onChangeValue={onChangeFirstValueHandler}/>
                    <Block value={secondValue} currency={secondCurrency} onChangeCurrency={onChangeSecondCurrencyHandler}
                           onChangeValue={onChangeSecondValueHandler}/>
                </>
            }
        </div>
    )
}

export default CurrencyCalculator;