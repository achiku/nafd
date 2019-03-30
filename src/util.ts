export const chunk = (arr: User[], size: number): User[][] => {
  return arr.reduce(
    (newarr, _, i) => (i % size ? newarr : [...newarr, arr.slice(i, i + size)]),
    [] as User[][]
  );
};

export interface User {
  firstName: string;
  lastName: string;
  company: string;
  job: string;
}

export const recordToUser = (objs: object[][]): User[] => {
  return objs.map(x => {
    const u: User = {
      lastName: x[0].toString(),
      firstName: x[1].toString(),
      company: x[2].toString(),
      job: x[3].toString()
    };
    return u;
  });
};
