import React, { FC, useState, useEffect } from 'react';
import Header from './components/UI/header/Header';
import PeopleList from './components/UI/list/PeopleList';
import cl from './styles/App.module.css';
import { IPeople } from './types/types';
const App: FC<{}> = () => {
  const [peoples, setPeoples] = useState<IPeople[]>([]);
  const [page, setPage] = useState<number>(1);
  const [value, setValue] = useState<string>('');
  const pageNumbers = [];
  for (let i = 1; i <= 9; i += 1) {
    pageNumbers.push(i);
  }
  const fetchPeople = async (number: number, query?: string) => {
    let url;
    if (!query) {
      url = `https://swapi.dev/api/people/?page=${number}`;
    } else url = `https://swapi.dev/api/people/search=${query}`;
    await fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPeoples(data.results);
      });
  };
  const setFilterQuery = (query: string) => {
    console.log(query);
    setValue(query);
    fetchPeople(page, query);
  };
  useEffect(() => {
    fetchPeople(page);
  }, []);
  return (
    <div className={cl.app}>
      <Header />
      <div className={cl.search}>
        <input
          className={cl.input}
          placeholder="Поиск по имени"
          onChange={(event) => setFilterQuery(event.target.value)}
        ></input>
      </div>
      <PeopleList peoples={peoples} />
      <div className={cl.pages_bar}>
        {pageNumbers.map((number) => (
          <span
            onClick={() => {
              fetchPeople(number, value);
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
