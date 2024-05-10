import styled from "styled-components";
import { Link } from "react-router-dom";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

const CoinsList = styled.div`
  margin: 0 10px;
`;

const Coin = styled.div`
  background-color: ${(props) => props.theme.btnColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  text-align: center;
  flex: 1 1 auto;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data
            ?.filter((coin) => coin.is_active)
            .slice(0, 100)
            .map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name },
                  }}
                >
                  <Img
                    src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
