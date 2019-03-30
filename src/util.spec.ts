import { chunk, recordToUser, User } from './util';
jest.unmock('./util');

describe('util', () => {
  describe('chunk()', () => {
    const achiku: User = {
      firstName: 'akira',
      lastName: 'chiku',
      company: 'kanmu',
      job: 'eng'
    };
    const moqada: User = {
      firstName: 'masahiko',
      lastName: 'okada',
      company: 'kanmu',
      job: 'eng'
    };
    const knee: User = {
      firstName: 'yuki',
      lastName: 'ito',
      company: 'kanmu',
      job: 'eng'
    };
    it('even', () => {
      const d = [achiku, moqada];
      const a = chunk(d, 2);
      console.log(a);
    });
    it('odd', () => {
      const d = [achiku, moqada, knee];
      const a = chunk(d, 2);
      console.log(a);
    });
  });
  describe('recordToUser()', () => {
    it('test', () => {
      const d: object[][] = [
        [Object('akira'), Object('chiku'), Object('kanmu'), Object('eng')],
        [Object('masahiko'), Object('okada'), Object('kanmu'), Object('eng')]
      ];
      const a = recordToUser(d);
      console.log(a);
    });
  });
});
