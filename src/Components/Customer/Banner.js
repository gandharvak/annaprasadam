import React from 'react'
import { MdFastfood } from 'react-icons/md';
import {
  Box, Heading, Text, Button, Link
} from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom';
const Banner = () => {
  const isLoggedIn = localStorage.getItem("auth_token") ? true : false
  const role = localStorage.getItem("role")
  return (
    <Box minH="100vh" className='bg-hero text-light d-flex align-items-center flex-column justify-content-center animate__fadeIn animate__animated'>
      <Heading className=''>Welcome to</Heading>
      <Heading color="orange.500" className="fw-bolder fs-1 fst-italic">Anna<Text as="span" color="orange.400">Prasadam</Text>
      <Text as="span"><MdFastfood className='fs-2 d-inline text-warning fa-fade ms-3' /></Text>
      </Heading>
      <Heading className='mt-3 mb-4 fw-normal fs-1 py-1 text-center lh-lg'>
        Your Menu is One Click Away...
        
      </Heading>
      <Link as={ReactLink} to={`${isLoggedIn ? (role === "owner" ? '/dashboard' : "/customer") : '/login'}`}>
        <Button colorScheme='orange'>Get Started</Button>
      </Link>
    </Box>
  )
}

export default Banner
