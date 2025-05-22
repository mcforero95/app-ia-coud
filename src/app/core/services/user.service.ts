import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }
    /**
     * Get All User
     */
    getAll() {
        return this.http.get<User[]>(`api/users`);
    }

    /**
     * Facked User Register
     */
    register(user: User) {
          return this.http.post(environment.endpointRest + `/api/v1/auth/register`, user);
    }
}
