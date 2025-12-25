import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import useCustomFetch from "../../utils/hooks/useCustomFetch";
import { uploadImageToS3 } from "../../utils/apis/uploadImageToS3";

import Topbar from "../../components/Topbar";
import TextBox from "../../components/review/TextBox";
import ConfirmModal from "../../components/myPage/ConfirmModal";

function CreateReview() {
  const fetch = useCustomFetch();
  const { fetchData } = useCustomFetch();

  const { exhibitionId } = useParams();

  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleTextBoxChange = ({ content, files }) => {
    setContent(content);
    setFiles(files);
  };

  const getPresignedUrls = async (count) => {
    const urls = [];
    for (let i = 0; i < count; i++) {
      const res = await fetchData(`/reviews/images`, "GET");
      const presignedUrl = res?.data.data.url;

      if (presignedUrl) {
        //console.log("s3링크:", presignedUrl);
        urls.push(presignedUrl);
      } else {
        console.error("Presigned URL 단일 요청 실패", res);
      }
    }
    return urls;
  };
  const uploadImages = async () => {
    if (files.length === 0) return [];

    const urls = await getPresignedUrls(files.length);

    if (urls.length === 0) {
      console.warn("Presigned URL 발급 실패. 이미지 업로드를 건너뜁니다.");
      return [];
    }

    const uploadPromises = urls.map((url, idx) => {
      const file = files[idx];
      console.log("업로드중인 링크:", url);
      return uploadImageToS3(file, url);
    });

    try {
      await Promise.all(uploadPromises);
      return urls.map((u) => u.split("?")[0]);
    } catch (error) {
      console.error("이미지 S3 업로드 중 에러 발생:", error);
      alert("이미지 업로드 중 오류가 발생했습니다: " + error.message);
      return [];
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      const imageUrls = await uploadImages();

      const payload = {
        content,
        images: imageUrls,
      };

      const res = await fetchData(`/reviews/${exhibitionId}`, "POST", payload);

      if (res && res.status === 200) {
        console.log("리뷰 업로드 성공:", res);
        setIsOpen(true);
      } else {
        console.error("리뷰 업로드 실패:", res);
        alert("후기 등록에 실패했어요.");
      }
    } catch (error) {
      console.error("리뷰 업로드 중 에러:", error);
      alert("후기 등록 중 오류가 발생했어요.");
    }
  };

  return (
    <Container>
      {isOpen && (
        <ConfirmModal
          message={"후기가 작성되었어요"}
          onClose={() => setIsOpen(false)}
          link={`/guestBook`}
        />
      )}
      <Topbar title={"후기 작성"} />
      <Content>
        <p className="guide">관람 후 느낀 점을 벗들과 나눠주세요!</p>
        <TextBox onChange={handleTextBoxChange} />
        <div>
          <p className="noti">글은 익명으로 등록됩니다.</p>
          <p className="noti">
            작성한 글은 삭제는 가능하나 수정할 수 없습니다.
          </p>
        </div>
      </Content>
      <UploadBtn disabled={!content.trim()} onClick={handleSubmit}>
        작성하기
      </UploadBtn>
    </Container>
  );
}

export default CreateReview;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  padding: 20px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .guide {
    color: ${({ theme }) => theme.colors.blackMain};
    font-size: ${({ theme }) => theme.font.fontSize.headline18};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  }
  .noti {
    color: ${({ theme }) => theme.colors.gray7};
    font-size: ${({ theme }) => theme.font.fontSize.label12};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  }
`;
const UploadBtn = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 20px;

  color: ${({ theme }) => theme.colors.blackMain};
  font-size: ${({ theme }) => theme.font.fontSize.title16};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
`;
