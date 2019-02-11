import { Selector } from 'testcafe';

import config from '../config';
import { studentUser } from '../fixtures/user';
import { seedDB, clearDB, hashUserPassword, login } from '../helpers';

fixture('Use Image widgets when not logged in ')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

test('can add tags using input element', async (t) => {
  const tags = Selector('[data-test=tags-name]');
  await t
    .typeText(Selector('[data-test=enter-tag]'), 'tag1')
    .pressKey('enter')
    .expect(tags.nth(0).textContent).eql('tag1');
});
