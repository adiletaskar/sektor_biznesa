import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setDisplayedPages } from "../../store/features/postSlice";
import styles from "./Navigation.module.css";
const Navigation = () => {
  const navigate = useNavigate();
  let { page } = useParams();
  let currentPage = Number(page);
  const { displayedPages } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const prev = () => {
    if (currentPage === 1) return;
    navigate(`/posts/${currentPage - 1}`);
  };

  const next = () => {
    if (currentPage === 10) return;
    navigate(`/posts/${currentPage + 1}`);
  };

  const updateDisplayedPages = () => {
    let prev = currentPage - 1;
    let next = currentPage + 1;
    let center = currentPage;

    // Если текущая страница близка к первой странице
    if (currentPage < 3) {
      prev = 2;
      center = 3;
      next = 4;
    }
    // Если текущая страница близка к последней странице
    if (currentPage > 8) {
      prev = 7;
      center = 8;
      next = 9;
    }

    const pages = [];
    pages.push(prev);
    pages.push(center);
    pages.push(next);
    dispatch(setDisplayedPages(pages));
  };

  useEffect(() => {
    updateDisplayedPages();
  }, [page]);

  return (
    <div className={styles.container}>
      <a onClick={prev} className={styles.bold}>
        Назад
      </a>
      <div className={styles.displayedPages}>
        {currentPage === 1 ? <p className={styles.active}>1</p> : <p>1</p>}
        <span>...</span>
        {displayedPages?.map((item, index) => {
          if (item === currentPage)
            return (
              <p className={styles.active} key={index}>
                {item}
              </p>
            );
          return <p key={index}>{item}</p>;
        })}
        <span>...</span>
        {currentPage === 10 ? <p className={styles.active}>10</p> : <p>10</p>}
      </div>
      <a onClick={next} className={styles.bold}>
        Далее
      </a>
    </div>
  );
};

export default Navigation;
