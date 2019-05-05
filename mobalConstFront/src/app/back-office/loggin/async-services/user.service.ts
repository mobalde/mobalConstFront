import { User } from './../models/user';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService{

    user: User;
    error: any;
    
    constructor(){}
}