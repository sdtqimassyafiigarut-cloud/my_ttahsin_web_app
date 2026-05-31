export const cn = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
