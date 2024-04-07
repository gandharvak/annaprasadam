import React, { useState } from 'react'
import { useEffect } from 'react';
import {
    Flex,
    Button,
    Heading,
    Card
} from '@chakra-ui/react'

const UpdateMenuForm = () => {

    const [rerender, setRerender] = useState(false);
    const [notification, setNotification] = useState({
        state: false,
        message: ''
    })
    const [formValue, setFormValue] = useState({
        price: '',
        menu: ''
    });

    const loadMenu = async () => {
        let auth_token = localStorage.getItem('auth_token');
        if (!auth_token) {
            // eslint-disable-next-line no-restricted-globals
            location.assign('/');
        }
        await fetch('http://localhost:5000/get-menu', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ auth_token: auth_token })
        }).then(res => res.json())
            .then(async data => {
                console.log(data);
                setFormValue({
                    menu: data.menu,
                    price: data.price
                });
            }).catch(error => {
                console.log('error');
            });
    }
    useEffect(() => {
        loadMenu();
    }, []);


    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async () => {
        try {
            let auth_token = localStorage.getItem('auth_token');
            await fetch('https://annaprasadam.onrender.com/update-menu', {

                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    auth_token: auth_token,
                    menu: formValue.menu,
                    price: formValue.price
                })
            }).then(res => res.json())
                .then(async (data) => {
                    if (!data.error) {
                        setNotification({ state: true, message: "Menu Updated Successfully!" })
                        setTimeout(() => { setNotification({ state: false, message: null }); setRerender(!rerender); }, 2000);
                    }

                }).catch(error => {
                    console.log('error')

                });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                notification.state && <div className="alert alert-success mt-2 text-center" style={{ position: "absolute", zIndex: "2" }} role="alert">
                    {notification.message}
                </div>
            }
            <Flex minH="100vh" justifyContent="center" alignItems="center" className='animate__animated animate__fadeIn'>
                <Card style={{ minWidth: "400px" }} p="4"  boxShadow='lg'>
                <Heading color="orange.500" className='text-center' mb="4">Update Menu</Heading>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Menu</label>
                            <input type="text" className="form-control search" id="menu" name="menu" value={formValue.menu} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input type="text" className="form-control search" id="price" name="price" value={formValue.price} onChange={handleChange} />
                        </div>
                        <div className='text-center'>
                            <Button colorScheme="orange" onClick={(e) => { e.preventDefault(); handleSubmit() }} className="mb-2">Update</Button>
                        </div>
                    </form>
                </Card>
            </Flex>
        </>
    )
}

export default UpdateMenuForm
