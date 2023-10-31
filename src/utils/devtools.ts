import qs from 'qs';

export const devtoolsInterception = () => {
  function block() {
    if (
      window.outerHeight - window.innerHeight > 200 ||
      window.outerWidth - window.innerWidth > 200
    ) {
      window.location.replace('about:blank');
    }
    setInterval(() => {
      const startTime = Date.now();
      (function () {
        return false;
      })
        .constructor('debugger')
        .call();
      const endTime = Date.now();
      if (endTime - startTime >= 200) {
        window.location.replace('about:blank');
      }
    }, 1500);
  }
  try {
    block();
  } catch (err) {}
};

export const devtoolsInterceptionEnable = () => {
  const params: { devtools?: string } =
    qs.parse(window.location.search.split('?')[1]) ?? {};
  // 开发环境 或者 devtools为1 忽略
  if (
    process.env.NODE_ENV === 'development' ||
    [DEVTOOLS, params?.devtools].includes('1')
  )
    return;
  devtoolsInterception();
};
