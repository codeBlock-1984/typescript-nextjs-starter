const GB_TO_BYTES_RATIO = 1073741824;
const MB_TO_BYTES_RATIO = 1048576;
const KB_TO_BYTES_RAIO = 1024;

const validExtensions = [
  `application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
  `application/msword`,
  `application/pdf`,
];

const fileTypes: { [key: string]: unknown } = {
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/msword': 'doc',
  'application/pdf': 'pdf'
};

export const isValidFileType = (file: File) =>
  validExtensions.indexOf(file.type) > -1;

export const getFileType = (fileType: string) => 
  fileTypes[fileType];

export const formatFileSize = (bytes: number): string => {
  if (bytes / GB_TO_BYTES_RATIO > 1) {
    return `${(bytes / GB_TO_BYTES_RATIO).toFixed(2)} GB`;
  }
  if (bytes / MB_TO_BYTES_RATIO > 1) {
    return `${(bytes / MB_TO_BYTES_RATIO).toFixed(2)} MB`;
  }

  if (bytes / KB_TO_BYTES_RAIO > 1) {
    return `${(bytes / KB_TO_BYTES_RAIO).toFixed(2)} KB`;
  }
  return `${bytes.toFixed(2)} B`;
};
