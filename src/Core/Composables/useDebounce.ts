export const useDebounce = (callback: Function, timeout = 300) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(callback, args);
    }, timeout);
  };
};
