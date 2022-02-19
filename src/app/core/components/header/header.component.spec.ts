import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado o DarkMode
      Quando for clicado
      Então deve mudar tema para dark`, () => {
    const button = fixture.nativeElement.querySelector('.header__button');

    button.click();
    fixture.detectChanges();

    expect(component.theme).toEqual('dark');
  });

  it(`Dado o DarkMode ativo
      Quando for clicado
      Então deve mudar tema para padrão`, () => {
    const button = fixture.nativeElement.querySelector('.header__button');
    component.theme = 'dark';

    button.click();
    fixture.detectChanges();
    expect(component.theme).toEqual('default');
  });
});
