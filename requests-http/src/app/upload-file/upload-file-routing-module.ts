import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadFile } from './upload-file/upload-file';

const routes: Routes = [
  {path:'',component:UploadFile}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFileRoutingModule { }
