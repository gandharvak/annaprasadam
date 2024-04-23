import React, { useState, useEffect } from 'react'
import Card from './Card';
import { Flex
} from '@chakra-ui/react'
import { nanoid } from 'nanoid'

const AllMenus = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [menus, setMenus] = useState([])

  const loadMenu = async () => {
    try {
      await fetch(`${apiUrl}/all-menu`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(async data => {
      let menuData = data.data;
      menuData.sort(function(a,b){
        return b.stars - a.stars;
      })
      console.log(menuData)
      setMenus(menuData);
    });

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadMenu();
  }, [])

  return (
    <div className='container animate__animated animate__fadeIn'>
      <h2 className='text-center mt-3 mb-3 py-1'>Today's Menu</h2>
      <Flex wrap="wrap" justifyContent="center" gap="4">
        {
          menus.length===0 ? 
          <div className='m-auto mt-3'>
              <h3 className='col-prim animate__animated animate__shakeX'>No Items</h3>
            </div>
           :
           menus.map((item) => {
            return (
              <Card key={nanoid()} email={item.email} name={item.name} menu={item.menu} price={item.price} stars={item.stars}/>
            )
          }) 
        }
      </Flex>

    </div>
  )
}

export default AllMenus
