import { Component } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpEventType,HttpEvent } from '@angular/common/http';
import { filterResponse, uploadProgress } from '../../shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  standalone: false,
  templateUrl: './upload-file.html',
  styleUrl: './upload-file.scss',
})
export class UploadFile {
  files!:Set<File>
  progress = 0

  constructor(private service:UploadFileService){}

  onChange(evento:any){
    console.log(evento)

    let selectedFiles = evento.srcElement.files
    const fileNames = [];
    this.files = new Set()
    for (let i=0; i<selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i])
    }
    (document.getElementById('customFileLabel') as HTMLElement).innerHTML = fileNames.join(', ');

    this.progress = 0
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.service.upload(this.files,'/api/upload')
      .pipe(
        uploadProgress(progress => {
          console.log("O progresso: ",progress, "%")
          this.progress = progress
        }),
        filterResponse()
      ).subscribe(response => console.log("Upload Conluído"))
      // .subscribe((event:HttpEvent<Object>)=>{
      //   if(event.type === HttpEventType.Response){
      //     console.log('Upload Concluído!');
      //   }
      //   else if(event.type === HttpEventType.UploadProgress){
      //     let percentDone = Math.round((event.loaded * 100) / event.total!)
      //     //console.log("Progresso: ",percentDone)
      //     this.progress = percentDone
      //   }
      // })
    }
  }

  onDownloadExcell(){
    this.service.download('/api/downloadExcel').subscribe(
      (res:any)=>{ this.service.handleFile(res,'report.xlsx')
    })
  }
  onDownloadPDF(){
     this.service.download('/api/downloadPDF').subscribe(
      (res:any)=>{ this.service.handleFile(res,'report.pdf')
  })
  }
}
