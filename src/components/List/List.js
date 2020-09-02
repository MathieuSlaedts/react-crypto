import React, { Component } from "react";

export default class List extends Component {
  state = {};
  componentDidMount() {}

  handleSort = (slug, ev) => {
    ev.preventDefault();
    this.props.handleSort(slug);
  };

  handleChange = (id, ev) => {
    this.props.handleChange(id, ev.target.checked);
  };

  render() {
    const datas = this.props.allCurrencies;
    const show = this.props.show;
    //console.log(datas);
    return (
      <div className="list">
        <table>
          <thead>
            <tr>
              <th>Add to graph</th>
              {show.map((el, index) => (
                <th key={index}>
                  <span>{el.label} </span>
                  <button onClick={(ev) => this.handleSort(el.slug, ev)}>
                    Sort
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datas.map((currency, index) => (
              <tr key={currency.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(ev) => this.handleChange(currency.id, ev)}
                  />
                </td>
                {show.map((data) => (
                  <td key={currency.id + "_" + data.slug}>
                    {data.slug === "name" && (
                      <img
                        src={currency["image"]}
                        width={"24"}
                        height={"24"}
                        alt={"icon"}
                      />
                    )}
                    <span>{currency[data.slug]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
