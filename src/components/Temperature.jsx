import React from 'react'
import { Box, Button, Heading, Input, Text, VStack } from '@chakra-ui/react'
import { TiWeatherSnow, TiWeatherSunny, TiWeatherShower, TiWeatherCloudy, TiWeatherDownpour } from 'react-icons/ti'
import { BsSearch, BsSun, BsCloudHaze1 } from 'react-icons/bs'
import { GiDustCloud } from 'react-icons/gi'
import axios from 'axios';
import { useEffect } from 'react';

function Temperature() {
  const [city, setSearch] = React.useState('');
  const [json, setJson] = React.useState({ city: 'Bangalore', temp: 0, weather: 'loading...' })
  const [new_json, setNewJson] = React.useState({ city: 'Bangalore', temp: 0, weather: 'loading...', sunrise: '', sunset: '', temp_min: 0, temp_max: 0 })
  let fontList = ['sm', 'md', 'lg'];

  function weather(_city) {
    const fetch = async () => {
      const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${_city}&appid=3a9125c77b48ff205d4d0ca44b71a15d&units=metric`);
      if (data.name == 'Bengaluru') {
        setJson({
          city: data.name,
          temp: data.main.temp,
          weather: data.weather[0].main
        })
      }
      setNewJson({
        city: data.name,
        temp: data.main.temp,
        weather: data.weather[0].main,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        temp_min: data.main.temp_max,
        temp_max: data.main.temp_min,
      });
    }
    fetch();
  }
  useEffect(() => {
    weather('Bangalore')
  }, [])
  return (
    <>
      <Box m='3' fontFamily={'Roboto Slab'}>
        <Heading fontSize={['4xl', '6xl', '8xl', '9xl']} fontFamily={'Roboto Slab'} mb='5' size='4xl' textAlign='center' >
          Weather App
        </Heading>
        <Box display={'flex'} flexDirection={['column', 'row']} justifyContent='center' alignItems='center'>

          <Box
            w={['80%', '25%']}
            m='3'
            p='3'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            border='2px'
            borderRadius={20}
          >
            <Text textAlign='center' fontSize={['lg', '2xl', '3xl', '4xl', '5xl', '6xl']} mt='2' mb='2'>Search Cities</Text>
            <Input
              focusBorderColor='blue.400'
              value={city}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  weather(e.target.value)
                }
              }}
              onChange={(event) => setSearch(event.target.value)}
            />
            <Button size={fontList} onClick={() => weather(city)} leftIcon={<BsSearch />} >search</Button>
            <Text fontSize={['lg', '2xl', '3xl', '4xl', '5xl']}>{json.city}</Text>
            <Text fontSize={['lg', '2xl', '3xl', '4xl', '5xl', '6xl']} fontFamily={'Orbitron'}>
              {json.temp}{'\u00b0'}C
            </Text>
            <Text fontSize={['lg', '2xl', '3xl', '4xl', '5xl', '6xl']} fontFamily={'Orbitron'}>  {((json.temp * 9 / 5) + 32).toPrecision(4)}{'\u00b0'}F</Text>
            <Text fontSize={['lg', '2xl', '3xl', '4xl', '5xl', '6xl']}>{json.weather}</Text>
          </Box>

          <Box
            w={['80%', '45%']}
            m='2'
            border='2px'
            borderRadius={20}
          >
            <VStack>
              <Text fontSize={['lg', '2xl', '3xl', '4xl', '5xl', '6xl']}>
                {new_json.city}
              </Text>
              <Text fontSize={[ '3xl', '4xl', '5xl', '6xl', '8xl', '9xl']} fontFamily={'Orbitron'}>
                {new_json.temp}{'\u00b0'}C
              </Text>
              <Text fontSize={['lg', '2xl', '3xl', '4xl', '5xl']}>{new_json.weather}</Text>
              <Text fontSize={['lg', '2xl', '3xl', '4xl', '5xl']} fontFamily={'Orbitron'} >max:{new_json.temp_max}{'\u00b0'}C</Text>
              <Text fontSize={['lg', '2xl', '3xl', '4xl', '5xl']} fontFamily={'Orbitron'} >min:{new_json.temp_min}{'\u00b0'}C</Text>
            </VStack>
          </Box>

          <Box
            w={['80%', '25%']}
            m='2'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            border='2px'
            borderRadius={20}
          >
            {new_json.weather == 'Haze' && <BsCloudHaze1 size={80} />}
            {new_json.weather == 'Mist' && <GiDustCloud size={80} />}
            {new_json.weather == 'Snow' && <TiWeatherSnow size={80} />}
            {new_json.weather == 'Sunny' && <TiWeatherSunny size={80} />}
            {new_json.weather == 'Rain' && <TiWeatherShower size={80} />}
            {new_json.weather == 'Clouds' && <TiWeatherCloudy size={80} />}
            {new_json.weather == 'Clear' && <BsSun size={80} />}
            <Text fontSize={['lg', '2xl', '3xl', '4xl', '5xl', '6xl']}>sunrise</Text>
            <Text fontFamily={'Orbitron'} fontSize={['lg', '2xl', '3xl', '4xl', '5xl', '6xl']}>{new_json.sunrise}</Text>
            <Text fontSize={['lg', '2xl', '3xl', '4xl', '5xl', '6xl']}>sunset</Text>
            <Text fontFamily={'Orbitron'} fontSize={['lg', '2xl', '3xl', '4xl', '5xl', '6xl']}>{new_json.sunset}</Text>
          </Box>

        </Box>
      </Box>
    </>
  )
}

export default Temperature;
