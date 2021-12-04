import React from 'react';
import styled from 'styled-components';
import { formatFileSize } from '@/utils/files';
import { format } from '@/utils/dates';
interface ITable {
  columns: string[];
  data: Array<{ [i: string]: any }>
}

type IProps = ITable;

const StyledTable = styled.table`
  margin: 20px;
  width: 600px;
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
  min-width: 250px;
  text-align: left;
  padding: 12px;
  &:nth-child(2) {
    min-width: 120px !important;
  }
  &:nth-child(4) {
    min-width: 120px !important;
  }
  &:nth-child(5) {
    min-width: 50px !important;
  }
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

export const Table: React.FC<IProps> = ({ columns, data }) => (
  <StyledTable>
    <tbody>
      <StyledTableRowHeader>
        {columns.map((column) => (
          <StyledTableHeader key={column}>{column}</StyledTableHeader>
        ))}
      </StyledTableRowHeader>
      {data.map((row) => (
          <StyledTableRow key={row.id}>
            <StyledTableData>{row.name}</StyledTableData>
            <StyledTableData>{formatFileSize(row.size)}</StyledTableData>
            <StyledTableData>{format(row.updatedAt, '{dd}.{MM}.{yyyy} {hh}:{mm}{tt}')}</StyledTableData>
            <StyledTableData>{row.format.toLowerCase()}</StyledTableData>
            <StyledTableData>
              <button type="submit">X</button>
            </StyledTableData>
        </StyledTableRow>
      ))}
    </tbody>
  </StyledTable>
);
