import React from 'react'
import {
  Button, Radio, RadioGroup, Stack, Flex
} from '@chakra-ui/react'

const Food = ({ setFilterCategory }) => {
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value)
  }

  return (
    <Flex justifyContent="center" alignItems="center" gap="4" mb="4" wrap="wrap">
      <Flex wrap="wrap">
        <RadioGroup defaultValue='veg'>
          <Stack spacing={6} direction='row'>
            <Radio colorScheme='orange' name="category" id="veg" value='veg' onChange={handleChange}>
              Veg
            </Radio>
            <Radio colorScheme='orange' name="category" id="nonveg" value='nonveg' onChange={handleChange}>
              Non Veg
            </Radio>
            <Radio colorScheme='orange' name="category" id="vegan" value='vegan' onChange={handleChange}>
              Vegan
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>

      <Button colorScheme='orange' type="submit" onClick={() => {
        setFilterCategory(category)
      }}> Apply </Button>
    </Flex>
  )
}

export default Food
