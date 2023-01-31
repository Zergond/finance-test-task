import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from '@mui/material';
import { useState } from 'react';
import { addTrackByName, removeTrackByName } from '~/features/ticker/slice';
import { useAppDispatch, useAppSelector } from '~/hooks';
import socket from '~/socket';

const tickersList = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA'];

export default function TickerSelector() {
  const dispatch = useAppDispatch();
  const track = useAppSelector((state) => state.tickers.track);
  const [updateInterval, setUpdateInterval] = useState('5000');

  const handleIntervalChange = (e: SelectChangeEvent) => {
    setUpdateInterval(e.target.value);
    socket.emit('setInterval', Number(e.target.value));
  };

  const handleToggle = (value: string) => () => {
    const currentIndex = track.indexOf(value);

    if (currentIndex === -1) {
      dispatch(addTrackByName(value));
    } else {
      dispatch(removeTrackByName(value));
    }
  };

  return (
    <Box mt='20px'>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='setInterval'>Update interval:</InputLabel>
          <Select
            labelId='setInterval'
            value={updateInterval}
            onChange={handleIntervalChange}
            label='Interval'
          >
            <MenuItem value={2000}>2s</MenuItem>
            <MenuItem value={5000}>5s</MenuItem>
            <MenuItem value={10000}>10s</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display='flex' justifyContent='center' mt='20px'>
        <List
          sx={{
            width: '100%',
            border: (t) => `1px solid ${t.palette.grey[300]}`,
            borderRadius: '8px',
            maxWidth: '350px',
          }}
        >
          {tickersList.map((item) => (
            <ListItem key={item}>
              <ListItemText id={item} primary={item} />
              <Switch
                edge='end'
                onChange={handleToggle(item)}
                checked={track.indexOf(item) !== -1}
                inputProps={{
                  'aria-labelledby': item,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
