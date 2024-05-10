import styled from "styled-components";

interface PriceProps {
  priceInfo:
    | {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_15m: number;
        percent_change_1h: number;
        percent_change_6h: number;
        percent_change_24h: number;
        percent_change_1y: number;
        percent_change_12h: number;
        percent_change_7d: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      }
    | undefined;
}

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.btnColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  height: 8rem;
  padding: 20px;
  text-align: center;
  flex: 1 0 calc(50% - 20px);
`;

const InfoTitle = styled.h4`
  margin-top: 0;
  text-align: right;
`;

const InfoContent = styled.div<{ $isPositive: boolean }>`
  text-align: center;
  font-size: 2rem;
  color: ${(props) => (props.$isPositive ? "red" : "blue")};
`;
export default function Price({ priceInfo }: PriceProps) {
  return (
    <CardWrapper>
      <Card>
        <InfoTitle>~1Hr</InfoTitle>
        <InfoContent $isPositive={(priceInfo?.percent_change_1h ?? 0) > 0}>
          {priceInfo?.percent_change_1h}%
        </InfoContent>
      </Card>
      <Card>
        <InfoTitle>~12Hr</InfoTitle>
        <InfoContent $isPositive={(priceInfo?.percent_change_12h ?? 0) > 0}>
          {priceInfo?.percent_change_12h}%
        </InfoContent>
      </Card>
      <Card>
        <InfoTitle>~1Day</InfoTitle>
        <InfoContent $isPositive={(priceInfo?.percent_change_24h ?? 0) > 0}>
          {priceInfo?.percent_change_24h}%
        </InfoContent>
      </Card>
      <Card>
        <InfoTitle>~7Days</InfoTitle>
        <InfoContent $isPositive={(priceInfo?.percent_change_7d ?? 0) > 0}>
          {priceInfo?.percent_change_7d}%
        </InfoContent>
      </Card>
      <Card>
        <InfoTitle>~30Days</InfoTitle>
        <InfoContent $isPositive={(priceInfo?.percent_change_30d ?? 0) > 0}>
          {priceInfo?.percent_change_30d}%
        </InfoContent>
      </Card>
      <Card>
        <InfoTitle>~1yr</InfoTitle>
        <InfoContent $isPositive={(priceInfo?.percent_change_1y ?? 0) > 0}>
          {priceInfo?.percent_change_1y}%
        </InfoContent>
      </Card>
    </CardWrapper>
  );
}
