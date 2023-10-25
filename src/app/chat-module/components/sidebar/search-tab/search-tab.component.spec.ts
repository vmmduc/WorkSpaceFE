import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTabComponent } from './search-tab.component';

describe('SearchTabComponent', () => {
  let component: SearchTabComponent;
  let fixture: ComponentFixture<SearchTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTabComponent]
    });
    fixture = TestBed.createComponent(SearchTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
