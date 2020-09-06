import React from "react";

export default function List(props) {

  const handleSort = (slug, ev) => {
    ev.preventDefault();
    props.handleSort(slug);
  };

  const handleChange = (id, ev) => {
    props.handleChange(id, ev.target.checked);
  };
    const datas = props.allCoins;
    const show = props.show;
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
                    onChange={(ev) => handleChange(currency.id, ev)}
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
};
