import styled from "styled-components";

export default function TopTenItem({ rank, title, poster, onClick }) {
  return (
    <Card>
      <Poster poster={poster}>
        <Overlay onClick={onClick} />
        <Bar>
          <Rank>{rank}</Rank>
        </Bar>
      </Poster>
      <Title>{title}</Title>
    </Card>
  );
}

const Card = styled.div`
  flex: 0 0 auto;
  width: 107px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7.8px;
`;

const Poster = styled.div`
  aspect-ratio: 107 / 151.42;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.gray10};
  background-image: url(${(props) => props.poster});
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.23) 12.85%,
    rgba(0, 0, 0, 0) 43.65%
  );
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 11px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 1;
`;

const Rank = styled.span`
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0 0 10px #000;
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
`;

const Title = styled.p`
  width: 100%;
  height: 39px;
  ${({ theme }) => theme.textStyles.titleSemiBold};
  color: ${({ theme }) => theme.colors.gray10};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
