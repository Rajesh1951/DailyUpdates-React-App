import { Button, Drawer, DrawerBody, useDisclosure, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerOverlay, VStack, useColorMode } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai'
function CustomDrawer() {
  const colorMode = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef()
  return (
    <>
      <Button pos='absolute' colorScheme={colorMode === 'light' ? 'black' : 'white'} top={'2'} zIndex={10} m={'4'} ref={btnRef} onClick={onOpen} variant='filled'>
        <AiOutlineMenu style={{ fontSize: 'x-large' }} />
      </Button >
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu </DrawerHeader>
          <DrawerBody>
            <VStack>
              <Link to={'/'} >
                <Button fontSize='xl' onClick={onClose}>
                  Weather
                </Button>
              </Link>
              <Link to={'/stock'} >
                <Button fontSize='xl' onClick={onClose}>
                  Stock
                </Button>
              </Link>
            </VStack>
          </DrawerBody>

        </DrawerContent>
      </Drawer >
    </>
  )
}

export default CustomDrawer;
