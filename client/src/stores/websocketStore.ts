import { create } from 'zustand';
import { Client, IMessage } from '@stomp/stompjs';

interface ChatMessageRequest {
  type: string;
  roomId: number;
  sender: string;
  senderId: number;
  message: string;
}
interface ChatMessageResponse {
  type: string;
  writer: string;
  content: string;
  target: number;
}

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
  disconnect: (body: ChatMessageRequest) => void;

  startGame: (roodId: string) => void; // 게임 시작(START)
  startRound: (roomId: string) => void; // 라운드시작(ROUND)
  sendMessage: (body: ChatMessageRequest) => void; // 메세지 발행
  setIsGameRoundInProgress: () => void; // 라운드 on/off 조정
  clearMessage: () => void; // 페이지 나가면서 메세지 초기화
  setRoundCount: (round: number) => void; // 라운드 수 조정
  setCurrentRound: () => void; // 현재 라운드 +1
  endGame: (roomId: string) => void;
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
            case 'ENTER':
            case 'EXIT':
            case 'CORRECT':
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
  disconnect: (body: ChatMessageRequest) => {
    const client = get().stompClient;
    if (client) {
      get().sendMessage(body);
      client.deactivate();
      set({ stompClient: null });
    }
  },

  sendMessage: (body: ChatMessageRequest) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
        destination: `/pub/ws/rooms/${body.roomId}/send`,
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
    set({ currentRound: 1 });
  },

  startRound: (roomId: string) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
        destination: `/pub/ws/quiz/rooms/${roomId}/send`,
        body: JSON.stringify({ message: 'ROUND' }),
      });
    }
    set({ isGameRoundInProgress: true });
  },

  setIsGameRoundInProgress: () => {
    get().isGameRoundInProgress ? set({ isGameRoundInProgress: true }) : set({ isGameRoundInProgress: false });
  },

  setRoundCount: (round: number) => {
    set({ roundCount: round });
  },

  setCurrentRound: () => {
    set({ currentRound: get().currentRound + 1 });
  },

  clearMessage: () => {
    set({ messages: [] });
  },

  endGame: (roomId: string) => {
    const client = get().stompClient;
    if (client) {
      client.publish({
        destination: `/pub/ws/quiz/rooms/${roomId}/send`,
        body: JSON.stringify({ message: 'END' }),
      });
    }
    set({ isGaming: false });
  },
}));