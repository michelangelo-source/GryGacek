import { inject, Injectable } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { backend_PORT } from '../../../properties';
import { backend_URL } from '../../../properties';
import { HttpClient } from '@angular/common/http';
export type JoinRoomResponse = {
  message: string;
  joined: boolean;
};
@Injectable({
  providedIn: 'root',
})
export class StttSocketService {
  private stompClient: Client = new Client();
  private isConnected = new BehaviorSubject<boolean>(false); // Do śledzenia statusu połączenia WebSocket
  private isSubscribed = new BehaviorSubject<boolean>(false); // Do śledzenia statusu połączenia WebSocket
  private roomId: string = ''; // Przechowuje aktualne ID pokoju
  private userNickname: string = ''; // Przechowuje aktualne ID użytkownika
  private http = inject(HttpClient);
  private subscription?: StompSubscription;

  ngOnDestroy() {}
  testConnection() {
    if (this.isConnected.value) {
      console.log('Connection is active.');
    } else {
      console.error('No active connection.');
    }
  }
  getIsConnected() {
    return this.isConnected;
  }
  getIsSubscribed() {
    return this.isSubscribed;
  }
  // Połączenie z serwerem WebSocket
  connect() {
    const socket = new SockJS(backend_URL + ':' + backend_PORT + '/ws'); // Punkt końcowy WebSocket na serwerze

    // Inicjalizacja klienta STOMP
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // Automatyczne ponowne połączenie po 5 sekundach
      // debug: (str) => console.log(str), // Możesz to wyłączyć po debugowaniu
    });

    // Zarejestruj funkcje obsługi po połączeniu
    this.stompClient.onConnect = (frame) => {
      console.log('WebSocket connected');
      this.isConnected.next(true); // Informujemy, że połączenie zostało nawiązane
    };

    // Zarejestruj funkcje obsługi po błędzie
    this.stompClient.onStompError = (frame) => {
      console.error('Broker error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    // Połącz się z serwerem WebSocket
    this.stompClient.activate();
  }
  createRoom(): Observable<string> {
    return this.http.get(
      backend_URL + ':' + backend_PORT + '/sttt/createRoom',
      {
        responseType: 'text',
      }
    );
  }
  // Dołączanie do pokoju
  joinRoom(roomId: string, userNickname: string) {
    this.roomId = roomId;
    this.userNickname = userNickname;
    const message = { roomId, userNickname };

    return this.http.post<JoinRoomResponse>(
      backend_URL + ':' + backend_PORT + '/sttt/joinRoom',
      message
    );
  }

  // Opuść pokój
  leaveRoom() {
    if (!this.roomId || !this.userNickname) {
      console.error('No room or user ID specified.');
      return;
    }

    const message = { roomId: this.roomId, userNickname: this.userNickname };
    this.stompClient.publish({
      destination: '/sttt/leaveRoom',
      body: JSON.stringify(message),
    }); // Informacja o opuszczeniu pokoju

    this.roomId = ''; // Resetujemy ID pokoju
    this.userNickname = ''; // Resetujemy ID użytkownika
  }
  getPlayers() {
    const message = { roomId: this.roomId, userNickname: this.userNickname };
    this.stompClient.publish({
      destination: '/sttt/getUsersInRoom',
      body: JSON.stringify(message),
    });
  }
  // Wysyłanie liczb (liczba1 i liczba2) do pokoju
  sendNumbers(number1: number, number2: number) {
    if (!this.roomId || !this.userNickname) {
      console.error('No room or user ID specified.');
      return;
    }

    const message = {
      roomId: this.roomId,
      bigTableId: number1,
      smallTableId: number2,
    };
    this.stompClient.publish({
      destination: '/sttt/sendIds',
      body: JSON.stringify(message),
    }); // Wysyłanie liczb do pokoju
  }

  // Subskrypcja na wiadomości dotyczące pokoju (np. status pokoju, odbieranie liczb)
  subscribeToRoom(callback: (message: any) => void) {
    this.subscription = undefined;
    this.isSubscribed.next(false);
    if (this.isConnected.value) {
      this.subscription = this.stompClient.subscribe(
        `/moves/${this.roomId}`,
        (message) => {
          callback(JSON.parse(message.body));
        }
      );
      this.isSubscribed.next(true);
    } else {
      console.error('Attempt to subscribe without connection');
    }
  }

  dissconect() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
    this.stompClient.deactivate();
    this.isConnected.next(false);
    this.isSubscribed.next(false);
    this.roomId = '';
    this.userNickname = '';
  }
  // Status połączenia WebSocket
  isConnected$() {
    return this.isConnected.asObservable(); // Observable dla statusu połączenia
  }
}
