import { FC, useState, useEffect } from 'react';
import Header from './components/header/Header';
import PeopleList from './components/list/PeopleList';
import styles from './components/styles/App.module.css';
import { People } from './components/types/types';
import { fetchData } from './components/API/PostService';
const postPerPage = 10;
const initialPageNumber = 1;

export const App: FC = () => {
  const [peoples, setPeoples] = useState<People[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const setFilterQuery = (pageNumber: number, query: string) => {
    fetchData(pageNumber, query).then((data) => {
      const pagesCountOnRender = Math.ceil(data.count / postPerPage);
      setTotalPages(pagesCountOnRender);
      setPeoples(data.results);
    });
    setInputValue(query);
  };

  useEffect(() => {
    setFilterQuery(initialPageNumber, '');
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.search}>
        <input
          className={styles.input}
          placeholder="Поиск по имени"
          onChange={(event) =>
            setFilterQuery(initialPageNumber, event.target.value)
          }
        />
      </div>
      <PeopleList peoples={peoples} />
      <div className={styles.pages_bar}>
        {new Array(totalPages).fill(0).map((_, pageNumber) => (
          <span
            onClick={() => {
              setCurrentPage(pageNumber + 1);
              setFilterQuery(pageNumber + 1, inputValue);
            }}
            key={pageNumber + 1}
            className={
              currentPage === pageNumber + 1 ? styles.page_current : styles.page
            }
          >
            {pageNumber + 1}
          </span>
        ))}
      </div>
    </div>
  );
};
