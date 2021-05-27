import { Selector } from 'testcafe';

import config from '../config';
import { studentUser } from '../fixtures/user';
import { seedDB, clearDB, hashUserPassword } from '../helpers';

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
    .click(Selector('[data-test=user-account__signup-button]'))
    .click(Selector('[data-test=signup-modal__radio-student]'))
    .click(Selector('[data-test=signup-modal__checkbox]'))
    .click(Selector('[data-test=signup-modal__button-next]'))
    .click(monthSelect)
    .click(monthOption.withText('Jan'))
    .click(yearSelect)
    .click(yearOption.withText('1992'))
    .click(Selector('[data-test=signup-modal__button-next]'))
    .typeText(Selector('[data-test=signup-modal__input-name]'), studentUser.name, { paste: true })
    .click(Selector('[data-test=signup-modal__button-next]'))
    .click(Selector('[data-test=signup-modal__button-peblio]'))
    .typeText(Selector('[data-test=signup-modal__input-email]'), studentUser.email, { paste: true })
    .typeText(Selector('[data-test=signup-modal__input-pswd]'), studentUser.password, { paste: true })
    .typeText(Selector('[data-test=signup-modal__input-pswd-confirm]'), studentUser.password, { paste: true })
    .click(Selector('[data-test=signup-modal__button-submit]'))
    .wait(1000)
    .expect(Selector('[data-test=account-button]').exists).ok();
});

test('through the signup form shall show error when username already taken', async (t) => {
  const hashedPassword = await hashUserPassword(studentUser.password);
  await seedDB({
    User: [{
      ...studentUser,
      password: hashedPassword
    }]
  });
  await t
    .click(Selector('[data-test=user-account__signup-button]'))
    .click(Selector('[data-test=signup-modal__radio-student]'))
    .click(Selector('[data-test=signup-modal__checkbox]'))
    .click(Selector('[data-test=signup-modal__button-next]'))
    .click(monthSelect)
    .click(monthOption.withText('Jan'))
    .click(yearSelect)
    .click(yearOption.withText('1992'))
    .click(Selector('[data-test=signup-modal__button-next]'))
    .typeText(Selector('[data-test=signup-modal__input-name]'), studentUser.name, { paste: true })
    .click(Selector('[data-test=signup-modal__button-next]'))
    .wait(1000)
    .expect(Selector('[data-test=signup-modal__notice]').exists).ok()
    .expect(Selector('[data-test=signup-modal__notice]').withText('Username not available! Please try again')).ok();
});
