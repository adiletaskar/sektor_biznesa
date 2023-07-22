import React from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "../../assets/search_icon";
import { changeText } from "../../store/features/postSlice";
import styles from "./Search.module.css";
const Search = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(changeText(e.target.value));
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="Поиск"
        onChange={(e) => handleChange(e)}
      />
      <SearchIcon />
    </div>
  );
};

export default Search;
