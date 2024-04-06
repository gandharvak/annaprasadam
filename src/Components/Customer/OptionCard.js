import React from 'react'
import { BsFilterRight } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineFoodBank } from 'react-icons/md';
import {
  Flex, Link, Button
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';


const OptionCard = () => {

  return (
    <Flex justifyContent="center" wrap="wrap" gap="4">
      <Link as={NavLink} to="/customer">
        <Button colorScheme='orange' leftIcon={<MdOutlineFoodBank />} >All Menus</Button>
      </Link>
      <Link as={NavLink} to="/customer/search-menu" >
      <Button colorScheme='orange' leftIcon={<BiSearch />} >Search Menus</Button>
      </Link>
      <Link as={NavLink} to="/customer/filter-menu" >
      <Button colorScheme='orange' leftIcon={<BsFilterRight />} >Filter</Button>
      </Link>
    </Flex>
  )
}

export default OptionCard
