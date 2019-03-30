import { SheetService } from './sheet.service';

declare var global: any;

global.createNewFile = (): string => {
  Logger.log('test');
  const ss = SheetService.createInitialFile('New file');
  ss.getRange('A2').setValue('Happy gas!');
  return 'hello world';
};
