import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto';    //for registering chart
import { Tag, Box, Button, VStack, HStack, Heading, Text, Link, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import axios from 'axios';
import { BsSearch } from 'react-icons/bs'

function Stock() {
  let companies = [{
    name: 'RELIANCE',
    symbol: 'RELIANCE.BSE'
  }, {
    name: 'WIPRO',
    symbol: 'WIPRO.BSE'
  }, {
    name: 'INFOSYS',
    symbol: 'INFY.BSE'
  }, {
    name: 'HDFC BANK',
    symbol: 'HDFCBANK.BSE'
  }, {
    name: 'TCS',
    symbol: 'TCS.BSE'
  }, {
    name: 'TATA MOTORS',
    symbol: 'TATAMOTORS.BSE'
  }, {
    name: 'TATA POWER',
    symbol: 'TATAPOWER.BSE'
  }, {
    name: 'TECH MAHINDRA',
    symbol: 'TECHM.BSE'
  }];
  const [company, setCompany] = useState(
    {
      name: 'RELIANCE',
      symbol: 'RELIANCE.BSE',
      latestPrice: 0
    }
  )
  const [graphColor, setGraphColor] = useState('#81c995');
  const [list, setlist] = useState([]);
  const [suggestionList, setSuggestionList] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [isInputFocused, setInputFocus] = useState(false);
  const fetch = async (symbol, days) => {
    setLoading(true)
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {
        function: 'TIME_SERIES_DAILY_ADJUSTED',
        symbol: `${symbol}`,
        outputsize: 'compact',
        datatype: 'json'
      },
      headers: {
        'X-RapidAPI-Key': '11bb523631msh1a9fe002c29a832p1e05bdjsnd4bfb9b1cfad',
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
      }
    };
    try {
      axios.request(options)
        .then(({ data }) => {
          let l = Array(days), j = days - 1;
          for (let i in data["Time Series (Daily)"]) {
            l[j--] = [data["Time Series (Daily)"][i]["4. close"], i]
            if (j < 0)
              break;
          }
          setCompany((prev) => (
            {
              ...prev,
              latestPrice: l[days - 1][0]
            }
          ));
          setlist(l);
          if (l[0][0] < l[days - 1][0])
            setGraphColor('#81c995')
          else
            setGraphColor('#f93625')
          setLoading(false)
        })
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetch('RELIANCE.BSE', 7)
  }, [])
  let prices = {
    labels: list.map(x => {
      const parts = x[1].split('-');
      return `${parts[2]}-${parts[1]}-${parts[0]}`
    }),
    datasets: [{
      label: 'stock price',
      data: list.map(x => x[0]),
      borderColor: graphColor,
      backgroundColor: graphColor,
    }],
  }
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  }
  async function fetchSuggestions() {
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {
        keywords: `${query}`,
        function: 'SYMBOL_SEARCH',
        datatype: 'json'
      },
      headers: {
        'X-RapidAPI-Key': '11bb523631msh1a9fe002c29a832p1e05bdjsnd4bfb9b1cfad',
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
      }
    };

    try {
      const { data } = await axios.request(options);
      setSuggestionList(data.bestMatches)
    } catch (error) {
      console.error(error);
    }
  }
  async function handleChange(event) {
    const searchKeyword = event.target.value;
    setQuery(searchKeyword);
    if (searchKeyword === '') {
      setSuggestionList([])
      return
    }
  }
  function handleSearch(name, symbol) {
    setQuery('')
    setCompany({
      name,
      symbol,
      latestPrice: 0
    })
    fetch(symbol, 7)
  }
  function handleBlur() {
    setTimeout(() => {
      setInputFocus(false)
    }, 1000);
  }
  useEffect(() => {
    if (query === '') {
      setSuggestionList([])
      return;
    }
    let timeOutId = setTimeout(() => {
      fetchSuggestions()
    }, 300);
    return () => {
      clearTimeout(timeOutId)
    }
  }, [query])
  return (
    <VStack pt='3' fontFamily={'Roboto Slab'} alignItems='center'
    >
      <Heading textAlign='center' mt={{ base: '3vh' }}>Market Updates</Heading>
      {/* search & suggestion */}
      <Box m='auto' maxW={['95vw', '80vw']}
        pos='relative'
      >
        <InputGroup>
          <InputLeftElement m='0'>
            <BsSearch />
          </InputLeftElement>
          <Input placeholder='search any stock' textAlign='center' bgColor='whiteAlpha.300'
            fontWeight='semibold'
            isInvalid
            errorBorderColor='teal'
            onChange={(e) => handleChange(e)}
            value={query}
            minW={['90vw', '80vw']}
            onFocus={() => setInputFocus(true)}
            onBlur={handleBlur}
          />
        </InputGroup>
        <Box pos='absolute'
          top={'100%'}
          width='100%'
          bgColor='#c7c3c0'
          color='black'
          zIndex='10'
        >
          {isInputFocused && suggestionList.length > 0 &&
            suggestionList.map(e =>
              <HStack fontWeight='bold'
                onClick={() => handleSearch(e['2. name'], e['1. symbol'])}
                _hover={
                  { backgroundColor: '#fcf3ec' }
                }
                key={e['1. symbol']}
              >
                <Box
                  textAlign='left' m='1'
                  fontFamily={"'Roboto', sans-serif;"}
                  borderBottom='1px'
                  borderColor='gray.500'
                >{e['2. name']}</Box>
                <Text ml='2' display='inline' color='gray' fontSize='sm' fontFamily={"'Roboto', sans-serif;"}>
                  {e['4. region']}
                </Text>
              </HStack>
            )
          }
        </Box>
      </Box>
      {/* period & chart */}
      <Box display='flex' flexDir={['column', 'row']} maxW={['95vw', '80vw']}>
        < Box >
          <Box w={['90vw', '40vw']}>
            <Text ml={['1', '8']} fontSize={['3xl', '4xl', '5xl']}>{company.name}</Text>
            <HStack >
              <Link mr='2' fontSize={['sm', 'md', 'lg']} onClick={() => fetch(company.symbol, 7)}>
                <Tag size={['sm', 'md', 'lg']} fontWeight='bold' variant='solid' colorScheme='whatsapp'>
                  1 week
                </Tag>
              </Link>
              <Link mr='2' fontSize={['sm', 'md', 'lg']} onClick={() => fetch(company.symbol, 30)}>
                <Tag size={['sm', 'md', 'lg']} fontWeight='bold' variant='solid' colorScheme='whatsapp'>
                  1 month
                </Tag>
              </Link>
              <Link mr='2' fontSize={['sm', 'md', 'lg']} onClick={() => fetch(company.symbol, 60)}>
                <Tag size={['sm', 'md', 'lg']} fontWeight='bold' variant='solid' colorScheme='whatsapp'>
                  3 month
                </Tag>
              </Link>
            </HStack>
          </Box>
          <Box display='flex' flexDir={['column', 'row']} justifyContent={'space-between'}>
            <Box>
              <Box className='chart'
                w={{ base: "80vw", lg: "60vw" }}
                h='50vh'
              >
                {loading ? <Loading /> : <Line data={prices} options={chartOptions} />}
              </Box>
              <Text fontSize={['3xl', '4xl', '5xl']} textAlign='center'>Latest Price: {'\u20B9'}{company.latestPrice}</Text>
            </Box>
          </Box>
        </Box >
        {/* companies list */}
        <Box p='5' display='flex' flexDirection={'column'} justifyContent='center' alignItems='center' >
          <Text fontSize={['2xl', '3xl']}>Other Companies</Text>
          {companies.map((companyEle, i) => <Button key={i} onClick={() => handleSearch(companyEle.name, companyEle.symbol)} size='lg' mb='1'>{companyEle.name}</Button>)}
        </Box>
      </Box >
    </VStack >
  )
}

export default Stock