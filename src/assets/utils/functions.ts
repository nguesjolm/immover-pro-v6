export const formatedDate = date => {
  return date?.split('T')[0]?.split('-').reverse().join('/');
};

export const formatPrice: any = (price: any) => {
  return price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
