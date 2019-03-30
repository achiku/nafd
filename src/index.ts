import Slides = GoogleAppsScript.Slides.SlidesApp;
import Sheet = GoogleAppsScript.Spreadsheet.SpreadsheetApp;
import { chunk, recordToUser, User, writeToElement } from './util';

declare var global: any;

global.presentation = (presentationId: string): void => {
  const p = SlidesApp.openById(presentationId);
  const tmp = p.getSlides().filter((_x, idx) => {
    return idx == 0;
  });
  tmp[0].duplicate();
  p.getSlides().forEach(slide => {
    slide.getPageElements().forEach(elem => {
      const txt = elem.asShape().getText();
      console.log(txt.asString());
      txt.setText('test from gas');
    });
  });
};

global.sheet = (sheetId: string): void => {
  const ss = SpreadsheetApp.openById(sheetId);
  const s = ss.getActiveSheet();
  const vals = s
    .getDataRange()
    .getValues()
    .filter((_x, idx) => {
      return idx != 0;
    });
  console.log(vals);
  vals.forEach(elem => {
    console.log(elem[0]);
    console.log(elem[1]);
    console.log(elem[2]);
  });
};

global.createNamePlates = (sheetId: string, presentationId: string): void => {
  const sApp = SpreadsheetApp.openById(sheetId);
  const pApp = SlidesApp.openById(presentationId);
  const pTmpl = pApp.getSlides().filter((_x, idx) => {
    return idx == 0;
  });
  const sheet = sApp.getActiveSheet();
  const usersRecords = recordToUser(
    sheet
      .getDataRange()
      .getValues()
      .filter((_x, idx) => {
        return idx != 0;
      })
  );
  const usersRecord = chunk(usersRecords, 2);
  usersRecord.forEach((users, idx) => {
    const s = pTmpl[0].duplicate();
    const user1 = users[0];
    const user2 =
      users.length == 2
        ? users[1]
        : { firstName: 'none', lastName: 'none', company: 'none', job: 'none' };

    s.getPageElements().forEach(elem => {
      const txt = elem.asShape().getText();
      writeToElement(txt, user1, user2);
    });
  });
};
