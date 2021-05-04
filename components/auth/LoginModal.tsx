import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Input from "../common/Input";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import palette from "../../styles/palette";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";

const Container = styled.form`
  width: 568px;
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

const LoginModalSubmitButtonWrapper = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${palette.gray_eb};
`;

const LoginModalSetSignUp = styled.span`
  color: ${palette.dark_cyan};
  margin-left: 8px;
  cursor: pointer;
`;

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHided, setIsPasswordHided] = useState(true);

  const dispatch = useDispatch();

  // 이메일 주소 변경 함수
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // 비밀번호 변경 함수
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // 비밀번호 표시/숨김 함수
  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  // 로그인 -> 회원가입 변경 함수
  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode("signup"));
  };

  return (
    <Container>
      <ModalCloseXIcon onClick={closeModal} />
      <InputWrapper>
        <Input
          placeholder="이메일 주소"
          name="email"
          type="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="비밀번호 설정하기"
          type={isPasswordHided ? "password" : "text"}
          icon={
            isPasswordHided ? (
              <ClosedEyeIcon onClick={togglePasswordHiding} />
            ) : (
              <OpenedEyeIcon onClick={togglePasswordHiding} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </InputWrapper>
      <LoginModalSubmitButtonWrapper>
        <Button type="submit">로그인</Button>
      </LoginModalSubmitButtonWrapper>
      <p>
        이미 에어비앤비 계정이 있나요?
        <LoginModalSetSignUp role="presentation" onClick={changeToSignUpModal}>
          회원가입
        </LoginModalSetSignUp>
      </p>
    </Container>
  );
};

export default LoginModal;
