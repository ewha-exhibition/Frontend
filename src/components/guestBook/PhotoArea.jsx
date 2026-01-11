import styled from "styled-components";

function PhotoArea({ imageUrls, onOpen, urlLength }) {
  console.log(imageUrls);
  const count = urlLength;

  const handleClick = (i) => {
    if (onOpen) onOpen(i);
  };

  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    return <Wrapper />;
  }

  if (count === 1) {
    return (
      <Wrapper>
        <OneImg>
          <img onClick={() => handleClick(0)} src={imageUrls[0]} alt="사진1" />
        </OneImg>
      </Wrapper>
    );
  }

  if (count === 2) {
    return (
      <Wrapper>
        <TwoImg>
          {imageUrls.map((p, i) => (
            <img
              key={i}
              src={p}
              alt={`사진 ${i + 1}`}
              onClick={() => handleClick(i)}
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
            <img
              onClick={() => handleClick(0)}
              src={imageUrls[0]}
              alt="사진1"
            />
          </div>
          <div className="right">
            <img
              onClick={() => handleClick(1)}
              src={imageUrls[1]}
              alt="사진2"
            />
            <img
              onClick={() => handleClick(2)}
              src={imageUrls[2]}
              alt="사진3"
            />
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
            <img
              onClick={() => handleClick(0)}
              src={imageUrls[0]}
              alt="사진1"
            />
            <img
              onClick={() => handleClick(2)}
              src={imageUrls[2]}
              alt="사진3"
            />
          </div>
          <div className="right">
            <img
              onClick={() => handleClick(1)}
              src={imageUrls[1]}
              alt="사진2"
            />
            <img
              onClick={() => handleClick(3)}
              src={imageUrls[3]}
              alt="사진4"
            />
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
