export const sleep = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const timer = () => {
  let timeStamp: DOMHighResTimeStamp = 0;
  return {
    start() {
      timeStamp = new Date().getTime();
    },
    stop() {
      const stopTimeStamp = new Date().getTime();
      return stopTimeStamp - timeStamp;
    },
  };
};

export const readCookie = (cookieName: string): string | undefined => {
  const cookie =
    (document.cookie.match(new RegExp(`(?:^|; )(?:${cookieName}=)([^;]*)`)) || [0, undefined])[1] || undefined;
  return cookie ? cookie.toString() : undefined;
};

export const setCookie = (cookieName: string, value: string) => {
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  document.cookie = [
    `${cookieName}=${value}`,
    `; expires=${date.toUTCString()}`,
    '; path=/',
  ].join('');
};

export const deleteCookie = (cookieName: string) => {
  document.cookie = cookieName +'=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
