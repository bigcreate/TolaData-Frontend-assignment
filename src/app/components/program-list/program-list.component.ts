import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Program } from 'src/app/interfaces/program';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramListComponent {
  @Input()
  programs: Program[] = [];

  private programsVisibilityStatus = new Map<number, boolean>();

  isProgramOpened(programId: number): boolean {
    console.log(programId, !!this.programsVisibilityStatus.get(programId));
    return !!this.programsVisibilityStatus.get(programId);
  }

  openProgram(programId: number): void {
    this.programsVisibilityStatus.set(programId, true);
  }

  closeProgram(programId: number): void {
    this.programsVisibilityStatus.set(programId, false);
  }

  trackByProgramId(index: number, item: Program): number {
    return item.id;
  }
}
