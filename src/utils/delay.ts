const delay = async (wait = 300) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, wait);
  });
};

export default delay;
