import {userAgent} from "./config";

export function OS() {
  if ((navigator.platform == "Win32") || (navigator.platform == "Windows")) {
    return 'Windows'
  } else if ((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel")) {
    return "Mac"
  }
}
