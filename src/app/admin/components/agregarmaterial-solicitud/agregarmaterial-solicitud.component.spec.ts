import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarmaterialSolicitudComponent } from './agregarmaterial-solicitud.component';

describe('AgregarmaterialSolicitudComponent', () => {
  let component: AgregarmaterialSolicitudComponent;
  let fixture: ComponentFixture<AgregarmaterialSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarmaterialSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarmaterialSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
