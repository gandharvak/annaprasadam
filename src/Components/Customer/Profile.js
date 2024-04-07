import React from 'react'
import { MdOutlineRestaurant } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsCurrencyRupee, BsPinMapFill } from 'react-icons/bs';
import ReviewForm from "../Review/ReviewForm";
import ReviewSection from '../Review/ReviewSection';
import { AiFillStar } from 'react-icons/ai'
import {
    Heading, Text, Flex, Badge
} from '@chakra-ui/react'
const Profile = () => {
    let navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        menu: "",
        description: "",
        address: "",
        price: "",
        location: "",
        stars: 0
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const loadProfile = async () => {
        let findEmail = localStorage.getItem("findEmail");
        if (!findEmail) {
            navigate('/home');
        }
        await fetch('https://annaprasadam.onrender.com/get-hotel', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ email: findEmail })
        }).then(res => res.json())
            .then(async data => {
                let resData = data.data;
                console.log(resData)
                setData({
                    name: resData.name,
                    menu: resData.menu,
                    price: resData.price,
                    description: resData.description,
                    address: resData.address,
                    location: resData.location,
                    stars: resData.stars
                });
            }).catch(error => {
                console.log('error');
            });
    }

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <>
            <div className='container d-flex justify-content-center'>
                <Flex className='animate__animated animate__fadeIn' gap="4" wrap="wrap" justifyContent="center">
                    <div className='border rounded p-3 position-relative mb-2 bg-white'>
                        <Flex className='d-flex align-items-center gap-3'>
                            <div>
                                <MdOutlineRestaurant className='fs-1' color='orange' />
                            </div>
                            <div>
                                <Heading as='h1' size='xl' color="orange.600">{capitalizeFirstLetter(data.name)}</Heading>

                                <Text m="0" fontSize='xl'>{data.menu}</Text>

                                <Flex alignItems="center">
                                    <BsCurrencyRupee className='d-inline' />
                                    <Text m="0" fontSize='xl'>{data.price}</Text>
                                </Flex>
                            </div>
                        </Flex>
                        <hr></hr>
                        <div className='text-center'>
                            <div className='mt-2'>
                                <Text m="0" fontSize='xl' color="orange.500">About: <Text as='span' color="black">{data.description}</Text></Text>
                            </div>
                            <div className='mt-2'>
                                <Text m="0" fontSize='xl' color="orange.500">Address: <Text as='span' color="black">{data.address}</Text></Text>
                            </div>
                            <a href={data.location}><p className='fs-5 fw-normal mt-3' style={{ cursor: "pointer" }}>Find on Map <BsPinMapFill className='fs-4 d-inline' /></p></a>
                        </div>
                        <Badge ml='1' colorScheme='orange' p="1" position="absolute" top="-2" right="4">
                            <AiFillStar className='d-inline' /> {data.stars}
                        </Badge>
                    </div>
                    <div>
                        <ReviewForm email={localStorage.getItem("findEmail")} />
                    </div>
                </Flex>
            </div>
            <div className='container'>
                <ReviewSection />
            </div>
        </>
    )
}

export default Profile
