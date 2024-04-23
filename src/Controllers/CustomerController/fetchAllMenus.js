exports.fetchAllMenus = async (setMenuItems) => {
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
        console.log(menuData, "i am menu data");
        setMenuItems(menuData);
      });
  } catch (error) {
    console.log(error);
  }
};
