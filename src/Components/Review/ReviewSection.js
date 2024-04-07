import React from 'react'
import { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm';
import {
    Heading, Flex
} from '@chakra-ui/react'
const ReviewSection = () => {

    const [data, setData] = useState([]);
    const loadData = async () => {
        let email = localStorage.getItem("findEmail");
        await fetch('https://annaprasadam.onrender.com/get-reviews', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ email: email })
        }).then(res => res.json())
            .then(async data => {
                setData(data.review);
                console.log(data.review);
            }).catch(error => {
                console.log('error');
            });
    }
    useEffect(() => {
        loadData();
    }, [ReviewForm]);

    var elementKey = 0;
    return (
        <>
            <Heading as='h1' size='xl' color="orange.600">Reviews</Heading>

            <hr />
            {data.length === 0 && <p className='lead fw-normal'>No Reviews</p>}
            <Flex wrap="wrap" justifyContent="center" gap="4">
                {

                    data.map((element) => {
                        return (
                                <ReviewCard key={elementKey++} review={element.review} author={element.author} />
                        )
                    })
                }
            </Flex>
        </>
    )
}

export default ReviewSection;
