import { Paper } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { TickerResponse, updateData } from '~/features/ticker/slice';
import { useAppDispatch, useAppSelector } from '~/hooks';
import socket from '~/socket';
import TickerCard from './TickerCard';

socket.emit('start');

export default function TickerTracker() {
  const dispatch = useAppDispatch();
  const tickers = useAppSelector((state) => state.tickers);

  const handleTickerEvent = useCallback(
    (response: TickerResponse[]) => {
      dispatch(updateData(response));
    },
    [tickers.track],
  );
  const stopTracking = () => {
    socket.off('ticker', handleTickerEvent);
  };

  const startTracking = () => {
    if (!socket.hasListeners('ticker') && tickers.track.length > 0) {
      socket.on('ticker', handleTickerEvent);
    }
  };

  const trackingTickers = tickers.data.filter((item) => tickers.track.includes(item.ticker));

  useEffect(() => {
    startTracking();
    return () => {
      stopTracking();
    };
  }, [tickers.track]);

  return (
    <Paper
      sx={{
        height: '30vh',
        marginTop: '20px',
        padding: '40px',
        overflow: 'hidden',
        overflowY: 'scroll',
      }}
      elevation={3}
    >
      {trackingTickers.map((item) => (
        <TickerCard key={item.ticker} {...item} />
      ))}
    </Paper>
  );
}
