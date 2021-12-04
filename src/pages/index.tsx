import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import { Table } from '@/components/Table';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SelectFileContainer } from '@/containers/SelectFileContainer';
import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { getFileType, isValidFileType } from '@/utils/files';

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

const StyledWarn = styled.small`
  color: red;
  width: 300px;
  margin-bottom: 10px;
`;

const StyledAlert = styled.p`
  color: green;
  width: 300px;
  margin: 20px;
`;

interface IFile {
  id: number;
  name: string;
  size: number;
  format: string;
  createdAt: string;
  updatedAt: string;
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3600/api/v1/files');
  const files: IFile[] = (await res.json()).data.records;

  return {
    props: {
      files,
    },
  }
}

export default function Home({ files }: InferGetStaticPropsType<typeof getStaticProps>) {
  // initialize states
  const [state, setState] = useState(files);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState({});

  // component functions
  const resetWarn = () => setError('');

  const setWarn = (msg: string) => setError(msg);

  const resetAlert = () => setMessage('');

  // sets timed alert message
  const setAlert = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      resetAlert();
    }, 3000);
  };

  // sets selected file in state
  const setFile = (file: File) => {
    const parsedFile = {
      name: file.name,
      size: file.size,
      format: getFileType(file.type)
    };
    setSelectedFile(parsedFile);
  };

  // handles file upload process
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    resetWarn();
    const e = (event?.target as HTMLInputElement);
    if (e.files && e.files[0]) {
      const file = e.files[0];

      if (!isValidFileType(file)) {
        e.value = '';
        setWarn('Only doc, docx, pdf files are allowed');
        return;
      }
      setFile(file);
    }
  };

  // sends uploaded file to the server
  const handleSave = async () => {
    resetWarn();
    resetAlert();

    if (!Object.keys(selectedFile).length) {
      setError('You have not selected any file to save');
      return;
    }
    const data = selectedFile;

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data)
    };

    const res = await fetch('http://localhost:3600/api/v1/files', options);
    const json = (await res.json());
    if (json.status === 201) {
      setState([ json.data, ...state ]);
      handleReset();
      setAlert(json.message);
    }
  };

  // resets the file input and clears selected file from state
  const handleReset = () => {
    const input = (document.getElementById('fileInput') as HTMLInputElement);
    if (input?.value) {
      input.value = '';
    }
    setSelectedFile({});
  };

  // deletes a file
  const handleDelete = async (id: number) => {
    const options = {
      method: 'DELETE'
    };

    const res = await fetch(`http://localhost:3600/api/v1/files/${id}`, options);
    const json = (await res.json());
    if (json.status === 200) {
      setState(state.filter(i => i.id !== json.data.id));
      setAlert(json.message);
    }
  };


  return (
    <div>
      <Head>
        <title>Coding Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SelectFileContainer headline="Select a file">
        <StyledFileInput id="fileInput" type="file" onChange={(e) => handleUpload(e)} />
        <StyledWarn>{error}</StyledWarn>
        <StyledButtonWrapper>
          <PrimaryButton handler={handleReset}>Reset File</PrimaryButton>
          <PrimaryButton handler={handleSave}>Save File</PrimaryButton>
        </StyledButtonWrapper>
      </SelectFileContainer>
      <StyledAlert>{message}</StyledAlert>
      <StyledSubtitle>File History</StyledSubtitle>
      <Table
        columns={[`Filename`, `File Size`, `Last Modified`, `File Format`, ``]}
        data={state}
        handler={handleDelete}
      />
    </div>
  );
}
