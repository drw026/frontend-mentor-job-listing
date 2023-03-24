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
    (document.cookie.match(new RegExp(`(?:^|; )(?:${cookieName}=)([^;]*)`)) || [
      0,
      undefined,
    ])[1] || undefined;
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
  document.cookie =
    cookieName + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const relativeDate = (timestamp: string) => {
  const currentDate = new Date().getTime();
  const timestampToDate = new Date(timestamp);
  const timestampToMs = timestampToDate.getTime();
  const difference = currentDate - timestampToMs;
  const dayInMs = 86400000;
  const weekInMs = 604800000;
  const monthInMs = 2629800000;
  const yearInMs = 31557600000;

  if (difference <= dayInMs) return 'Today';
  if (difference > dayInMs && difference <= weekInMs)
    return `${Math.round(difference / dayInMs)} day(s) ago`;
  if (difference > weekInMs && difference <= monthInMs)
    return `${Math.round(difference / weekInMs)} week(s) ago`;
  if (difference > monthInMs && difference <= yearInMs)
    return `${Math.round(difference / monthInMs)} month(s) ago`;
  if (difference === yearInMs) return `1 year ago`;
  if (difference > yearInMs)
    return `
      ${timestampToDate.getDate().toString().padStart(2, '0')}-${(timestampToDate.getMonth() + 1).toString().padStart(2, '0')}-${timestampToDate.getFullYear()}
    `;
};
