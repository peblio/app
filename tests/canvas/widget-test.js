import { Selector } from 'testcafe';

import config from '../config';
import { studentUser } from '../fixtures/user';
import { testPebl } from '../fixtures/pebls';
import { seedDB, clearDB, hashUserPassword, login } from '../helpers';

fixture('Testing Widget Nav Bar')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

test('duplicate a widget', async (t) => {
  const imageWidgets = Selector('[data-test=image__container]');
  await t
    .click(Selector('[data-test=insert-toolbar__add-image]'))
    .expect(imageWidgets.count).eql(1)
    .click(Selector('[data-test=widget__duplicate]'))
    .expect(imageWidgets.count).eql(2);
});

test('delete a widget', async (t) => {
  const imageWidgets = Selector('[data-test=image__container]');
  await t
    .click(Selector('[data-test=insert-toolbar__add-image]'))
    .expect(imageWidgets.count).eql(1)
    .click(Selector('[data-test=widget__close]'))
    .expect(imageWidgets.count).eql(0);
});
