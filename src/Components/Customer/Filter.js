import React, { useState, useEffect } from 'react'
import Food from './Food'
import FilterCard from './FilterCard'
import Menu from '../../Menu'
import { nanoid } from 'nanoid'
import {
    Flex
  } from '@chakra-ui/react'
  
const Filter = () => {
    const [menuItems, setMenuItems] = useState([])
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        setMenuItems(Menu)
    }, [])

    return (
        <section className='container filter rounded animate__animated animate__fadeIn'>
                <Food setFilterCategory={setFilterCategory}/>
                <Flex wrap="wrap" gap="4" justifyContent="center">
                    {
                        filterCategory === '' ?
                            menuItems.map((item) => {
                                return (
                                    
                                    <FilterCard key={nanoid()} name={item.name} type={item.type} price={item.price} />
                                  
                                )
                            }) : menuItems.filter(item => item.type === filterCategory).map(filteredMenu => {
                                return (
                                    

                                    <FilterCard key={nanoid()} name={filteredMenu.name} type={filteredMenu.type} price={filteredMenu.price} />
                                   

                                )
                            })
                    }
                </Flex>
        </section>
    )
}

export default Filter
