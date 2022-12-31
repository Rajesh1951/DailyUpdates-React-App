import { Button, Drawer, DrawerBody, useDisclosure, DrawerContent, DrawerFooter, DrawerCloseButton, DrawerHeader, DrawerOverlay, VStack } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai'

function CustomDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef()

    return (
        <>
            <Button pos='sticky' zIndex={10} m={'4'} ref={btnRef} colorScheme='teal' onClick={onOpen} variant='outline'>
                <AiOutlineMenu />
            </Button>
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
                            <Button onClick={onClose}>
                                <Link to={'/'} >
                                    Weather
                                </Link>
                            </Button>
                            <Button onClick={onClose}>
                                <Link to={'/stock'} >
                                    stock
                                </Link>
                            </Button>
                        </VStack>
                    </DrawerBody>

                </DrawerContent>
            </Drawer >
        </>
    )
}

export default CustomDrawer;
