import { jsdom } from 'jsdom';

global.document = jsdom('<body></body>', {
  url: 'http://localhost'
});
global.window = document.defaultView;
global.navigator = window.navigator;