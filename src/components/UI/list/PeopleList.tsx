import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { People } from '../../../types/types';
import styles from './PeopleList.module.css';
interface PeopleListProps {
  peoples: People[];
}
const PeopleList: FC<PeopleListProps> = ({ peoples }) => {
  return (
    <div className={styles.table}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell align="center">Пол</TableCell>
              <TableCell align="center">Вес</TableCell>
              <TableCell align="center">Цвет глаз</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {peoples.map((person, index) => (
              <TableRow key={index}>
                <TableCell>{person.name}</TableCell>
                <TableCell align="center">{person.gender}</TableCell>
                <TableCell align="center">{person.mass}</TableCell>
                <TableCell align="center">{person.eye_color}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PeopleList;
