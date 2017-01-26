/**
 * Created by grill on 24.01.2017.
 */
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {Headers, Response, Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {NotificationsService} from "angular2-notifications";

@Injectable()
export class ChatService {
    constructor(private http: Http,private notificationService: NotificationsService) {
        // set token if saved in local storage
    }

    private url = 'http://localhost:3002';
    private socket : any;

    sendMessage(message : any){
        this.socket.emit('add-message', message);
    }

    sendMessageToLobby(message : any,lobby : string){
        console.log(lobby);
        this.socket.emit(lobby, message);
    }

    getMessages() {
        let observer : any;
        let observable = new Observable((observer : any) => {
            this.socket = io(this.url);
            this.socket.on('message', (data : any) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }

    getLobbies() : any {
        return this.http.get('/api/get/lobbies')
            .map((response: Response) => {
            console.log(response);
                if (response.text() === "fail"){
                    this.notificationService.error("Aborted","No lobbies are fetched");
                    return false;
                }
                this.notificationService.success("Success","Lobbies are listed on the bottom right!");
                return response.json();
            });
    }
}