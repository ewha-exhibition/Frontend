import { useState } from "react";
import styled from "styled-components";
import PhotoArea from "../guestBook/PhotoArea";
import PhotoViewer from "../guestBook/PhotoViewer";

import commentIcon from "../../assets/icons/comment.svg";
import deleteIcon from "../../assets/icons/DeleteComment.svg";

export function Cheer({ comment, isHost, club, openModal, onReply }) {
  const [isReplying, setIsReplying] = useState(false); // 입력창 열림 여부
  const [replyText, setReplyText] = useState(""); // 입력된 텍스트
  const handleSubmit = () => {
    if (!replyText.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }
    // 부모에게 전달 (댓글 ID, 내용)
    onReply(comment.postId, replyText);
    // 초기화 및 닫기
    setReplyText("");
    setIsReplying(false);
  };
  // UI 렌더링
  return (
    <CommentBox>
      <CommentHeader>
        <div className="info">
          <p className="id">{comment.writer}</p>
          <p className="date">{comment.createdAt}</p>
        </div>

        {/* 본인 글일 때만 삭제 아이콘 노출*/}
        {comment.isWriter && (
          <img
            className="delete"
            src={deleteIcon}
            alt="삭제하기"
            onClick={() => openModal(comment.postId, "cheer")}
          />
        )}
      </CommentHeader>

      <CommentContent>
        {comment.isDeleted && comment.hasAnswer ? (
          <p className="text">삭제된 응원이에요.</p>
        ) : (
          <p className="text">{comment.content}</p>
        )}
      </CommentContent>

      {/* 답변이 있는 경우 */}
      {comment.hasAnswer && comment.answer ? (
        <Answer
          type="comment"
          date={comment.answerCreatedAt}
          text={comment.answer}
          postId={comment.answerId} // commentId: 응원/질문에 대한 답변의 고유 ID
          isHost={isHost} // 주최자가 작성한 답변인지 여부 전달, 답변 삭제 기능 제어용
          club={club}
          openModal={openModal}
        />
      ) : isHost ? (
        <ReplySection>
          {isReplying ? (
            <InputWrapper>
              <StyledTextArea
                placeholder="답변을 입력해주세요."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <ButtonRow>
                <CancelButton onClick={() => setIsReplying(false)}>
                  취소
                </CancelButton>
                <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
              </ButtonRow>
            </InputWrapper>
          ) : (
            <WriteReply onClick={() => setIsReplying(true)}>
              <img className="img" src={commentIcon} alt="댓글" />
              작성자 댓글쓰기
            </WriteReply>
          )}
        </ReplySection>
      ) : null}
    </CommentBox>
  );
}

export function Question({ comment, isHost, club, openModal, onReply }) {
  const [isReplying, setIsReplying] = useState(false); // 입력창 열림 여부
  const [replyText, setReplyText] = useState(""); // 입력된 텍스트
  const handleSubmit = () => {
    if (!replyText.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }
    // 부모에게 전달 (댓글 ID, 내용)
    onReply(comment.postId, replyText);

    // 초기화 및 닫기
    setReplyText("");
    setIsReplying(false);
  };
  // UI 렌더링
  return (
    <CommentBox>
      <CommentHeader>
        <div className="info">
          <p className="id">{comment.writer}</p>
          <p className="date">{comment.createdAt}</p>
        </div>

        {/* 본인 글일 때만 삭제 아이콘 노출 */}
        {comment.isWriter && (
          <img
            className="delete"
            src={deleteIcon}
            alt="삭제하기"
            onClick={() => openModal(comment.postId, "question")}
          />
        )}
      </CommentHeader>

      <CommentContent>
        <Tag type="question">질문</Tag>
        {comment.isDeleted && comment.hasAnswer ? (
          <p className="text">삭제된 질문이에요.</p>
        ) : (
          <p className="text">{comment.content}</p>
        )}
      </CommentContent>

      {/* 답변 로직 */}
      {comment.hasAnswer && comment.answer ? (
        <Answer
          type="question"
          date={comment.answerCreatedAt}
          text={comment.answer}
          postId={comment.answerId} // commentId: 응원/질문에 대한 답변의 고유 ID
          isHost={isHost} // 주최자가 작성한 답변인지 여부 전달, 답변 삭제 기능 제어용
          club={club}
          openModal={openModal}
        />
      ) : isHost ? (
        <ReplySection>
          {isReplying ? (
            <InputWrapper>
              <StyledTextArea
                placeholder="답변을 입력해주세요."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <ButtonRow>
                <CancelButton onClick={() => setIsReplying(false)}>
                  취소
                </CancelButton>
                <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
              </ButtonRow>
            </InputWrapper>
          ) : (
            <WriteReply onClick={() => setIsReplying(true)}>
              <img className="img" src={commentIcon} alt="댓글" />
              작성자 댓글쓰기
            </WriteReply>
          )}
        </ReplySection>
      ) : null}
    </CommentBox>
  );
}

// 답글 컴포넌트
function Answer({ type, date, text, postId, club, isHost, openModal }) {
  return (
    <ReplyWrapper>
      <Arrow />
      <ReplyBox>
        <CommentHeader>
          <div className="info">
            <p className="id">{club}</p>
            <p className="date">{date}</p>
          </div>
          {isHost && (
            <img
              className="delete"
              src={deleteIcon}
              alt="삭제하기"
              onClick={() => openModal(postId, "comment")}
            />
          )}
        </CommentHeader>
        <CommentContent>
          {type === "question" && <Tag type="answer">답변</Tag>}
          <p className="text">{text}</p>
        </CommentContent>
      </ReplyBox>
    </ReplyWrapper>
  );
}

