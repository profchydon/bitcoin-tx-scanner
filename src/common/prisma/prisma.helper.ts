export const $exists = <T>(param: T[] | number): boolean => {
  if (typeof param === 'number') {
    return param > 0;
  }
  if (Array.isArray(param)) {
    return param.length > 0;
  }
  throw new Error('Invalid param passed into $exists function');
};
