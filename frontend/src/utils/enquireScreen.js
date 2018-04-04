let enquireJs;
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = mediaQuery => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
  enquireJs = require('enquire.js');
}

const mobileQuery = 'only screen and (max-width: 767.99px)';

const enquireScreen = (cb, query = mobileQuery) => {
  if (!enquireJs) {
    return;
  }

  const handler = {
    match: () => {
      cb && cb(true);
    },
    unmatch: () => {
      cb && cb();
    },
  };
  enquireJs.register(query, handler);
  return handler;
};

export default enquireScreen;
