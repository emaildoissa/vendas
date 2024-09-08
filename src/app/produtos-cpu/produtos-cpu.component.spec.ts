import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosCpuComponent } from './produtos-cpu.component';

describe('ProdutosCpuComponent', () => {
  let component: ProdutosCpuComponent;
  let fixture: ComponentFixture<ProdutosCpuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosCpuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosCpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
