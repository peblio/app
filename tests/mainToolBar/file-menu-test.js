import { ClientFunction, Selector } from 'testcafe';

import config from '../config';
import { exampleUser, studentUser } from '../fixtures/user';
import { seedDB, clearDB, hashUserPassword, login } from '../helpers';

fixture('File Menu when logged in')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();

    const hashedPassword = await hashUserPassword(studentUser.password);
    const userSeedResults = await seedDB({
      User: [{
        ...studentUser,
        password: hashedPassword
      }]
    });
    const userId = userSeedResults[0][0]._id;
    const now = Date.now();
    await seedDB({
      Page: [
        {
          user: userId,
          title: 'Page One',
          createdAt: now - 500,
          updatedAt: now - 500
        }, {
          user: userId,
          title: 'Page Two',
          createdAt: now - 1000,
          updatedAt: now - 1000
        }
      ]
    });

    await login(studentUser.email, studentUser.password);
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

test('are files displayed in the pages modal', async (t) => {
  const pageTitles = Selector('[data-test=page-title]');

  await t
    .click(Selector('[data-test=toggle-file-dropdown]'))
    .click(Selector('[data-test=file-menu__pages-button]'))
    .expect(pageTitles.count).eql(2)
    .expect(pageTitles.nth(0).textContent).eql('Page One')
    .expect(pageTitles.nth(1).textContent).eql('Page Two');
});

test('duplicate pebl in the file menu', async (t) => {
  const pageTitles = Selector('[data-test=page-title]');
  const duplicatePeblButton = Selector('[data-test=duplicate-pebl]');

  await t
    .click(Selector('[data-test=toggle-file-dropdown]'))
    .click(Selector('[data-test=file-menu__pages-button]'))
    .click(duplicatePeblButton.nth(0))
    .expect(pageTitles.nth(2).textContent).eql('Page One-Copy');
});

test('checking contents of file menu', async (t) => {
  const pageTitles = Selector('[data-test=page-title]');

  await t
    .click(Selector('[data-test=toggle-file-dropdown]'))
    .expect(Selector('[data-test=file-menu__examples-button]').exists).ok()
    .expect(Selector('[data-test=file-menu__new-link]').exists).ok()
    .expect(Selector('[data-test=file-menu__pages-button]').exists).ok()
    .expect(Selector('[data-test=file-menu__save-button]').exists).ok();
});

fixture('File Menu when not logged in')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

test('checking contents of file menu', async (t) => {
  await t
    .click(Selector('[data-test=toggle-file-dropdown]'))
    .expect(Selector('[data-test=file-menu__examples-button]').exists).ok()
    .expect(Selector('[data-test=file-menu__new-link]').exists).ok()
    .expect(Selector('[data-test=file-menu__pages-button]').exists).notOk()
    .expect(Selector('[data-test=file-menu__save-button]').exists).notOk();
});


fixture('File Menu with examples populated')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();

    const hashedPassword = await hashUserPassword(exampleUser.password);
    const userSeedResults = await seedDB({
      User: [{
        ...exampleUser,
        password: hashedPassword
      }]
    });
    const userId = userSeedResults[0][0]._id;
    const now = Date.now();
    await seedDB({
      Page: [
        {
          user: userId,
          title: 'Example Page One',
          createdAt: now - 500,
          updatedAt: now - 500
        }, {
          user: userId,
          title: 'Example Page Two',
          createdAt: now - 1000,
          updatedAt: now - 1000
        }
      ]
    });

    await login(exampleUser.email, exampleUser.password);
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });


test('opening examples modal', async (t) => {
  const examplesTitles = Selector('[data-test=examples__title]');

  await t
    .click(Selector('[data-test=toggle-file-dropdown]'))
    .click(Selector('[data-test=file-menu__examples-button]'))
    .expect(examplesTitles.count).eql(2)
    .expect(examplesTitles.nth(0).textContent).eql('Example Page One')
    .expect(examplesTitles.nth(1).textContent).eql('Example Page Two');
});

test('open new pebl', async (t) => {
  const getLocation = ClientFunction(() => document.location.href);
  await t
    .click(Selector('[data-test=toggle-file-dropdown]'))
    .click(Selector('[data-test=file-menu__new-link]'))
    .expect(getLocation()).contains(`${config.baseUrl}`);
});
