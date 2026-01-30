import styled from "styled-components";
import EditIcon from "../../assets/icons/Edit.svg?react";
import DeleteIcon from "../../assets/icons/DeleteComment.svg?react";
import CopyLinkIcon from "../../assets/icons/Link.svg?react";
export const HostMenu = ({
  isOpen,
  closeHostMenu,
  handleShare,
  handleEdit,
  handleDelete,
}) => {
  if (!isOpen) return null;
  return (
    <>
      <Backdrop onClick={closeHostMenu} />
      <MenuContainer>
        <MenuItem onClick={() => handleShare()}>
          <Label>URL 복사</Label>
          <CopyLinkIcon width={22} height={22} />
        </MenuItem>

        <MenuItem onClick={() => handleEdit()}>
          <Label>수정</Label>
          <EditIconStyled width={22} height={22} />
        </MenuItem>

        <MenuItem isDelete onClick={() => handleDelete()}>
          <Label>삭제</Label>
          <DeleteIconStyled width={22} height={22} />
        </MenuItem>
      </MenuContainer>
    </>
  );
};

export default HostMenu;
const EditIconStyled = styled(EditIcon)`
  color: ${({ theme }) => theme.colors.gray9};
`;
const DeleteIconStyled = styled(DeleteIcon)`
  path {
    stroke: ${({ theme }) => theme.colors.gray9};
  }
  stroke-width: 1.1;
`;
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  z-index: 110;
  cursor: default;
`;
const MenuContainer = styled.div`
  position: absolute;
  width: 251px;
  right: 20px;
  top: 46px;
  background-color: white;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 111;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px 11px 14px;
  border-bottom: 0.5px solid #d1d3d8;
  &:last-child {
    border-bottom: none;
    border-radius: 0px 0px 8px 8px;
  }
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 500;
  ${({ theme }) => theme.textStyles.titleSemibold};
  color: ${({ theme }) => theme.colors.gray9};
`;
