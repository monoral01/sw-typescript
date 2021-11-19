import React, { FC, useState, useEffect } from 'react';
import Header from './components/UI/header/Header';
import PeopleList from './components/UI/list/PeopleList';
import cl from './styles/App.module.css';
import { IPeople } from './types/types';
const App: FC<{}> = () => {
  const [peoples, setPeoples] = useState<IPeople[]>([]);
  const [page, setPage] = useState<number>(1);
  const pageNumbers = [];
  for (let i = 1; i <= 9; i += 1) {
    pageNumbers.push(i);
  }
  const fetchPeople = (number: number, filter?: string) => {
    const url = new URL(`https://swapi.dev/api/people/?page=${number}`);
    const params = new URLSearchParams(url.search.slice(1));
    if (filter) {
      params.append('search', filter);
    }
    fetch(String(url))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPeoples(data.results);
      });
  };
  useEffect(() => {
    fetchPeople(1);
  }, []);
  return (
    <div className={cl.app}>
      <Header />
      <PeopleList peoples={peoples} />
      <div className={cl.pages_bar}>
        {pageNumbers.map((number) => (
          <span
            onClick={() => {
              fetchPeople(number);
              return setPage(number);
            }}
            key={number}
            className={page === number ? cl.page_current : cl.page}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
