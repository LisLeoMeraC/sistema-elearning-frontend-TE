import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResourcesDocenteComponent } from './view-resources-docente.component';

describe('ViewResourcesDocenteComponent', () => {
  let component: ViewResourcesDocenteComponent;
  let fixture: ComponentFixture<ViewResourcesDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewResourcesDocenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewResourcesDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
