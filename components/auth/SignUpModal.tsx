import React from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import palette from "../../styles/palette";

const Container = styled.div`
  width: 568px;
  height: 614px;
  padding: 32px;
  background-color: white;
  z-index: 11;
`;

const ModalCloseXIcon = styled(CloseXIcon)`
  display: block;
  margin: 0 0 40px auto;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;

  svg {
    position: absolute;
    right: 11px;
    top: 16px;
  }
`;

const Input = styled.input`
  position: relative;
  width: 100%;
  height: 46px;
  padding: 0 44px 0 11px;
  border: 1px solid ${palette.gray_eb};
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  ::placeholder {
    color: ${palette.gray_76};
  }
`;

const SignUpModal: React.FC = () => {
  return (
    <Container>
      <ModalCloseXIcon />
      <InputWrapper>
        <Input placeholder="이메일 주소" type="email" name="email" />
        <MailIcon />
      </InputWrapper>
      <InputWrapper>
        <Input placeholder="이름(예: 길동)" />
        <PersonIcon />
      </InputWrapper>
      <InputWrapper>
        <Input placeholder="성(예: 홍)" />
        <PersonIcon />
      </InputWrapper>
      <InputWrapper>
        <Input placeholder="비밀번호 설정하기" type="password" />
        <OpenedEyeIcon />
      </InputWrapper>
    </Container>
  );
};

export default SignUpModal;
