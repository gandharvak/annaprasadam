import React, { useState } from 'react'
import Card from './Card'
import {
    Button, Input, Flex
} from '@chakra-ui/react'
const SearchMenu = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch('http://localhost:5000/find-menu', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ menu: query })
        }).then(res => res.json())
            .then(response => {
                let menuData = response.data;
                menuData.sort(function (a, b) {
                    return b.stars - a.stars;
                })
                setResults(menuData)

            })
            .catch(error => console.log(error));
    }
    return (
        <div className='container animate__animated animate__fadeIn'>
            <form className="d-flex mt-3 justify-content-center gap-3 flex-wrap" onSubmit={handleSubmit} >
                <Input type="search" maxW="400px" focusBorderColor='orange.400' placeholder="Search Food" value={query} onChange={handleInputChange} />
                <Button colorScheme='orange' type='submit'>Search</Button>
            </form>
            {results.length > 0 &&
                <><h3 className='mb-3 mt-3 py-1'>Search Result: </h3>
                    <Flex justifyContent="center" gap="4" wrap="wrap">
                        {results.map((element) => {

                            return (
                                    <Card email={element.email} name={element.name} menu={element.menu} price={element.price} stars={element.stars} />
                            )
                        })}
                    </Flex>
                </>
            }
            {
                results.length === 0 && <h3 className='mb-3 mt-3 py-1'> No Results </h3>
            }
        </div>
    )
}

export default SearchMenu
