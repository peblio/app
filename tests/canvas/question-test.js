import { Selector } from 'testcafe';

import config from '../config';
import { studentUser } from '../fixtures/user';
import { clearDB } from '../helpers';

const QUESTION = 'What is you name?';
const ANSWER = 'My name is cat.';

fixture.skip('Testing Question Widgets')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

async function checkTextArea(t, selector, text) {
  await t
    .click(Selector('[data-test=insert-toolbar__add-question]'))
    .selectTextAreaContent(selector)
    .pressKey('delete')
    .typeText(selector, text);
}

test('can type text in question', async (t) => {
  const selector = Selector('[data-test=question__question]');
  const text = QUESTION;
  await checkTextArea(t, selector, text);
  await t.expect(selector.nth(0).textContent).eql(text);
});

test('can type text in answer', async (t) => {
  const selector = Selector('[data-test=question__answer]');
  const text = ANSWER;
  await checkTextArea(t, selector, text);
  await t.expect(selector.nth(0).textContent).eql(text);
});
