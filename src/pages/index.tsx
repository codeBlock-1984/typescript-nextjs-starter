import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
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

const StyledSubtitle = styled.h2`
  font-size: 18px;
  color: #2d0d85;
  font-family: Arial;
  margin: 20px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;

`;

interface File {
  id: number;
  name: string;
  size: number;
  format: string;
  createdAt: string;
  updatedAt: string;
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3600/api/v1/files');
  const files: File[] = (await res.json()).data.records;

  return {
    props: {
      files,
    },
  }
}

export default function Home({ files }: InferGetStaticPropsType<typeof getStaticProps>) {
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
      <StyledSubtitle>File History</StyledSubtitle>
      <Table
        columns={[`Filename`, `File Size`, `Last Modified`, `File Format`, ``]}
        data={files}
      />
    </div>
  );
}
