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

export const writeToElement = (
  txt: GoogleAppsScript.Slides.TextRange,
  user1: User,
  user2: User
) => {
  if (txt.asString() == '{{name1}}\n') {
    txt.setText(user1.lastName + ' ' + user1.firstName);
  }
  if (txt.asString() == '{{company1}}\n') {
    txt.setText(user1.company);
  }
  if (txt.asString() == '{{job1}}\n') {
    txt.setText(user1.job);
  }
  if (txt.asString() == '{{name2}}\n') {
    txt.setText(user2.lastName + ' ' + user2.firstName);
  }
  if (txt.asString() == '{{company2}}\n') {
    txt.setText(user2.company);
  }
  if (txt.asString() == '{{job2}}\n') {
    txt.setText(user2.job);
  }
};
