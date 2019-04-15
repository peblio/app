import { ClientFunction, Selector } from 'testcafe';

import config from '../config';
import { teacherUser, studentUser } from '../fixtures/user';
import { seedDB, clearDB, hashUserPassword, login } from '../helpers';

fixture('Main Menu not logged in')
  .page(config.baseUrl);

test('are menu items displayed', async (t) => {
  await t
    .expect(Selector('[data-test=toggle-file-dropdown]').exists).ok()
    .expect(Selector('[data-test=toggle-help-dropdown]').exists).ok()
    .expect(Selector('[data-test=main-toolbar__title]').exists).ok()
    .expect(Selector('[data-test=main-toolbar__edit-mode-toggle]').exists).ok()
    .expect(Selector('[data-test=main-toolbar__save-button]').exists).ok()
    .expect(Selector('[data-test=main-toolbar__preferences-button]').exists).ok()
    .expect(Selector('[data-test=main-toolbar__share-button]').exists).ok()
    .expect(Selector('[data-test=user-account__login-button]').exists).ok()
    .expect(Selector('[data-test=user-account__signup-button]').exists).ok()
    .expect(Selector('[data-test=account-button]').exists).notOk();
});


fixture('Main Menu when student logged in')
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
    await login(studentUser.email, studentUser.password);
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

test('are menu items displayed', async (t) => {
  await t
    .expect(Selector('[data-test=user-account__login-button]').exists).notOk()
    .expect(Selector('[data-test=user-account__signup-button]').exists).notOk()
    .expect(Selector('[data-test=account-button]').exists).ok();
});

test('account man contents', async(t) => {
  await t
    .click(Selector('[data-test=account-button]'))
    .expect(Selector('[data-test=user-account__profile-link]').exists).notOk()
    .expect(Selector('[data-test=user-account__logout-button]').exists).ok();
});

test('logging out', async(t) => {
  await t
    .click(Selector('[data-test=account-button]'))
    .click(Selector('[data-test=user-account__logout-button]'))
    .expect(Selector('[data-test=account-button]').exists).notOk();
});

fixture('Main Menu when teacher logged in')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();

    const hashedPassword = await hashUserPassword(teacherUser.password);
    const userSeedResults = await seedDB({
      User: [{
        ...teacherUser,
        password: hashedPassword
      }]
    });
    await login(teacherUser.email, teacherUser.password);
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

test('account man contents', async(t) => {
  await t
    .click(Selector('[data-test=account-button]'))
    .expect(Selector('[data-test=user-account__profile-link]').exists).ok()
    .expect(Selector('[data-test=user-account__logout-button]').exists).ok();
});

test('navigate to profile', async(t) => {
  const getLocation = ClientFunction(() => document.location.href);
  await t
    .click(Selector('[data-test=account-button]'))
    .click(Selector('[data-test=user-account__profile-link]'))
    .expect(getLocation()).contains(`${config.baseUrl}/user/${teacherUser.name}`);
});

test('save pebl', async(t) => {
  const getLocation = ClientFunction(() => document.location.href);
  await t
    .click(Selector('[data-test=main-toolbar__save-button]'))
    .expect(getLocation()).contains(`${config.baseUrl}/pebl`);
});

test('share modal', async(t) => {
  const examplesTitles = Selector('[data-test=share-modal__input]').value;
  const getLocation = ClientFunction(() => document.location.href);
  await t
    .click(Selector('[data-test=main-toolbar__save-button]'))
    .click(Selector('[data-test=main-toolbar__share-button]'))
    .expect(examplesTitles).contains(`${config.baseUrl}/pebl`);
});
