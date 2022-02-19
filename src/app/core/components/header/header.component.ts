import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  theme: string = 'default';

  constructor(private themeService: ThemeService) {}

  changeTheme(name: string) {
    this.theme = name === 'default' ? 'dark' : 'default';
    this.themeService.setTheme(this.theme);
  }
}
