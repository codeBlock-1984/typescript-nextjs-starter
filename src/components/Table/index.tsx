import React from 'react';
import styled from 'styled-components';

interface ITable {
  columns: string[];
}

type IProps = ITable;

const StyledTable = styled.table`
  border: 1px solid #efefef;
  border-radius: 6px;
  border-spacing: 1;
  border-collapse: collapse;
`;

const StyledTableRowHeader = styled.tr`
  background-color: #ffffff;
  font-family: Arial;
  color: #2d0d85;
`;

const StyledTableHeader = styled.th`
  min-width: 150px;
  text-align: left;
  padding: 12px;
`;

const StyledTableRow = styled.tr`
  background-color: #f6f6f6;
  font-family: Arial;
  color: #2d0d85;
`;

const StyledTableData = styled.td`
  padding: 12px;
  border: none;
`;

export const Table: React.FC<IProps> = ({ columns }) => (
  <StyledTable>
    <tbody>
      <StyledTableRowHeader>
        {columns.map((column) => (
          <StyledTableHeader>{column}</StyledTableHeader>
        ))}
      </StyledTableRowHeader>
      <StyledTableRow>
        <StyledTableData>TableRow</StyledTableData>
        <StyledTableData>TableRow</StyledTableData>
        <StyledTableData>TableRow</StyledTableData>
        <StyledTableData>TableRow</StyledTableData>
        <StyledTableData>
          <button type="submit">X</button>
        </StyledTableData>
      </StyledTableRow>
    </tbody>
  </StyledTable>
);
