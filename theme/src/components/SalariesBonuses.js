// src/components/SalariesBonuses.js
import React from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const SalariesBonuses = () => {
  return (
    <Paper elevation={4} style={{ padding: '30px', marginTop: '20px', animation: 'fadeIn 1.5s ease-out' }}>
      <Typography variant="h4" align="center" style={{ color: '#004D40' }}>Salaries & Bonuses</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Bonus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Employee 1</TableCell>
              <TableCell>$50,000</TableCell>
              <TableCell>$5,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SalariesBonuses;
