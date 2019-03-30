import { chunk } from './util';
jest.unmock('./util');

describe('util', () => {
  describe('chunk()', () => {
    it('even', () => {
      const d = [
        ['akira', 'chiku', 'kanmu', 'coo'],
        ['masahiko', 'okada', 'kanmu', 'eng'],
        ['hiroaki', 'sano', 'kanmu', 'eng'],
        ['yuki', 'ito', 'kanmu', 'eng']
      ];
      const a = chunk(d, 2);
      console.log(a);
    });
    it('odd', () => {
      const d = [
        ['akira', 'chiku', 'kanmu', 'coo'],
        ['masahiko', 'okada', 'kanmu', 'eng'],
        ['hiroaki', 'sano', 'kanmu', 'eng']
      ];
      const a = chunk(d, 2);
      console.log(a);
    });
  });
});
