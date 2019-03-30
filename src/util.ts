export const chunk = (arr: string[][], size: number): string[][][] => {
  return arr.reduce(
    (newarr, _, i) => (i % size ? newarr : [...newarr, arr.slice(i, i + size)]),
    [] as string[][][]
  );
};

type User = {
  firstName: string;
  lastName: string;
  company: string;
  job: string;
};
