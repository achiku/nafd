import Slides = GoogleAppsScript.Slides.SlidesApp;
import Sheet = GoogleAppsScript.Spreadsheet.SpreadsheetApp;
import { chunk, recordToUser, User, writeToElement } from './util';

declare var global: any;

global.doGet = (): any => {
  const template = 'index';
  return HtmlService.createTemplateFromFile(template).evaluate();
};

global.processForm = (formObject: any): void => {
  Logger.log(formObject);
  global.createNamePlates(formObject.sheetId, formObject.slideId);
};

global.createNamePlates = (sheetId: string, slideId: string): void => {
  const sApp = SpreadsheetApp.openById(sheetId);
  const pApp = SlidesApp.openById(slideId);
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
