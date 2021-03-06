import { Selector } from 'testcafe';

import config from '../config';
import { studentUser } from '../fixtures/user';
import { clearDB } from '../helpers';

const YOUTUBE_LINK = '<iframe width="560" height="315" src="https://www.youtube.com/embed/EccgSe5FLKM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

const CODEPEN_LINK = `<iframe height='265' scrolling='no' title='Chicken :)' src='//codepen.io/justyouraverageonion/embed/zmygmg/?height=265&theme-id=0&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/justyouraverageonion/pen/zmygmg/'>Chicken :)</a> by JustYourAverageOnion (<a href='https://codepen.io/justyouraverageonion'>@justyouraverageonion</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>`;

const MICROBITS_LINK = '<div style="position:relative;height:calc(300px + 5em);width:100%;overflow:hidden;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://makecode.microbit.org/---codeembed#pub:_fwa813DrDY1b" allowfullscreen="allowfullscreen" frameborder="0" sandbox="allow-scripts allow-same-origin"></iframe></div>';

const DIRECT_LINK = 'https://www.peblio.co/';

const SCRATCH_LINK = '<iframe allowtransparency=“true” width=“485" height=“402” src=“https://scratch.mit.edu/projects/277694087/embed” frameborder=“0” allowfullscreen></iframe>';

const VIMEO_LINK = `<iframe src="https://player.vimeo.com/video/97605620" width="640" height="480" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/97605620">Generative Portraits</a> from <a href="https://vimeo.com/fdiba">fdiba</a> on <a href="https://vimeo.com">Vimeo</a>.</p>`;

const GOOGLE_DRIVE_LINK = '<iframe src="https://drive.google.com/file/d/1QRi1NtyQYq5hAMfP93NRVNH9KgT1T1sY/preview" width="640" height="480"></iframe>';

async function checkEmbed(t, link) {
  await t
    .click(Selector('[data-test=insert-toolbar__add-iframe]'))
    .selectText(Selector('[data-test=iframe__input]'))
    .pressKey('delete')
    .typeText(Selector('[data-test=iframe__input]'), link)
    .click(Selector('[data-test=iframe__submit]'))
    .switchToIframe(Selector('[data-test=iframe__main]'));
}

fixture('Testing Iframe embeds')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

test('able to embed youtube video', async(t) => {
  await checkEmbed(t, YOUTUBE_LINK);
  await t.expect(Selector('#player').exists).ok();
});

test('able to embed codepen link', async(t) => {
  await checkEmbed(t, CODEPEN_LINK);
  await t.expect(Selector('.codepen-embed-body').exists).ok();
});

test('able to embed microbits link', async(t) => {
  await checkEmbed(t, MICROBITS_LINK);
  await t.expect(Selector('a').exists).ok();
});

test('able to embed direct link', async(t) => {
  await checkEmbed(t, DIRECT_LINK);
  await t.expect(Selector('#root').exists).ok();
});

test('able to embed scratch link', async(t) => {
  await checkEmbed(t, SCRATCH_LINK);
  await t.expect(Selector('#scratch').exists).ok();
});

test('able to embed vimeo link', async(t) => {
  await checkEmbed(t, VIMEO_LINK);
  await t.expect(Selector('.vp-video').exists).ok();
});

test('able to embed google drive link', async(t) => {
  await checkEmbed(t, GOOGLE_DRIVE_LINK);
  await t.expect(Selector('#one-google-bar').exists).ok();
});
