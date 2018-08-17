import { Selector } from 'testcafe';

import config from './config';
import { studentUser } from './fixtures/user';
import { seedDB, clearDB, hashUserPassword, login } from './helpers';

fixture('User files')
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

test('are displayed in the pages modal', async (t) => {
  const pageTitles = Selector('[data-test=page-title]');

  await t
    .click(Selector('[data-test=toggle-file-dropdown]'))
    .click(Selector('[data-test=show-pages-modal]'))
    .expect(pageTitles.count).eql(2)
    .expect(pageTitles.nth(0).textContent).eql('Page One')
    .expect(pageTitles.nth(1).textContent).eql('Page Two');
});
