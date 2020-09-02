import React, { Component } from "react";
import "./styles.scss";
import axios from "axios";
import List from "./components/List/List";
import Graph from "./components/Graph/Graph";

export default class App extends Component {
  state = {
    currencies: ["chainlink", "polkadot", "cosmos"],
    allCurrencies: [],
    favCurrencies: []
  };

  componentDidMount() {
    this.loadApi();
  }
  render() {
    return (
      <div className="App">
        <h1>Crypto</h1>
        <div>
          <List
            allCurrencies={this.state.allCurrencies}
            show={[
              { label: "Coin", slug: "name" },
              { label: "Current Price", slug: "current_price" },
              { label: "Total Volume", slug: "total_volume" }
            ]}
            handleChange={this.handleFavs}
            handleSort={this.sortCoins}
          />
          <Graph favCurrencies={this.state.favCurrencies} />
        </div>
      </div>
    );
  }

  /*
   * Get the Api from the Local Storage or from Axios
   * Update the Api in the State
   * Update the Api in the Local Storage
   */
  loadApi = async () => {
    let datas = [];
    if (this.isLocalStorage() === true) {
      datas = this.getDatasFromLocalStorage();
    } else {
      datas = await this.getDatasFromAxios();
    }
    this.updateApiInState(datas);
    this.updateLocalStorage(datas);
  };

  /*
   * Check if the local Storage is empty
   */
  isLocalStorage = () => {
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
  getDatasFromLocalStorage = () => {
    const datasFromLocalStorage = JSON.parse(
      window.localStorage.getItem("cryptoAppDatas")
    );
    return datasFromLocalStorage.datas;
  };

  /*
   * Get Api from Axios
   */
  getDatasFromAxios = async () => {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur"
    );
    return res.data;
  };

  /*
   * Update LocalStorage
   */
  updateLocalStorage = (datas) => {
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
  updateApiInState = (apiDatas) => {
    this.setState({ allCurrencies: apiDatas });
  };

  handleFavs = (id, status) => {
    // console.log(id, status);

    if (status === true) {
      const newFav = [...this.state.allCurrencies].filter((el) => el.id === id);
      this.setState({
        favCurrencies: [...this.state.favCurrencies, ...newFav]
      });
    } else {
      const newFav = [...this.state.favCurrencies].filter((el) => el.id !== id);
      this.setState({
        favCurrencies: [...newFav]
      });
    }
  };

  sortCoins = (slug) => {
    console.log("Sort by " + slug);
    const coins = [...this.state.allCurrencies].sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    this.updateApiInState(coins);
    this.updateLocalStorage(coins);
  };
}
