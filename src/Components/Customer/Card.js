import React from 'react'
import { BsCurrencyRupee } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai'
import {
    Card as ChakraCard, Button, Heading, Text, Flex, Badge
} from '@chakra-ui/react'
const Card = ({ email, name, menu, price, stars }) => {
    let navigate = useNavigate();
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const openProfile = () => {
        localStorage.setItem('findEmail', email);
        navigate('/customer/profile');
    }
    return (
        <>
            <ChakraCard key={email} className='animate__animated animate__flipInY' width="200px" p="4" textAlign="center">
                <Flex className='card-body text-center' flexDirection="column">
                    <Heading as='h1' size='md' color="orange.600">{capitalizeFirstLetter(name)}</Heading>

                    <Text m="0" fontSize='xl'>{menu}</Text>

                    <Flex justifyContent="center" alignItems="center" mb="2">
                        <BsCurrencyRupee className='d-inline' />
                        <Text m="0" fontSize='xl'>{price}</Text>
                    </Flex>
                    <Button onClick={openProfile} colorScheme='orange'>Explore</Button>
                </Flex>
                <Badge ml='1' colorScheme='orange' p="1" position="absolute" top="-2" right="4">
                       <AiFillStar className='d-inline'/> {stars}
                        </Badge>
            </ChakraCard>
        </>
    )
}

export default Card
