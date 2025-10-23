import styled from "styled-components";
import PhotoArea from "../guestBook/PhotoArea";
import commentIcon from "../../assets/icons/comment.svg";
import deleteIcon from "../../assets/icons/DeleteComment.svg";
//NOTE: comment 컴포넌트 (cheer, question, review), 기본 형식 cheer, 기본 데이터
//NOTE: reply 컴포넌트 (reply, answer), 기본 형식 reply, 기본 데이터 reply

//TODO: currentUser context로 관리
//TODO: 상세페이지 공연 작성자일 때, 작성자 댓글쓰기 버튼 활성화
//TODO: 위의 과정에서 선택된 comment 배경색 변경

export function Cheer({ comment, openModal, currentUser }) {
  return (
    <CommentBox>
      <CommentHeader>
        <div className="info">
          <p className="id">벗{comment.id}</p>
          <p className="date">{comment.date}</p>
        </div>
        {currentUser?.nickname === comment.nickname && (
          <img
            className="delete"
            src={deleteIcon}
            alt="삭제"
            onClick={() => openModal?.("cheer")}
          />
        )}
      </CommentHeader>
      <CommentContent>
        <p className="text">{comment.text}</p>
      </CommentContent>

      {comment.reply?.text ? (
        <Reply
          reply={comment.reply}
          openModal={openModal}
          currentUser={currentUser}
        />
      ) : (
        <WriteReply>
          <img className="img" src={commentIcon} />
          작성자 댓글쓰기
        </WriteReply>
      )}
    </CommentBox>
  );
}
export function Question({ comment, openModal, currentUser }) {
  return (
    <CommentBox>
      <CommentHeader>
        <div className="info">
          <p className="id">벗{comment.id}</p>
          <p className="date">{comment.date}</p>
        </div>
        {currentUser?.nickname === comment.nickname && (
          <img
            className="delete"
            src={deleteIcon}
            alt="삭제"
            onClick={() => openModal?.("question")}
          />
        )}
      </CommentHeader>
      <CommentContent>
        <Tag type="question">질문</Tag>
        <p className="text">{comment.text}</p>
      </CommentContent>

      {comment.reply?.text ? (
        <Answer
          reply={comment.reply}
          openModal={openModal}
          currentUser={currentUser}
        />
      ) : (
        <WriteReply>
          <img className="img" src={commentIcon} />
          작성자 댓글쓰기
        </WriteReply>
      )}
    </CommentBox>
  );
}
export function Review({ comment, openModal, currentUser }) {
  return (
    <CommentBox>
      <CommentHeader>
        <div className="info">
          <p className="id">벗{comment.id}</p>
          <p className="date">{comment.date}</p>
        </div>
        {currentUser?.nickname === comment.nickname && (
          <img
            className="delete"
            src={deleteIcon}
            alt="삭제"
            onClick={() => openModal?.("review")}
          />
        )}
      </CommentHeader>
      <CommentContent>
        <p className="text">{comment.text}</p>
      </CommentContent>
      <PhotoArea pics={comment.photos || []} />

      {comment.reply?.text ? (
        <Reply
          reply={comment.reply}
          openModal={openModal}
          currentUser={currentUser}
        />
      ) : (
        <WriteReply>
          <img className="img" src={commentIcon} />
          작성자 댓글쓰기
        </WriteReply>
      )}
    </CommentBox>
  );
}
function Reply({ reply, openModal, currentUser }) {
  //CommentBox 안에 들어가는 답글
  return (
    <ReplyWrapper>
      <Arrow />
      <ReplyBox>
        <CommentHeader>
          <div className="info">
            <p className="id">{reply.nickname}</p>
            <p className="date">{reply.date}</p>
          </div>{" "}
          {currentUser?.nickname === reply.nickname && (
            <img
              className="delete"
              src={deleteIcon}
              alt="삭제"
              onClick={() => openModal?.("reply")}
            />
          )}
        </CommentHeader>
        <CommentContent>
          <p className="text">{reply.text}</p>
        </CommentContent>
      </ReplyBox>
    </ReplyWrapper>
  );
}
function Answer({ reply, openModal, currentUser }) {
  //CommentBox 안에 들어가는 답글
  return (
    <ReplyWrapper>
      <Arrow />
      <ReplyBox>
        <CommentHeader>
          <div className="info">
            <p className="id">{reply.nickname}</p>
            <p className="date">{reply.date}</p>
          </div>
          {currentUser?.nickname === reply.nickname && (
            <img
              className="delete"
              src={deleteIcon}
              alt="삭제"
              onClick={() => openModal?.("reply")}
            />
          )}
        </CommentHeader>
        <CommentContent>
          <Tag type="answer">답변</Tag>
          <p className="text">{reply.text}</p>
        </CommentContent>
      </ReplyBox>
    </ReplyWrapper>
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
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 8px;

  .text {
    width: 100%;
    color: ${({ theme }) => theme.colors.gray9};
    ${({ theme }) => theme.textStyles.body1Regular};
    word-break: break-word;
    white-space: pre-wrap;
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

//REVIEW: 폰트 스타일 확인 필요 (프리텐다드)
const WriteReply = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  align-self: flex-end;
  ${({ theme }) => theme.textStyles.label2Regular};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray7};
  .img {
    width: 18px;
    height: 18px;
  }
`;
