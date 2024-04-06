import React from 'react'
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Link,
    Flex,
    Text,
    IconButton
} from '@chakra-ui/react'
import { Link as ReactRouterLink, Outlet, useNavigate } from 'react-router-dom'

import { useDisclosure } from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'
import BG from '../../img/bg1.png'
import { BiLogOut } from 'react-icons/bi'

const Dashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <Box>
            <Box bg='orange.500' w='100%' position="fixed" top="0" zIndex="1" p={4} color='white'>
                <Flex alignItems="center" gap="2">

                    <Button size='md' fontSize="1.3rem" ref={btnRef} color="white" background="transparent" _hover={{
                        background: "transparent",
                        color: "orange.100"
                    }} onClick={onOpen}>
                        <MdMenu />
                    </Button>
                    <Text m="0" fontSize='3xl' fontWeight="bold">Anna<Text as="span" color="orange.100">Prasadam</Text></Text>
                </Flex>
                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Dashboard</DrawerHeader>

                        <DrawerBody>
                            <Flex flexDirection="column" gap="4">
                            <Link as={ReactRouterLink}
                                    to="/dashboard"
                                    color="white"
                                    _hover={{
                                        color: "white",
                                    }}>
                                    <Box background="orange.500" p="4" borderRadius=".5rem"
                                        _hover={{
                                            background: "orange.300",
                                            transitionDuration: '.4s',
                                            transitionTimingFunction: "ease-in-out"
                                        }}>
                                        Profile
                                    </Box>
                                </Link>

                                <Link as={ReactRouterLink}
                                    to="/dashboard/menu"
                                    color="white"
                                    _hover={{
                                        color: "white",
                                    }}>
                                    <Box background="orange.500" p="4" borderRadius=".5rem"
                                        _hover={{
                                            background: "orange.300",
                                            transitionDuration: '.4s',
                                            transitionTimingFunction: "ease-in-out"
                                        }}>
                                        Update Menu
                                    </Box>
                                </Link>
                            </Flex>

                        </DrawerBody>

                        <DrawerFooter>
                                <IconButton isRound={true}
                                    variant='solid'
                                    colorScheme='red'
                                    aria-label='Done'
                                    fontSize='20px'
                                    icon={<BiLogOut />}
                                    onClick={logout}
                                    />
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Box>
            <Box minH="100vh" bgImage={BG}>
                <Outlet />
            </Box>
        </Box >
    )
}

export default Dashboard