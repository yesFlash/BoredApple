import { create } from 'zustand';
import { Client, IMessage } from '@stomp/stompjs';

interface WebSocketState {
  stompClient: Client | null;
  messages: ChatMessageResponse[];
  timer: number;

  isGaming: boolean; // 게임이 진행중인가?
  isGameRoundInProgress: boolean; // 라운드가 진행중인가?
  roundCount: number; // 전체 몇라운드인지?
  currentRound: number; // 현재 몇라운드인지?

  quiz: string; // 문제
  answer: string; // 정답

  // 웹소켓 연결, 끊기
  connect: (roomId: string) => void;
  disconnect: () => void;

  startGame: (roodId: string) => void; // 게임 시작(START)
  sendMessage: (destination: string, body: any) => void; // 메세지 발행
  setIsGameRoundInProgress: () => void; // 라운드 on/off 조정
  setRoundCount: (round: number) => void; // 라운드 수 조정
}

interface ChatMessageResponse {
  type: string;
  writer: string;
  content: string;
  target: string;
}

export const useWebsocketStore = create<WebSocketState>((set, get) => ({
  stompClient: null,
  messages: [],
  timer: 0,
  isGaming: false,
  isGameRoundInProgress: false,
  roundCount: 5,
  currentRound: 1,
  quiz: '',
  answer: '',

  connect: (roomId: string) => {
    const client = new Client({
      brokerURL: 'wss://k10a508.p.ssafy.io:8081/game-service/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        // 채팅 구독
        client.subscribe(`/topic/chat/rooms/${roomId}`, (message: IMessage) => {
          const res: ChatMessageResponse = JSON.parse(message.body);
          switch (res.type) {
            case 'TALK':
              set((prev) => ({ messages: [...prev.messages, res] }));
              break;
            case 'QUIZ':
              set({ quiz: res.content });
              break;
            case 'ANSWER':
              set({ answer: res.content });
              break;
          }
          console.log('메세지: ', res);
        });
        // 시간 구독
        client.subscribe(`/topic/time/rooms/${roomId}`, (message: IMessage) => {
          set({ timer: parseInt(message.body) });
        });
      },
    });
    client.activate();
    set({ stompClient: client });
  },
  disconnect: () => {
    const client = get().stompClient;
    if (client) {
      client.deactivate();
      set({ stompClient: null });
    }
  },

  sendMessage: (destination: string, body: object) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
        destination: destination,
        body: JSON.stringify(body),
      });
    }
  },

  startGame: (roomId: string) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
        destination: `/pub/ws/quiz/rooms/${roomId}/send`,
        body: JSON.stringify({ message: 'START' }),
      });
      client.publish({
        destination: `/pub/ws/quiz/rooms/${roomId}/send`,
        body: JSON.stringify({ message: 'ROUND' }),
      });
    }
    if (get().currentRound == 1) set({ isGaming: true });
    set({ isGameRoundInProgress: true });
  },

  setIsGameRoundInProgress: () => {
    get().isGameRoundInProgress ? set({ isGameRoundInProgress: true }) : set({ isGameRoundInProgress: false });
  },

  setRoundCount: (round: number) => {
    set({ roundCount: round });
  },
}));
