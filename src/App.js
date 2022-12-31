import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Button, useColorMode } from "@chakra-ui/react"

import Temperature from "./components/Temperature"
import CustomDrawer from "./components/CustomDrawer";
import Stock from "./components/Stock";
// import MyComponent from "./components/MyComponent";
function App() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Router>
            <CustomDrawer />
            <Button zIndex={10} onClick={toggleColorMode} pos={'fixed'} top={"4"} right={'4'}>{colorMode === 'light' ? 'Dark' : 'Light'}</Button>
            <Routes>
                <Route path='/' element={<Temperature />} />
                <Route path='/stock' element={<Stock />} />
            </Routes>
        </Router>
    )
}

export default App
