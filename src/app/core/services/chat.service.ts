import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';

import { AuthfakeauthenticationService } from '../services/authfake.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
    constructor(private http: HttpClient,
      private authFackservice: AuthfakeauthenticationService
    ) { }
    /**
     * Get All User
     */
    getAll() {
        return this.http.get<User[]>(`api/users`);
    }

    /**
     * Facked User Register
     */
    uploadDocument(formData: FormData): Observable<any> {
      const currentUser = this.authFackservice.currentUserValue;
      const headers = {
        'Authorization': `Bearer ${currentUser.access_token}`
      };
          return this.http.post(environment.endpointRest + `/api/v1/documents/upload`, formData, { headers });
    }

    /**
     * Obtener el resumen del archivo cargado
     * @param idDocument
     * @returns
     */
    summarize(idDocument: string): Observable<any> {
      const currentUser = this.authFackservice.currentUserValue;
      const headers = {
        'Authorization': `Bearer ${currentUser.access_token}`
      };
      return this.http.get(`${environment.endpointRest}/api/v1/analysis/summarize/${idDocument}`, { headers });
    }

    /**
     * Realizar preguntas al LLM
     * @param id
     * @param question
     * @returns
     */
    askQuestion(id: string, question: string): Observable<any> {
      const currentUser = this.authFackservice.currentUserValue;
      const headers = {
        'Authorization': `Bearer ${currentUser.access_token}`,
       // 'Question': question
      };
      const url = `${environment.endpointRest}/api/v1/analysis/ask/${id}`;
      const params = {
        rag: true,
        question
      };
      return this.http.post(url, {}, { headers, params });
    }

    /**
     *
     * @returns
     */
    getDocuments(): Observable<any> {
      const currentUser = this.authFackservice.currentUserValue;
      const headers = {
        'Authorization': `Bearer ${currentUser.access_token}`,
        'Accept': '*/*'
      };
      const url = `${environment.endpointRest}/api/v1/documents/5`;
      return this.http.get(url, { headers });
    }


    /**
     *
     * @returns
     */
    getConversations(): Observable<any> {
      const currentUser = this.authFackservice.currentUserValue;
      const headers = {
        'Authorization': `Bearer ${currentUser.access_token}`,
        'Accept': '*/*'
      };
      const url = `${environment.endpointRest}/api/v1/conversations/list`;
      return this.http.get(url, { headers });
    }


    /**
     *
     * @param conversationId
     * @returns
     */
    getConversationById(conversationId: string): Observable<any> {
      const currentUser = this.authFackservice.currentUserValue;
      const headers = {
        'Authorization': `Bearer ${currentUser.access_token}`
      };

      const url = `${environment.endpointRest}/api/v1/conversations/byId/${conversationId}`;
      return this.http.get(url, { headers });
    }





}
