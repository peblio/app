import { Selector } from 'testcafe';

import config from '../config';
import { studentUser } from '../fixtures/user';
import { seedDB, clearDB, hashUserPassword, login } from '../helpers';


async function studentSignUp(t, ageSelector) {

}

fixture('Signing up')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

const monthSelect = Selector('[data-test=signup-modal__month-dropdown]');
const monthOption = monthSelect.find('option');

const yearSelect = Selector('[data-test=signup-modal__year-dropdown]');
const yearOption = yearSelect.find('option');

test('through the signup form with a valid email and password', async (t) => {
  await t
    .click(Selector('[data-test=main-toolbar__signup-button]'))
    .click(Selector('[data-test=signup-modal__radio-student]'))
    .click(monthSelect)
    .click(monthOption.withText('Jan'))
    .click(yearSelect)
    .click(yearOption.withText('1992'))
    .click(Selector('[data-test=signup-modal__checkbox]'))
    .click(Selector('[data-test=signup-modal__button-next]'))
    .typeText(Selector('[data-test=signup-modal__input-email]'), studentUser.email)
    .typeText(Selector('[data-test=signup-modal__input-name]'), studentUser.name)
    .typeText(Selector('[data-test=signup-modal__input-pswd]'), studentUser.password)
    .typeText(Selector('[data-test=signup-modal__input-pswd-confirm]'), studentUser.password)
    .click(Selector('[data-test=signup-modal__button-submit]'));

  await login(studentUser.email, studentUser.password);
  await t.setNativeDialogHandler(type => type === 'beforeunload');
  await t.eval(() => window.location.reload(true));

  await t.expect(Selector('[data-test=account-button]').exists).ok();
});
