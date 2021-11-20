import { FC, useState, useEffect } from 'react';
import Header from './components/header/Header';
import PeopleList from './components/list/PeopleList';
import styles from './styles/App.module.css';
import { People } from './components/types/types';

const App: FC = () => {
  const [peoples, setPeoples] = useState<People[]>([]);
  const [queryValue, setQueryValue] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const page = 1;
  const [currentPage, setCurrentPage] = useState(1);
  // const pageNumbers = [...Array(totalPages)].map((v, i = 1) => i + 1);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const getURL = (pageNumber: number, query?: string) => {
    const baseURL = new URL('https://swapi.dev/api/people/');
    if (!query) {
      baseURL.searchParams.set('page', String(pageNumber));
      console.log('if query is not append', query, baseURL);
    } else {
      baseURL.searchParams.set('search', query);
      baseURL.searchParams.set('page', String(pageNumber));
      console.log('if query is append', query, baseURL);
    }
    return String(baseURL);
  };

  const fetchPeopleData = async (pageNumber: number, query?: string) => {
    const url = getURL(pageNumber, query);
    await fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTotalPages(Math.ceil(data.count / limit));
        setPeoples(data.results);
      });
  };

  const setFilterQuery = (pageNumber: number, query: string) => {
    fetchPeopleData(pageNumber, query);
    setQueryValue(query);
  };

  useEffect(() => {
    fetchPeopleData(page);
  }, []);

  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.search}>
        <input
          className={styles.input}
          placeholder="Поиск по имени"
          onChange={(event) => setFilterQuery(page, event.target.value)}
        />
      </div>

      <PeopleList peoples={peoples} />

      <div className={styles.pages_bar}>
        {pageNumbers.map((number) => (
          <span
            onClick={() => {
              setCurrentPage(number);
              setFilterQuery(number, queryValue);
              console.log(page);
            }}
            key={number}
            className={
              currentPage === number ? styles.page_current : styles.page
            }
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
