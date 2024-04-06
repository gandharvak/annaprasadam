import React from 'react'
import { BiLogOut } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OptionCard from './OptionCard.js'
import {
  Heading, Text, Box, Flex
} from '@chakra-ui/react'

const Nav = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

  const loadName = async () => {
    let auth_token = localStorage.getItem('auth_token');
    await fetch('http://localhost:5000/get-customer', {

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
      <Flex className='container'>
        <Heading color="orange.500" className="flex-fill">Anna<Text as="span" color="orange.400">Prasadam</Text></Heading>
        <Text display={{ base: "none", md: "block" }} className='lead fw-normal'>Welcome, <Text as="span" color="orange.500">{name}</Text></Text>
        <BiLogOut onClick={logout} color='red' _hover={{color:"black"}} className='fs-4' />
      </Flex>
      <OptionCard />
    </Box>
  )
}

export default Nav
