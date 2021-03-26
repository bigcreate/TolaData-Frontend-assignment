import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from 'src/app/interfaces/program';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  programs$: Observable<Program[]>;

  constructor(private readonly programsService: ProgramsService) {
    this.programs$ = this.programsService.getAll();
  }

  ngOnInit(): void {}
}
