import Head from 'next/head';
import { Table } from '@/components/Table';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SelectFileContainer } from '@/containers/SelectFileContainer';
import styled from 'styled-components';

const StyledFileInput = styled.input`
  border: 1px solid #979797;
  border-radius: 6px;
  padding: 12px 24px;
  margin: 12px 0;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Coding Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SelectFileContainer headline="Select a file">
        <StyledFileInput type="file" />
        <StyledButtonWrapper>
          <PrimaryButton>Reset File</PrimaryButton>
          <PrimaryButton>Save File</PrimaryButton>
        </StyledButtonWrapper>
      </SelectFileContainer>
      <Table
        columns={[`Filename`, `File Size`, `Last Modified`, `File Format`, ``]}
      />
    </div>
  );
}
