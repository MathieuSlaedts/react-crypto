import React, { memo, useState, useEffect } from "react";
import "./styles.scss";
import axios from "axios";
import List from "./components/List/List";
import Graph from "./components/Graph/Graph";

export default memo(function App(props) {
  
  /*
   * Get the Api from the Local Storage or from Axios
   * Update the Api in the State
   * Update the Api in the Local Storage
   */
  const loadApi = async () => {
    let datas = [];
    if (isLocalStorage() === true) {
      datas = getDatasFromLocalStorage();
    } else {
      datas = await getDatasFromAxios();
    }
    updateApiInState(datas);
    updateLocalStorage(datas);
  };

  /*
   * Check if the local Storage is empty
   */
  const isLocalStorage = () => {
    const fromLocalStorage = JSON.parse(
      window.localStorage.getItem("cryptoAppDatas")
    );
    return fromLocalStorage !== null && fromLocalStorage.datas.length > 0
      ? true
      : false;
  };

  /*
   * Get Api from Local Storage
   */
  const getDatasFromLocalStorage = () => {
    const datasFromLocalStorage = JSON.parse(
      window.localStorage.getItem("cryptoAppDatas")
    );
    return datasFromLocalStorage.datas;
  };

  /*
   * Get Api from Axios
   */
  const getDatasFromAxios = async () => {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur"
    );
    return res.data;
  };

  /*
   * Update LocalStorage
   */
  const updateLocalStorage = (datas) => {
    const toLocalStorage = {
      time: Date.now(),
      datas: datas
    };
    window.localStorage.setItem(
      "cryptoAppDatas",
      JSON.stringify(toLocalStorage)
    );
  };

  /*
   * Update Api in the Sate
   */
  const updateApiInState = (apiDatas) => {
    setAllCoins(() => [...apiDatas]);
  };

  const handleFavs = (id, status) => {
    // console.log(id, status);

    if (status === true) {
      const newFav = [...allCoins].filter((el) => el.id === id);
      setFavCoins(() => [...favCoins, ...newFav]);
    } else {
      const newFav = [...favCoins].filter((el) => el.id !== id);
      setFavCoins(() => [...newFav]);
    }
  };

  const sortCoins = (slug) => {
    console.log("Sort by " + slug);
    const coins = [...allCoins].sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    updateApiInState(coins);
    updateLocalStorage(coins);
  };

  // STATES
  const [allCoins, setAllCoins] = useState([]);
  const [favCoins, setFavCoins] = useState([]);
  
  // USE EFFECTS
  useEffect( () => { loadApi() }, []);

  // RENDER
    return (
      <div className="App">
        <h1>Crypto</h1>
        <div>
          <List
            allCoins={allCoins}
            show={[
              { label: "Coin", slug: "name" },
              { label: "Current Price", slug: "current_price" },
              { label: "Total Volume", slug: "total_volume" }
            ]}
            handleChange={handleFavs}
            handleSort={sortCoins}
          />
          <Graph favCoins={favCoins} />
        </div>
      </div>
    );
});
