import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  public getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );

    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  public setCookie(
    name: string,
    value: string,
    options: { [key: string]: any } = {}
  ) {
    options = { path: '/', ...options };

    if (options['expires'] instanceof Date) {
      options['expires'] = options['expires'].toUTCString();
    }

    let updatedCookie =
      encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += '; ' + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  public deleteCookie(name: string) {
    this.setCookie(name, '', {
      'max-age': -1,
    });
  }

  public getExpiritonDate(days: number): Date {
    const date = new Date();

    date.setDate(date.getDate() + days);

    return date;
  }
}
