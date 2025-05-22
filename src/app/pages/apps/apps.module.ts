import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppsRoutingModule } from './apps-routing.module';

import { FullCalendarModule } from '@fullcalendar/angular';

// import { FullCalendarModule } from '@fullcalendar/angular';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';

import { NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ChatComponent } from './chat/chat.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  acceptedFiles: '.txt,.docx,.pdf',
  maxFilesize: 20, // Tamaño máximo permitido (en MB)
  dictInvalidFileType: 'Solo se permiten archivos .txt',
  maxFiles:1,
  dictMaxFilesExceeded: 'Solo puedes subir un archivo'
};


// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin,
//   interactionPlugin
// ]);
@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppsRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbNavModule,
    DropzoneModule,
    NgbPaginationModule,
    SimplebarAngularModule,
    CKEditorModule,
    NgbTypeaheadModule,
    NgbDatepickerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
    providers: [
      {
        provide: DROPZONE_CONFIG,
        useValue: DEFAULT_DROPZONE_CONFIG
      },
      provideNgxMask(),
    ]
})
export class AppsModule { }
