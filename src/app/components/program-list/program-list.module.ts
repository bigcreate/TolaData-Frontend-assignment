import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProgramContentModule } from 'src/app/components/program-content/program-content.module';
import { ProgramListComponent } from './program-list.component';

@NgModule({
  declarations: [ProgramListComponent],
  exports: [ProgramListComponent],
  imports: [CommonModule, MatExpansionModule, ProgramContentModule],
})
export class ProgramListModule {}
