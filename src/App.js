import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Button, useColorMode } from "@chakra-ui/react"
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs"
import Temperature from "./components/Temperature"
import './styles.css'
import Loading from './components/Loading'
const CustomDrawer = React.lazy(() => import("./components/CustomDrawer"))
const Stock = React.lazy(() => import("./components/Stock"))
function App() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            <Button pos={'fixed'} top={"4"} right={'4'} zIndex={10} onClick={toggleColorMode} >{colorMode === 'light' ? <BsFillMoonStarsFill style={{ fontSize: 'x-large', color: colorMode === 'light' ? 'black' : 'white' }} /> : <BsFillSunFill style={{ fontSize: 'x-large', color: colorMode === 'light' ? 'black' : 'white' }} />}</Button>
            <Router>
                <Suspense fallback={<Loading />}>
                    <CustomDrawer />
                </Suspense>
                <Routes>
                    <Route path='/' element={<Temperature />} />
                    <Route path='/stock' element={
                        <Suspense fallback={<Loading />}>
                            <Stock />
                        </Suspense>} />
                </Routes>
            </Router>
        </>
    )
}

export default App
