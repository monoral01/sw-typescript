import React from 'react';
import { Input } from '@mui/material';
import cl from './ListSearch.module.css';
export const ListSearch = () => {
  return (
    <div className={cl.search}>
      <Input />
    </div>
  );
};
