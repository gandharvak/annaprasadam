import React, { useState, useEffect } from "react";
import Food from "./Food";
import FilterCard from "./FilterCard";
import Menu from "../../Menu";
import { nanoid } from "nanoid";
import { Flex } from "@chakra-ui/react";
import { fetchAllMenus } from "../../Controllers/CustomerController/fetchAllMenus.js";

const Filter = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");

  const fetchAllMenus = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      await fetch(`${apiUrl}/all-menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          let menuData = data.data;
          menuData.sort(function (a, b) {
            return b.stars - a.stars;
          });
          console.log(menuData, "menuData");
          setMenuItems(menuData);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMenus();
    // setMenuItems(Menu);
  }, []);

  return (
    <section className="container filter rounded animate__animated animate__fadeIn">
      <Food setFilterCategory={setFilterCategory} />
      <Flex wrap="wrap" gap="4" justifyContent="center">
        {filterCategory === ""
          ? menuItems.map((item) => {
              return (
                <FilterCard
                  key={nanoid()}
                  name={item.menu}
                  type={item.type}
                  price={item.price}
                />
              );
            })
          : menuItems
              .filter((item) => item.type === filterCategory)
              .map((filteredMenu) => {
                return (
                  <FilterCard
                    key={nanoid()}
                    name={filteredMenu.menu}
                    type={filteredMenu.type}
                    price={filteredMenu.price}
                  />
                );
              })}
      </Flex>
    </section>
  );
};

export default Filter;
