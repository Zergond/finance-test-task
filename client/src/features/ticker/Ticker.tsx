import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { TicketResponse } from './slice';

export default function Ticker() {
  const socket = io(import.meta.env.VITE_API_HOST);

  const socketSetup = () => {
    socket.emit('start');
    socket.on('ticker', (response: TicketResponse[]) => {
      console.log(response);
    });
  };

  useEffect(() => {
    socketSetup();
  });

  return <></>;
}
