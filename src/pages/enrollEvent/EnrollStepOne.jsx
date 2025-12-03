import styled from "styled-components";
import { useState, useRef } from "react";
import InputBox from "../../components/enrollEvent/InputBox";
import Calender from "../../components/Calender";
import CustomCheckbox from "../../components/enrollEvent/CustomCheckbox";
import CameraIcon from "../../assets/icons/camera.svg?react";
import useS3Upload from "../../utils/hooks/useS3Upload";

function EnrollStepOne({ data, setData }) {
  const fileInputRef = useRef(null);
  const [isFree, setIsFree] = useState(false);
  const [noTicket, setNoTicket] = useState(false);
  const update = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const { uploadToS3 } = useS3Upload();
  const handlePosterChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. 미리보기용 URL
    const previewUrl = URL.createObjectURL(file);

    // 2. S3 업로드
    const s3Url = await uploadToS3(file);

    // 3. 상태 저장
    setData((prev) => ({
      ...prev,
      posterPreviewUrl: previewUrl, // 미리보기
      posterUrl: s3Url, // S3 URL (등록 API에 들어감)
    }));
  };
  return (
    <Container>
      {/* 카테고리 */}
      <Section>
        <Label>카테고리 선택 *</Label>
        <BtnArea>
          {["공연", "전시", "기타"].map((c) => (
            <Button
              key={c}
              $active={data.category === c}
              onClick={() => update("category", c)}
            >
              {c}
            </Button>
          ))}
        </BtnArea>
      </Section>

      {/* 전시 이름 */}
      <Section>
        <Label>공연/전시 이름 *</Label>
        <InputBox
          max={38}
          value={data.exhibitionName}
          onChange={(v) => update("exhibitionName", v)}
        />
      </Section>

      {/* 포스터*/}
      <Section>
        <Label>포스터</Label>
        <ExplainTxt>
          <p>A4 비율이 가장 좋아요</p>
        </ExplainTxt>
        <UploadBox onClick={() => fileInputRef.current?.click()}>
          <CameraIcon width={24} height={24} />
          첨부
        </UploadBox>
        <HiddenInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handlePosterChange}
        />

        {data.posterPreviewUrl && (
          <PosterPreview src={data.posterPreviewUrl} alt="poster-preview" />
        )}
      </Section>

      {/* 장소 */}
      <Section>
        <Label>장소 *</Label>
        <ExplainTxt>
          <p>장소 이름만 입력해주세요</p>
          <ul>
            <li>서울 서대문구 이화여대길 52 (X)</li>
            <li>이화여대 대강당 (O)</li>
          </ul>
        </ExplainTxt>
        <InputBox
          max={25}
          placeholder="장소명"
          value={data.place}
          onChange={(v) => update("place", v)}
        />
      </Section>

      {/* 날짜 */}
      <Section>
        <Label>일시 *</Label>
        <Calender
          startDate={data.startDate}
          endDate={data.endDate}
          onChange={(start, end) => {
            update("startDate", start);
            update("endDate", end);
          }}
        />
      </Section>

      {/* 시간 */}
      <Section2>
        <Section>
          <Label>시작시간 *</Label>
          <InputBox
            placeholder="00:00"
            value={data.startTime}
            onChange={(v) => update("startTime", v)}
          />
          <ExplainTxt>
            <p>&nbsp;입력 방법: 오후 4시 → 16:30 </p>
          </ExplainTxt>
        </Section>
        <Section>
          <Label>끝나는 시간</Label>
          <InputBox
            placeholder="00:00"
            value={data.endTime}
            onChange={(v) => update("endTime", v)}
          />
        </Section>
      </Section2>

      {/* 일시 예외 */}
      <Section>
        <Label>일시 예외사항</Label>
        <ExplainTxt>
          <p>일시 관련하여 예외사항이 있다면 작성해주세요</p>
          <p>예시) 토요일만 14시 마감</p>
        </ExplainTxt>
        <InputBox
          max={25}
          placeholder="예외사항"
          value={data.dateException}
          onChange={(v) => update("dateException", v)}
        />
      </Section>

      {/* 가격 */}
      <Section>
        <Label>가격 *</Label>
        <CheckBoxArea>
          <CustomCheckbox
            checked={isFree}
            onChange={(checked) => {
              setIsFree(checked);
              update("price", checked ? 0 : "");
            }}
          />
          <span>무료</span>
        </CheckBoxArea>

        {!isFree && (
          <InputBox value={data.price} onChange={(v) => update("price", v)} />
        )}
      </Section>

      {/* 예매 링크 */}
      <Section>
        <Label>예매 링크 *</Label>
        <CheckBoxArea>
          <CustomCheckbox
            checked={noTicket}
            onChange={(checked) => {
              setNoTicket(checked);
              update("link", checked ? "" : data.link);
            }}
          />
          <span>예매 필요 없음</span>
        </CheckBoxArea>

        {!noTicket && (
          <InputBox value={data.link} onChange={(v) => update("link", v)} />
        )}
      </Section>

      {/* 주최 단체명 */}
      <Section>
        <Label>주최 단체명 *</Label>
        <ExplainTxt>
          <p>한글만 사용, 최대한 짧게 작성해주세요</p>
          <ul>
            <li>이화여대 아마추어 오케스트라 에세이오스 ESAOS (X)</li>
            <li>에세이오스 (O)</li>
            <li>이화여대 디자인학부 (O)</li>
          </ul>
        </ExplainTxt>
        <InputBox
          max={23}
          placeholder="최대한 짧게 작성해주세요"
          value={data.clubName}
          onChange={(v) => update("clubName", v)}
        />
      </Section>
    </Container>
  );
}

export default EnrollStepOne;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  margin-top: 16px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
`;
const ExplainTxt = styled.div`
  p {
    color: ${({ theme }) => theme.colors.gray6};
    font-size: ${({ theme }) => theme.font.fontSize.label12};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.wide};
  }
  ul {
    list-style-position: outside;
    list-style-type: disc;
    padding-inline-start: 20px;
    margin: 0px;
  }

  li {
    color: ${({ theme }) => theme.colors.gray6};
    font-size: ${({ theme }) => theme.font.fontSize.label12};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.wide};
  }
  li::marker {
    font-size: 0.8em;
  }
`;
const Section2 = styled.div`
  display: flex;
  gap: 8px;
`;
const Label = styled.h3`
  color: ${({ theme }) => theme.colors.blackMain};
  font-size: ${({ theme }) => theme.font.fontSize.title15};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`;
const BtnArea = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;
const Button = styled.div`
  display: flex;
  width: 78px;
  height: 32px;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.font.fontSize.body14};
  font-weight: ${({ theme }) => theme.font.fontWeight.regular};

  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;

  /* 선택*/
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.blackMain : theme.colors.gray4};

  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.gray8};

  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.blackMain : "transparent"};
`;

const CheckBoxArea = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 6px;
  align-items: center;

  span {
    color: ${({ theme }) => theme.colors.gray7};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.wide};
  }
`;

//포스터 첨부
const UploadBox = styled.button`
  width: 108px;
  height: 43px;
  margin-top: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  border-radius: 3px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  color: ${({ theme }) => theme.colors.gray7};
  font-size: ${({ theme }) => theme.font.fontSize.body14};
  background-color: "transparent";

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    background-color: ${({ theme }) => theme.colors.gray1};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PosterPreview = styled.img`
  margin-top: 12px;
  width: 150px;
  border-radius: 8px;
  object-fit: cover;
`;
