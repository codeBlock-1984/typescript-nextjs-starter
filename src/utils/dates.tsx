import sugar from 'sugar';

export const format = (date: string | Date, format: string): string => {
  try {
    return sugar.Date.format(new Date(date), format);
  } catch (error) {
    return date.toString();
  }
}

