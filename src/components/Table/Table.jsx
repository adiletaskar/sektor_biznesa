import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableIcon from "../../assets/table_icon";
import { changePost } from "../../store/features/postSlice";
import styles from "./Table.module.css";
const Table = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.post);
  const [idDirection, setIdDirection] = useState("asc");
  const [titleDirection, setTitleDirection] = useState("asc");
  const [bodyDirection, setBodyDirection] = useState("asc");

  const idClick = () => {
    let newPosts = [...posts];

    if (idDirection === "asc") {
      newPosts = newPosts.sort((a, b) => {
        return b.id - a.id;
      });
      setIdDirection("desc");
    } else if (idDirection === "desc") {
      newPosts = newPosts.sort((a, b) => {
        return a.id - b.id;
      });
      setIdDirection("asc");
    }
    dispatch(changePost(newPosts));
  };

  const titleClick = () => {
    let newPosts = [...posts];

    if (titleDirection === "asc") {
      newPosts = newPosts.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      setTitleDirection("desc");
    } else if (titleDirection === "desc") {
      newPosts = newPosts.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
        return 0;
      });
      setTitleDirection("asc");
    }
    dispatch(changePost(newPosts));
  };

  const descClick = () => {
    let newPosts = [...posts];

    if (bodyDirection === "asc") {
      newPosts = newPosts.sort((a, b) => {
        if (a.body > b.body) {
          return 1;
        }
        if (a.body < b.body) {
          return -1;
        }
        return 0;
      });
      setBodyDirection("desc");
    } else if (bodyDirection === "desc") {
      newPosts = newPosts.sort((a, b) => {
        if (a.body > b.body) {
          return -1;
        }
        if (a.body < b.body) {
          return 1;
        }
        return 0;
      });
      setBodyDirection("asc");
    }
    dispatch(changePost(newPosts));
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th style={{ width: "8%" }} onClick={idClick}>
            <p>
              ID <TableIcon />
            </p>
          </th>
          <th style={{ width: "36%" }} onClick={titleClick}>
            <p>
              Заголовок <TableIcon />
            </p>
          </th>
          <th style={{ width: "36%" }} onClick={descClick}>
            <p>
              Описание <TableIcon />
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        {posts?.map((post) => {
          const { id, title, body } = post;
          return (
            <tr key={id}>
              <td className={styles.id}>{id}</td>
              <td>{title}</td>
              <td>{body}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
