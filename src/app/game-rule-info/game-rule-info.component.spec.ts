import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRuleInfoComponent } from './game-rule-info.component';

describe('GameRuleInfoComponent', () => {
  let component: GameRuleInfoComponent;
  let fixture: ComponentFixture<GameRuleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRuleInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameRuleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
