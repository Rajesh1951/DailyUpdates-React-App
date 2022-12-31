import React from 'react'
import { Line } from 'react-chartjs-2'
import { useEffect, useState } from 'react';
import { Chart as ChartJS } from "chart.js/auto";
import { Box, Button, HStack, VStack, Text, Link } from "@chakra-ui/react"
import axios from 'axios';


function Stock() {
  let symbols = ['RELIANCE.BSE', 'WIPRO.BSE', 'INFY.BSE', 'HDFCBANK.BSE', 'HDFC.BSE', 'TCS.BSE', 'TATAMOTORS.BSE', 'TATAPOWER.BSE', 'TECHM.BSE'];
  let fontList = ['sm', 'md', 'lg', '3xl'];
  const [list, setlist] = useState([]);
  const [latest, setLatest] = useState(0);
  const [symb, setSym] = useState('RELIANCE.BSE');
  const [petPrice, setPetPrice] = useState(
    {
      petrol: 60,
      diesel: 60,
      petrolGain: 60,
      dieselGain: 60,
    }
  );
  const fetch = async (sym, days) => {
    const { data } = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${sym}&outputsize=full&apikey=AY1RFGNKKUBM6JOU`)
    let temp = data["Time Series (Daily)"]
    let l = [];
    for (let i in temp) {
      l.push(temp[i]["4. close"]);
      if (l.length > days)
        break;
    }
    setLatest(l[0]);
    l.reverse();
    setSym(sym);
    setlist(l);
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '11bb523631msh1a9fe002c29a832p1e05bdjsnd4bfb9b1cfad',
      'X-RapidAPI-Host': 'daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com'
    }
  };
  const fetch2 = async () => {
    const { data } = await axios.get('https://daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com/v1/fuel-prices/today/india/karnataka/', options)
    console.log(data.fuel)
    setPetPrice({
      petrol: data["fuel"]["petrol"]["retailPrice"],
      diesel: data["fuel"]["diesel"]["retailPrice"],
      petrolGain: data["fuel"]["petrol"]["retailPriceChange"],
      dieselGain: data["fuel"]["diesel"]["retailPriceChange"],
    })
  }
  useEffect(() => {
    fetch(symb, 30)
    fetch2()
  }, [])
  let prices = {
    labels: list.map((x, i) => i + 1),
    datasets: [{
      label: 'stock price',
      data: list,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  }
  return (
    <Box fontFamily={'Roboto Slab'}>
      <Box display='flex' flexDirection={['column', 'row']}>
        <Box m={['4', '8', '10']}>
          <Box w='50vw' >
            <Text ml={['1', '8']} fontSize={['3xl', '4xl', '5xl']}>{symb}</Text>
            <HStack >
              <Link mr='2' fontSize={['sm', 'md', 'lg']} onClick={() => fetch(symb, 7)}>1week</Link>
              <Link mr='2' fontSize={['sm', 'md', 'lg']} onClick={() => fetch(symb, 30)}>1month</Link>
              <Link mr='2' fontSize={['sm', 'md', 'lg']} onClick={() => fetch(symb, 1 * 365)}>1year</Link>
              <Link mr='2' fontSize={['sm', 'md', 'lg']} onClick={() => fetch(symb, 3 * 365)}>3year</Link>
              <Link mr='2' fontSize={['sm', 'md', 'lg']} onClick={() => fetch(symb, 5 * 365)}>5year</Link>
              <Link mr='2' fontSize={['sm', 'md', 'lg']} onClick={() => fetch(symb, 40 * 365)}>All</Link>
            </HStack>
          </Box>
          <Line data={prices} />
          <Text fontSize={['3xl', '4xl', '5xl']} textAlign='center'>Latest Price: {'\u20B9'}{latest}</Text>
          <Box display='flex' flexDir={['column', 'row']} justifyContent='center' alignItems='center'>
            <Box borderRadius='12' border='2px' p='3' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <Text fontSize={fontList} borderBottom='2px'>Petrol Price Today</Text>
              <Text fontSize={fontList} >Retail Price: {'\u20B9'}{petPrice.petrol}</Text>
              <Text fontSize={fontList} >Change in Price: {'\u20B9'}{petPrice.petrolGain}</Text>
            </Box>
            <Box borderRadius='12' border='2px' p='3' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <Text fontSize={fontList} borderBottom='2px'>Diesel Price Today</Text>
              <Text fontSize={fontList} >Retail Price: {'\u20B9'}{petPrice.diesel}</Text>
              <Text fontSize={fontList} >Change in Price: {'\u20B9'}{petPrice.dieselGain}</Text>
            </Box>
          </Box>
        </Box>
        <Box p='5' display='flex' flexDirection={'column'} justifyContent='center' alignItems='center' >
          {symbols.map((x, i) => <Button key={i} w='30' onClick={() => fetch(x, 7)} size='lg'>{x}</Button>)}
        </Box>
      </Box>
    </Box>
  )
}

export default Stock