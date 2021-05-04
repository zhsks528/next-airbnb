import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Input from "../common/Input";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
import { loginAPI } from "../../lib/api/auth";
import palette from "../../styles/palette";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import useValidateMode from "../../hooks/useValidateMode";

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
  const { setValidateMode } = useValidateMode();

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

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

  // 로그인 클릭 시
  const onSubmitLogin = async (event: React.FormEvent<HTMLFontElement>) => {
    event.preventDefault();
    setValidateMode(true);

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
    } else {
      const loginBody = { email, password };

      try {
        const { data } = await loginAPI(loginBody);
        console.log(data);
        dispatch(userActions.setLoggedUser(data));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container onSubmit={onSubmitLogin}>
      <ModalCloseXIcon onClick={closeModal} />
      <InputWrapper>
        <Input
          placeholder="이메일 주소"
          name="email"
          type="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          isValid={email !== ""}
          errorMessage="이메일을 입력하세요."
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
          isValid={password !== ""}
          errorMessage="비밀번호를 입력하세요."
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
