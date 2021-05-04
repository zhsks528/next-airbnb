import React from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import Input from "../common/Input";

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
`;

const SignUpModal: React.FC = () => {
  return (
    <Container>
      <ModalCloseXIcon />
      <InputWrapper>
        <Input
          placeholder="이메일 주소"
          type="email"
          name="email"
          icon={<MailIcon />}
        />
      </InputWrapper>
      <InputWrapper>
        <Input placeholder="이름(예: 길동)" icon={<PersonIcon />} />
      </InputWrapper>
      <InputWrapper>
        <Input placeholder="성(예: 홍)" icon={<PersonIcon />} />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="비밀번호 설정하기"
          type="password"
          icon={<OpenedEyeIcon />}
        />
      </InputWrapper>
    </Container>
  );
};

export default SignUpModal;
