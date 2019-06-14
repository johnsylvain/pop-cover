export const downloadImage = (data, filename) => {
  const a = document.createElement('a');
  a.href = data;
  a.download = filename;
  a.click();
};
