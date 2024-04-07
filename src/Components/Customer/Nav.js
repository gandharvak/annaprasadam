import React from 'react'
import { BiLogOut, BiMenu } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OptionCard from './OptionCard.js'
import { BsFilterRight } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineFoodBank } from 'react-icons/md';
import {
  Heading, Text, Box, Flex, IconButton, Link, Button, useDisclosure, Fade
} from '@chakra-ui/react'
import { MdClose } from 'react-icons/md';
import { NavLink } from 'react-router-dom';


const Nav = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [displayMobileMenu, setDisplayMobileMenu] = useState("none");
  const { isOpen, onToggle } = useDisclosure()

  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

  const loadName = async () => {
    let auth_token = localStorage.getItem('auth_token');
    await fetch('https://annaprasadam.onrender.com/get-customer', {

      method: "POST",

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ auth_token: auth_token })
    }).then(res => res.json())
      .then(async data => {
        setName(data.data.name);
      }).catch(error => {
        console.log('error')

      });
  }
  useEffect(() => {
    loadName();
  }, []);

  return (
    <Box p="4" mb="6" shadow="md" position="sticky" top="0" zIndex="1" bg="white">
      <Flex className='container' gap="3" alignItems="center">
        <Heading color="orange.500" className="flex-fill">Anna<Text as="span" color="orange.400">Prasadam</Text></Heading>
        <IconButton display={{ base: "flex", sm: "flex", md: "none", }} aria-label='menu' icon={<BiMenu />}
          onClick={() => { setDisplayMobileMenu("flex"); onToggle() }} />
        <Text m={0} display={{ base: "none", md: "block" }} className='lead fw-normal'>Welcome, <Text as="span" color="orange.500">{name}</Text></Text>
        <IconButton color='red' display={{ base: "none", md: "flex" }} background="transparent" fontSize='20px' aria-label='logout' _hover={{ color: "black" }} icon={<BiLogOut />}
          onClick={logout} />
      </Flex>
      <OptionCard />

      <Fade in={isOpen}>
        <Flex
          h="100vh"
          w="100vw"
          position="fixed"
          top="0"
          left="0"
          zIndex={1}
          bg="white"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          display={displayMobileMenu}
        >
          <IconButton position="fixed" right={6} top={6} aria-label='menu' icon={<MdClose />}
            onClick={() => { setDisplayMobileMenu("none"); onToggle() }}
          />
          <Flex justifyContent="center" alignItems="center" flexDir="column" wrap="wrap" gap="4">
            <Heading color="orange.600">Menus</Heading>
            <Link as={NavLink} to="/customer">
              <Button colorScheme='orange' leftIcon={<MdOutlineFoodBank />} >All Menus</Button>
            </Link>
            <Link as={NavLink} to="/customer/search-menu" >
              <Button colorScheme='orange' leftIcon={<BiSearch />} >Search Menus</Button>
            </Link>
            <Link as={NavLink} to="/customer/filter-menu" >
              <Button colorScheme='orange' leftIcon={<BsFilterRight />} >Filter</Button>
            </Link>
            <Button colorScheme='red' leftIcon={<BiLogOut />} variant='outline' onClick={logout}>Logout</Button>
          </Flex>
        </Flex>
      </Fade>
    </Box>
  )
}

export default Nav
