import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'
import BG from '../../img/bg1.png'
import {
  Box
} from '@chakra-ui/react'
const Home = () => {

  return (
    <>
      <Nav />
      <Box minH="100vh" bgImage={BG}>
        <Outlet />
      </Box>
    </>
  )
}

export default Home
