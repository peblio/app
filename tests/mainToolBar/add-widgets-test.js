import { Selector } from 'testcafe';

import config from '../config';
import { studentUser } from '../fixtures/user';
import { seedDB, clearDB, hashUserPassword, login } from '../helpers';

fixture('Adding widgets to a Pebl')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();

    const hashedPassword = await hashUserPassword(studentUser.password);
    await seedDB({
      User: [{
        ...studentUser,
        password: hashedPassword
      }]
    });

    await login(studentUser.email, studentUser.password);
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

test('adding an HTML editor widget', async (t) => {
  await t
    .click(Selector('[data-test=add-code-editor]'))
    .click(Selector('[data-test=add-html-editor]'))
    .expect(Selector('[data-test=code-editor-html]').exists).ok();
});

test('adding an HTML/CSS/JS editor widget', async (t) => {
  await t
    .click(Selector('[data-test=add-code-editor]'))
    .click(Selector('[data-test=add-webdev-editor]'))
    .expect(Selector('[data-test=code-editor-webdev]').exists).ok();
});

test('adding a p5 editor widget', async (t) => {
  await t
    .click(Selector('[data-test=add-code-editor]'))
    .click(Selector('[data-test=add-p5-editor]'))
    .expect(Selector('[data-test=code-editor-p5]').exists).ok();
});

test('adding a processing editor widget', async (t) => {
  await t
    .click(Selector('[data-test=add-code-editor]'))
    .click(Selector('[data-test=add-processing-editor]'))
    .expect(Selector('[data-test=code-editor-processing]').exists).ok();
});

test('adding a python editor widget', async (t) => {
  await t
    .click(Selector('[data-test=add-code-editor]'))
    .click(Selector('[data-test=add-python-editor]'))
    .expect(Selector('[data-test=code-editor-python]').exists).ok();
});

test('default processing sketch runs', async (t) => {
  await t
    .click(Selector('[data-test=add-code-editor]'))
    .click(Selector('[data-test=add-processing-editor]'))
    .click(Selector('[data-test=play-sketch-button]'))
    .switchToIframe(Selector('[data-test=sketch-output]'))
    .expect(Selector('[data-test=processing-canvas]').exists).ok();
});
