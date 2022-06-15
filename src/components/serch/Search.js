import React, { useState, useEffect, useRef } from "react";

import classes from "./Search.module.css";

const Search = ({ TargetRequests, onAccept, onCancel, fieldToShow }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [showList, setShowList] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(false);
  const inputValueRef = useRef();

  useEffect(() => {
    const getAllData = async () => {
      const result = await TargetRequests.getAll(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGExZDViMDE5MGIyMTQzNjBkYzA1NyIsImlhdCI6MTY1NDQzOTcyOCwiZXhwIjoxNjYyMjE1NzI4fQ.19s4e2XIHqqXrQkM2tJ2-yFg9ZQyxpSx1Z0gc2381kc"
      );
      // console.log(result);
      setData(
        result.data.data.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    };

    let fetchData;
    fetchData = setTimeout(() => {
      // console.log("fetching");
      getAllData();
    }, 1000);

    return () => {
      clearTimeout(fetchData);
    };
  }, [search, TargetRequests]);

  const onSearchHandler = async (e) => {
    setSearch(e.target.value);
    if (search.length === 1) setShowList(false);
    else setShowList(true);
  };

  const selectItemHandler = (item) => {
    setSelectedItem(item);
    setShowList(false);
    inputValueRef.current.value = item[fieldToShow];
  };

  const onCancelHandler = () => {
    setShowList(false);
    setData([]);
    inputValueRef.current.value = "";
    onCancel();
  };

  const onAcceptHandler = () => {
    if (selectedItem) {
      setError(false);
      setShowList(false);
      setData([]);
      inputValueRef.current.value = "";
      onAccept(selectedItem);
    } else setError(true);
  };

  return (
    <div
      className={classes["search-wrapper"]}
      // onBlur={() => {
      //   setShowList(false);
      // }}
    >
      <section className={classes["search-section"]}>
        {error && <p>Debe seleccionar un item</p>}
        <input
          type="text"
          onChange={onSearchHandler}
          className={classes["search-input"]}
          placeholder="Sin Seleccionar"
          onFocus={() => {
            setShowList(true);
          }}
          ref={inputValueRef}
        />
        {showList && (
          <ul>
            {/* <li onClick={selectItemHandler.bind(null, null)}>
              <em>
                <strong>Sin seleccionar</strong>
              </em>
            </li> */}
            {data.map((item) => (
              <li
                key={item[fieldToShow]}
                onClick={selectItemHandler.bind(null, item)}
              >
                {item[fieldToShow]}
              </li>
            ))}
          </ul>
        )}
      </section>
      <button
        type="button"
        className={classes["button-cancel"]}
        onClick={onCancelHandler}
      >
        Cancelar
      </button>
      <button
        type="button"
        className={classes["button-accept"]}
        onClick={onAcceptHandler}
      >
        Aceptar
      </button>
    </div>
  );
};

export default Search;
