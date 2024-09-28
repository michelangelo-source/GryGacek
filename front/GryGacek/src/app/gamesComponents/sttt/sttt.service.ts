import { inject, Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs'; // Używamy bezpośrednio Client
import SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { backend_PORT } from '../../../properties';
import { backend_URL } from '../../../properties';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class StttSocketService {
  private stompClient: Client = new Client();
  private isConnected = new BehaviorSubject<boolean>(false); // Do śledzenia statusu połączenia WebSocket
  private roomId: string = ''; // Przechowuje aktualne ID pokoju
  private userId: string = ''; // Przechowuje aktualne ID użytkownika
  private http = inject(HttpClient);
  constructor() {}
  testConnection() {
    if (this.isConnected.value) {
      console.log('Connection is active.');
    } else {
      console.error('No active connection.');
    }
  }
  // Połączenie z serwerem WebSocket
  async connect() {
    const socket = new SockJS(backend_URL + ':' + backend_PORT + '/ws'); // Punkt końcowy WebSocket na serwerze

    // Inicjalizacja klienta STOMP
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // Automatyczne ponowne połączenie po 5 sekundach
      debug: (str) => console.log(str), // Możesz to wyłączyć po debugowaniu
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
  joinRoom(roomId: string, userId: string) {
    console.log('Join room');
    if (!this.isConnected.value) {
      console.error('WebSocket is not connected.');
      return;
    }

    // Ustawienie ID pokoju i użytkownika
    this.roomId = roomId;
    this.userId = userId;

    const message = { roomId, userId };
    this.stompClient.publish({
      destination: '/sttt/joinRoom',
      body: JSON.stringify(message),
    }); // Wysłanie informacji o dołączeniu do pokoju
  }

  // Opuść pokój
  leaveRoom() {
    if (!this.roomId || !this.userId) {
      // console.error('No room or user ID specified.');
      return;
    }

    const message = { roomId: this.roomId, userId: this.userId };
    this.stompClient.publish({
      destination: '/sttt/leaveRoom',
      body: JSON.stringify(message),
    }); // Informacja o opuszczeniu pokoju

    this.roomId = ''; // Resetujemy ID pokoju
    this.userId = ''; // Resetujemy ID użytkownika
  }

  // Wysyłanie liczb (liczba1 i liczba2) do pokoju
  sendNumbers(number1: number, number2: number) {
    console.log(this.userId);
    console.log(this.roomId);
    if (!this.roomId || !this.userId) {
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
    if (!this.roomId) {
      console.error('No room ID specified.');
      return;
    }

    this.stompClient.subscribe(`/moves/${this.roomId}`, (message) => {
      callback(JSON.parse(message.body)); // Odbieranie wiadomości i wywołanie callbacka
    });
  }

  // Status połączenia WebSocket
  isConnected$() {
    return this.isConnected.asObservable(); // Observable dla statusu połączenia
  }
}
