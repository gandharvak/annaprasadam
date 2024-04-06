import React from 'react'
import { HiUserCircle } from 'react-icons/hi';
import {
    Flex, Text, Card
} from '@chakra-ui/react'

const ReviewCard = ({ review, author }) => {
    return (
        <Card className='animate__animated animate__flipInY' minWidth="200px" p="4" textAlign="center">

            <div class="card-body">
                <Text>{`"${review}"`}</Text>
                <Flex justifyContent="center" alignItems="center" gap="2">
                <HiUserCircle className='d-inline' color='orange'/>
                    <Text m="0" fontSize='xl'>{author}</Text>
                </Flex>
            </div>
        </Card>
    )
}

export default ReviewCard
