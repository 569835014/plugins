export const userAgent=navigator.userAgent;

export const isBrowser=typeof window !=='undefined';
export const isClient=typeof global !=='undefined';
export const isIE=userAgent.indexOf("MSIE")>-1;
export const isOpera=userAgent.indexOf('Presto')>-1;
export const isWebKit=userAgent.indexOf('AppleWebKit')>-1;
export const isFirefox=userAgent.indexOf('Gecko')>-1&&userAgent.indexOf('KHTML')
export const isMobile=!!userAgent.match(/AppleWebKit.*Mobile.*/)
export const isIos= !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
export const isAndroid=userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1
export const isIphone=userAgent.indexOf('iPhone') > -1
export const isIpad=userAgent.indexOf('iPad') > -1
export const isWx=userAgent.indexOf('MicroMessenger') > -1
