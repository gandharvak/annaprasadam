import React from 'react'
import { BsCurrencyRupee } from 'react-icons/bs';
import {
  Card, Box, Heading, Text, Flex
} from '@chakra-ui/react'

const FilterCard = ({ name, type, price }) => {
  console.log("Type", type)
  return (
    <Card className='animate__animated animate__flipInY' width="200px" p="4" textAlign="center">
      <Box>
        <Heading as='h4' size='md' color="orange.600">{name}</Heading>
        <Flex justifyContent="center" alignItems="center" mb="2">
          <BsCurrencyRupee className='d-inline' />
          <Text m="0" fontSize='xl'>{price}</Text>
        </Flex>
        <Text className={`fs-6 ${type === 'veg' ? 'text-success' : 'text-danger'}`} >{type[0].toUpperCase() + type.slice(1)}</Text>
      </Box>
    </Card>
  )
}

export default FilterCard
