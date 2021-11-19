import { FC } from 'react';
import { Typography, AppBar } from '@mui/material';
import cl from './Header.module.css';
import { ListSearch } from '../search/ListSearch';
const Header: FC<{}> = () => {
  return (
    <div>
      <AppBar>
        <Typography className={cl.page_text} variant="h4">
          Star Wars
        </Typography>
        <ListSearch></ListSearch>
      </AppBar>
    </div>
  );
};
export default Header;
