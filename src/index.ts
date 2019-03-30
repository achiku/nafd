import Slides = GoogleAppsScript.Slides.SlidesApp;
import Sheet = GoogleAppsScript.Spreadsheet.SpreadsheetApp;
import { chunk } from './util';

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
  const tmpVals = sheet
    .getDataRange()
    .getValues()
    .filter((_x, idx) => {
      return idx != 0;
    })
    .map(x => {
      return [x[0].toString(), x[1].toString(), x[2].toString(), x[3].toString()];
    });
  const usersRecord = chunk(tmpVals, 2);
  console.log(usersRecord);
  usersRecord.forEach((users, idx) => {
    console.log(users);
    const s = pTmpl[0].duplicate();
    console.log(s.getObjectId());
    const user1 = users[0];
    let user2;
    if (users.length == 2) {
      user2 = users[1];
    }
    s.getPageElements().forEach(elem => {
      const txt = elem.asShape().getText();
      console.log(txt.asString());
      if (txt.asString() == '{{name1}}\n') {
        txt.setText(user1[0].toString() + user1[1].toString());
      }
      if (txt.asString() == '{{company1}}\n') {
        txt.setText(user1[2].toString());
      }
      if (txt.asString() == '{{job1}}\n') {
        txt.setText(user1[3].toString());
      }
      if (user2 != undefined) {
        if (txt.asString() == '{{name2}}\n') {
          txt.setText(user2[0].toString() + user2[1].toString());
        }
        if (txt.asString() == '{{company2}}\n') {
          txt.setText(user2[2].toString());
        }
        if (txt.asString() == '{{job2}}\n') {
          txt.setText(user2[3].toString());
        }
      }
    });
  });
};
