import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { themeConfig } from './theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setTheme(name: string = 'default'): void {
    const theme = themeConfig[name];
    this.setProprieties(theme);
  }

  setProprieties(theme: any) {
    Object.keys(theme).forEach((key): void => {
      this.document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });
  }
}
