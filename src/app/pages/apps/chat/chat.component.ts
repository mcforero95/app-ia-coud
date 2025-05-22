import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

import { ChatUser, ChatMessage } from './chat.model';
import { chatData, chatMessagesData } from './data';

import { ChatService } from 'src/app/core/services/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

/***
 * Chat Component
 */
export class ChatComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  chatData!: [];
  chatMessagesData!: ChatMessage[];
  username: string = 'Jennie Sherlock';
  idConversation:string = '';
  usermessage!: string;
  formData!: UntypedFormGroup;
  chatSubmit?: boolean;
  profile: string = 'assets/images/users/avatar-2.jpg';
  uploadedFile!: File;
  enableChat: boolean = false;
  isLoading: boolean = false;
  documentId!: string;

  constructor(public formBuilder: UntypedFormBuilder,
    private __chatService: ChatService
  ) { }

  ngOnInit(): void {
    //BreadCrumb
    this.breadCrumbItems = [
      { label: 'Apps' },
      { label: 'Chat', active: true }
    ];

    // Validation
    this.formData = this.formBuilder.group({
      message: ['', []],
    });

    this.chatSubmit = false;

    // Chat Data Get Function
    this._fetchData();
    this.getDocuments();
    this.getConversations();
  }

  // Chat Data Fetch
  private _fetchData() {
   // this.chatData = chatData;
    this.chatMessagesData = [];
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  onFileDropped(event: any) {
    console.log('Evento success recibido:', event);
    // Extraer el archivo del evento (primer argumento)
    if (event.length > 0 && event[0] instanceof File) {
      this.uploadedFile = event[0];
      console.log('Archivo seleccionado:', this.uploadedFile);
    } else {
      console.warn('No se pudo extraer el archivo del evento', event);
    }
  }


  /***
  * OnClick User Chat show
  */
  chatUsername(name: any, profile: any) {
    this.username = name;
    this.usermessage = 'Hello';
    this.chatMessagesData = [];
    const currentDate = new Date();
    this.profile = profile;

    this.chatMessagesData.push({
      name: this.username,
      message: this.usermessage,
      time: currentDate.getHours() + ':' + currentDate.getMinutes(),
      profile: profile,
    });
  }

  onListScroll() { }

  /**
   * Save the message in chat
   */
  messageSave() {
    const message = this.formData.get('message')!.value;
    const currentDate = new Date();

    if(this.documentId == undefined){
      this.uploadDocument();
    }else{
      if (this.formData.valid && message) {

        // Message Push in Chat
        this.chatMessagesData.push({
          align: 'right',
          name: 'Tu',
          message,
          time: currentDate.getHours() + ':' + currentDate.getMinutes(),
        });

        this.isLoading = true;
        this.__chatService.askQuestion(this.documentId, message).subscribe(
          response => {
            this.writeResponse(response.answer);
            console.log('Respuesta de la pregunta:', response);
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            console.error('Error al hacer la pregunta:', error);
          }
        );


        this.onListScroll();

        // Set Form Data Reset
        this.formData = this.formBuilder.group({
          message: null,
        });
      }
      this.chatSubmit = true;

    }

  }

  /**
   *
   * @returns
   */
  uploadDocument() {
    if (!this.uploadedFile) {
      Swal.fire('No hay un archivo seleccionado', 'Cargue un archivo e intente de nuevo', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.uploadedFile);
    this.isLoading = true;
    this.__chatService.uploadDocument(formData).subscribe(
      response => {
        console.log('Documento subido:', response);
        this.enableChat = true;
        this.documentId = response.id;
        this.getConversations();
        this.__chatService.summarize(this.documentId).subscribe(
          response => {
            this.writeResponse(response.summary);
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            console.log("Hubo un error cargando el resumen")
          }
        )

        //this.uploadedFile = null; // Limpiar la variable después de la subida
      },
      error => {
        this.isLoading = false;
        console.error('Error al subir el documento', error);
      }
    );
  }

  /**
   *
   * @param message
   */
  writeResponse(message: string){
    const currentDate = new Date();
    this.chatMessagesData.push({
      name: '',
      profile: 'assets/images/users/avatar-4.jpg',
      message,
      time: currentDate.getHours() + ':' + currentDate.getMinutes(),
    });
  }


  getDocuments(){
    // En tu componente
      this.__chatService.getDocuments().subscribe(
      response => {
        console.log('Lista de documentos:', response);
        // Manejar la respuesta aquí
      },
      error => {
        console.error('Error al obtener los documentos:', error);
      }
    );
  }


  getConversations(){
    // En tu componente
      this.__chatService.getConversations().subscribe(
      response => {
        this.chatData = response;
        console.log('Lista de conversaciones:', response);
      },
      error => {
        console.error('Error al obtener los documentos:', error);
      }
    );
  }


  /**
   *
   * @param idConversation
   */
  selectConversation(idConversation: string){
    this.chatMessagesData = [];
    this.idConversation = idConversation;
    this.enableChat = true;
    this.__chatService.getConversationById(idConversation).subscribe(
      response => {
        this.documentId = response.document_id;
        response.messages.forEach((element: any) => {
          const createdAt = element['created_at'];
          const date = new Date(createdAt);

          this.chatMessagesData.push({
            align: 'right',
            name: 'You',
            message: element['question'],
            time: date.getHours() + ':' + date.getMinutes(),
          });

          this.chatMessagesData.push({
            message: element['answer'],
            time: element['created_at']
          });
        });
        console.log('Detalles de la conversación:', response);
      },
      error => {
        console.error('Error al obtener los detalles de la conversación:', error);
      }
    );

  }




}