export function Review({ comment, isHost, club, openModal, onReply }) {
  // 사진 보기 상태 관리
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // 대댓글(답변) 입력 상태 관리
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleSubmit = () => {
    if (!replyText.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }
    // 부모에게 전달 (댓글 ID, 내용)
    onReply(comment.id || comment.postId, replyText);

    // 초기화 및 닫기
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <CommentBox>
      <CommentHeader>
        <div className="info">
          <p className="id">{comment.writer}</p>
          <p className="date">{comment.createdAt}</p>
        </div>

        {/* 리뷰 작성자가 본인 글 삭제 (기존 로직 유지) */}
        {comment.isWriter && (
          <img
            className="delete"
            src={deleteIcon}
            // 리뷰 삭제 모달 호출 (타입: review)
            onClick={() => openModal(postId, "review")}
            alt="삭제하기"
          />
        )}
      </CommentHeader>

      <CommentContent>
        <p className="text">{comment.content}</p>
      </CommentContent>

      {/* 사진 영역 */}
      {comment.images && comment.images.length > 0 && (
        <PhotoArea
          pics={comment.images}
          onOpen={(i) => {
            setIndex(i);
            setOpen(true);
          }}
        />
      )}
      {open && (
        <PhotoViewer
          pics={comment.images}
          index={index}
          setIndex={setIndex}
          onClose={() => setOpen(false)}
        />
      )}

      {/* 답변(대댓글) 로직 수정 부분 */}
      {comment.hasAnswer && comment.answer ? (
        <Answer
          type="review"
          date={comment.answerCreatedAt}
          text={comment.answer}
          postId={comment.answerId}
          isHost={isHost} // 주최자 여부
          club={club} // 동아리 이름
          openModal={openModal} // 삭제 모달 함수
        />
      ) : isHost ? (
        <ReplySection>
          {isReplying ? (
            <InputWrapper>
              <StyledTextArea
                placeholder="답변을 입력해주세요."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <ButtonRow>
                <CancelButton onClick={() => setIsReplying(false)}>
                  취소
                </CancelButton>
                <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
              </ButtonRow>
            </InputWrapper>
          ) : (
            <WriteReply onClick={() => setIsReplying(true)}>
              <img className="img" src={commentIcon} alt="댓글" />
              작성자 댓글쓰기
            </WriteReply>
          )}
        </ReplySection>
      ) : null}
    </CommentBox>
  );
}
const CommentBox = styled.div`
  width: 100%;
  padding: 17px 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .info {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 6px;
  }
  .id {
    width: fit-content;
    color: ${({ theme }) => theme.colors.gray10};
    ${({ theme }) => theme.textStyles.label1Medium};
  }
  .date {
    width: fit-content;
    color: ${({ theme }) => theme.colors.gray6};
    ${({ theme }) => theme.textStyles.label2Regular};
  }
  .delete {
    width: 16px;
    height: 16px;
    align-self: flex-end;
  }
`;

const CommentContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;

  .text {
    width: 100%;
    color: ${({ theme }) => theme.colors.gray9};
    ${({ theme }) => theme.textStyles.body1Regular};
    word-break: break-word;
    white-space: pre-wrap;
    align-self: center;
  }
`;
const ReplyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  gap: 10px;
`;
const ReplyBox = styled.div`
  width: 100%;
  padding: 12px;

  display: flex;
  flex-direction: column;
  gap: 9px;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  border-radius: 8px;
`;
const Tag = styled.p`
  width: 36px;
  height: 20px;
  padding: 3px 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  ${({ theme }) => theme.textStyles.label2Medium};

  background: ${({ theme, type }) =>
    type === "question" ? theme.colors.SubColor1 : theme.colors.gray2};
  color: ${({ theme, type }) =>
    type === "question" ? theme.colors.Primary60 : theme.colors.gray7};
`;

const Arrow = styled.div`
  width: 12px;
  height: 12px;
  margin-top: 8px;
  border-left: 2px solid ${({ theme }) => theme.colors.gray5};
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray5};
  border-radius: 2px;
`;

const WriteReply = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  align-self: flex-end;
  ${({ theme }) => theme.textStyles.label2Regular};
  color: ${({ theme }) => theme.colors.gray7};
  .img {
    width: 18px;
    height: 18px;
  }
`;

// [NEW] 답변창 감싸는 박스
const ReplySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 오른쪽 정렬 */
  margin-top: 4px;
`;

// [NEW] 입력창 감싸는 박스
const InputWrapper = styled.div`
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  background-color: ${({ theme }) =>
    theme.colors.white}; // 아주 연한 회색 배경 추천
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// [NEW] 텍스트 입력 영역
const StyledTextArea = styled.textarea`
  width: 100%;
  border: none;
  padding: 8px;
  resize: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray9};
  ${({ theme }) => theme.textStyles.body2Regular};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray5};
  }
`;

// [NEW] 버튼 행
const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

// [NEW] 공통 버튼 스타일
const BaseButton = styled.button`
  padding: 6px 14px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  ${({ theme }) => theme.textStyles.label2Medium};
`;

// [NEW] 취소 버튼
const CancelButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.gray8};
`;

// [NEW] 등록 버튼
const SubmitButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.gray9}; // 혹은 Primary 컬러
  color: ${({ theme }) => theme.colors.white};
`;
