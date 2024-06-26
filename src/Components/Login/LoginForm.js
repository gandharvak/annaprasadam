import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    Heading,
    Button,
    Text,
    Input,
    Box,
    Flex,
} from '@chakra-ui/react'
import BG from '../../img/bg1.png'

export const LoginForm = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();
    const [rerender, setRerender] = useState(false);

    const isValid = () => {
        let email = formValue.email;
        let password = formValue.password;
        let valid = true;
        if (email.search(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-]+$/) === -1) {
            valid = false;
            setError({
                error: true,
                message: "Please provide a valid Email Id"
            });
        } else if (password.length < 8) {
            valid = false;
            setError({
                error: true,
                message: "The password should be at least 8 characters long"
            });
        }
        return valid;
    }
    const [error, setError] = useState({
        error: false,
        message: ''
    })

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
        role: 'customer'
    });

    const login = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        console.log(formValue)
        if (!isValid()) {
            setTimeout(() => { setError({ error: false, message: null }); setRerender(!rerender); }, 5000);
            setIsLoading(false)
        } else {
            await fetch(`${apiUrl}/login`, {

                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(formValue)
            }).then(res => res.json())
                .then(async data => {
                    if (!data.error) {
                        localStorage.setItem("auth_token", data.auth_token);
                        localStorage.setItem("role", data.role);
                        if (formValue.role === 'customer') {
                            navigate("/customer");
                            setIsLoading(false);

                        }
                        else {
                            navigate("/dashboard");
                            setIsLoading(false);
                        }
                    }
                    else {
                        setError({ error: true, message: "Invalid Credentials!" })
                        setTimeout(() => { setError({ error: false, message: null }); setRerender(!rerender); }, 2000);
                        setIsLoading(false)
                    }
                }).catch(error => {
                    console.log('error')
                    setError({ error: true, message: "Problem occured while reaching the server:( Check your internet connection !" })
                    setTimeout(() => { setError({ error: false, message: null }); setRerender(!rerender); }, 5000);
                    setIsLoading(false);
                });
        }

    }


    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabIndex) => {
        if (tabIndex === 1) {
            setFormValue({
                email: formValue.email,
                password: formValue.password,
                role: 'customer'
            });
        }
        else {
            setFormValue({
                email: formValue.email,
                password: formValue.password,
                role: 'owner'
            });
        }
        setActiveTab(tabIndex);
    }

    return (
        <Box className='d-flex justify-content-center align-items-center' minH="100vh" bgImage={BG}>
            <div className='d-flex flex-column align-items-center'>
                <Heading color="orange.500">Anna<Text as="span" color="orange.400">Prasadam</Text></Heading>
                <section className='login border p-3 rounded animate__animated animate__fadeIn bg-white'>
                    <h3 className='text-center mb-4'>Login</h3>
                    <div className='m-auto'>
                        <div className='d-flex gap-5 mb-4 justify-content-center align-item-center'>
                            <Button colorScheme={`${activeTab === 1 ? 'orange' : 'gray'}`} onClick={() => handleTabClick(1)} className={`rounded ${activeTab === 1 ? 'active-btn' : 'gray'}`}>Customer</Button>
                            <Button colorScheme={`${activeTab === 2 ? 'orange' : 'gray'}`} onClick={() => handleTabClick(2)} className={`rounded ${activeTab === 2 ? 'active-btn' : 'gray'}`}>Owner</Button>
                        </div>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <Input focusBorderColor='orange.300' type="email" className="form-control search" id="email" name="email" value={formValue.email} onChange={handleChange} aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <Input focusBorderColor='orange.300' type="password" id="password" name="password" value={formValue.password} onChange={handleChange} className="form-control search" />
                            </div>
                            <div className='text-center d-flex flex-column'>
                                <Button colorScheme='orange' onClick={login} isLoading={isLoading}>Login</Button>
                                <Flex gap={2} justifyContent="center" mt={4}>
                                    <Text>Don't have an account?</Text>
                                    <Link to='/signup'>Signup</Link>
                                </Flex>
                            </div>
                        </form>
                    </div>
                </section>
                {
                    error.error && <div className="alert alert-danger mt-2 text-center" role="alert">
                        {error.message}
                    </div>
                }
            </div>
        </Box>
    )
}
