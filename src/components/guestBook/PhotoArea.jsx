import styled from "styled-components";

function PhotoArea({ pics, onOpen }) {
  const count = pics.length;

  const handleClick = (i) => {
    if (onOpen) onOpen(i);
  };

  if (count === 1) {
    return (
      <Wrapper>
        <OneImg>
          <img onClick={() => handleClick(0)} src={pics[0].src} alt="사진1" />
        </OneImg>
      </Wrapper>
    );
  }

  if (count === 2) {
    return (
      <Wrapper>
        <TwoImg>
          {pics.map((p, i) => (
            <img
              onClick={() => handleClick(i)}
              key={i}
              src={p.src}
              alt={`사진 ${i + 1}`}
            />
          ))}
        </TwoImg>
      </Wrapper>
    );
  }

  if (count === 3) {
    return (
      <Wrapper>
        <ThreeImg>
          <div className="left">
            <img onClick={() => handleClick(0)} src={pics[0].src} alt="사진1" />
          </div>
          <div className="right">
            <img onClick={() => handleClick(1)} src={pics[1].src} alt="사진2" />
            <img onClick={() => handleClick(2)} src={pics[2].src} alt="사진3" />
          </div>
        </ThreeImg>
      </Wrapper>
    );
  }

  if (count === 4) {
    return (
      <Wrapper>
        <FourImg>
          <div className="left">
            <img onClick={() => handleClick(0)} src={pics[0].src} alt="사진1" />
            <img onClick={() => handleClick(2)} src={pics[2].src} alt="사진3" />
          </div>
          <div className="right">
            <img onClick={() => handleClick(1)} src={pics[1].src} alt="사진2" />
            <img onClick={() => handleClick(4)} src={pics[3].src} alt="사진4" />
          </div>
        </FourImg>
      </Wrapper>
    );
  }

  return null;
}

export default PhotoArea;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  aspect-ratio: 4 / 3;
  overflow: hidden;
`;

const OneImg = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const TwoImg = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const ThreeImg = styled.div`
  display: flex;
  gap: 7px;

  width: 100%;
  height: 100%;

  .left {
    flex: 1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
  }

  .right {
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: 7px;

    img {
      width: 100%;
      height: 50%;
      object-fit: cover;
      border-radius: 4px;
    }
  }
`;
const FourImg = styled.div`
  display: flex;
  gap: 7px;

  width: 100%;
  height: 100%;

  .left {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 7px;

    img {
      width: 100%;
      height: 50%;
      object-fit: cover;
      border-radius: 4px;
    }
  }

  .right {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 7px;

    img {
      width: 100%;
      height: 50%;
      object-fit: cover;
      border-radius: 4px;
    }
  }
`;
