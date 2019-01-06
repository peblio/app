import { Selector } from 'testcafe';

import config from '../config';
import { studentUser } from '../fixtures/user';
import { seedDB, clearDB, hashUserPassword, login } from '../helpers';

const DIRECT_LINK = 'https://placekitten.com/500/500';
const FILE_LINK = '../assets/cat.jpeg';
const AWS_LINK = 'https://s3.amazonaws.com/peblio-files-staging/';

fixture('Use Image widgets when not logged in ')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

test('cant upload when not logged in', async(t) => {
  await t
    .click(Selector('[data-test=insert-toolbar__add-image]'))
    .expect(Selector('[data-test=image__drop]').exists).notOk()
    .expect(Selector('[data-test=image__url]').exists).notOk();
});


fixture('Use Image widgets when logged in ')
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

test('upload when logged in through url', async(t) => {
  await t
    .click(Selector('[data-test=insert-toolbar__add-image]'))
    .typeText(Selector('[data-test=image__url-input]'), DIRECT_LINK)
    .click(Selector('[data-test=image__upload]'))
    .expect(Selector('[data-test=image__main]').nth(0).getAttribute('src')).contains(DIRECT_LINK);
});

test('upload when logged in through image upload', async(t) => {
  await t
    .click(Selector('[data-test=insert-toolbar__add-image]'))
    .setFilesToUpload('[data-test=image__upload-container] input', [
      FILE_LINK
    ])
    .expect(Selector('[data-test=image__main]').nth(0).getAttribute('src')).contains(AWS_LINK);
});
