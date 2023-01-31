import { TickerResponse } from '~/features/ticker/slice';
import { memo, useRef, forwardRef, MutableRefObject, Ref } from 'react';
import { Box, Slide, Typography } from '@mui/material';
import { usePrevious } from '~/app/hooks';

export interface TickerCardProps extends TickerResponse {}

export default memo(function TickerCard({
  ticker,
  price,
  change,
  change_percent,
}: TickerCardProps) {
  const prevPrice = usePrevious(price);
  const isChangePositive = prevPrice < price;
  const isPriceSame = prevPrice === price;

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box minWidth={100} flex={1}>
        <Typography>{ticker}</Typography>
      </Box>
      <TickerText text={`${price} $`} isPriceSame />
      <TickerText text={`${change} $`} {...{ isChangePositive, isPriceSame }} />
      <TickerText text={`${change_percent} %`} {...{ isChangePositive, isPriceSame }} />
    </Box>
  );
});

interface TickerTextProps {
  text: string;
  isPriceSame?: boolean;
  isChangePositive?: boolean;
}
function TickerText({ text, isChangePositive, isPriceSame }: TickerTextProps) {
  const containerRef = useRef(null);

  const getText = (value: string) => {
    if (isPriceSame) {
      return value;
    }
    return `${isChangePositive ? '+' : '-'}${value}`;
  };

  const getColor = () => {
    if (isPriceSame) {
      return;
    }
    if (isChangePositive) {
      return 'green';
    } else {
      return 'red';
    }
  };

  return (
    <Box ref={containerRef} minWidth='200px'>
      <SlideText key={text} ref={containerRef}>
        <Typography color={getColor()} fontWeight='bold'>
          {getText(text)}
        </Typography>
      </SlideText>
    </Box>
  );
}

interface SlideTextProps {
  children: JSX.Element;
}
const SlideText = forwardRef<HTMLDivElement, SlideTextProps>(({ children }, ref) => {
  const forwardedRef = ref as MutableRefObject<HTMLDivElement>;

  return (
    <>
      {!forwardedRef.current ? (
        <>{children}</>
      ) : (
        <Slide container={forwardedRef.current} direction='up' in>
          {children}
        </Slide>
      )}
    </>
  );
});
