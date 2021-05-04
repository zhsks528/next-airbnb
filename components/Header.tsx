import React from "react";
import Link from "next/link";
import styled from "styled-components";
import palette from "../styles/palette";
import useModal from "../hooks/useModal";
import SignUpModal from "./auth/SignUpModal";
import AirbnbLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logo_text.svg";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
  z-index: 10;
`;

const Wrapper = styled.a`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled(AirbnbLogoIcon)`
  margin-right: 6px;
`;

/* 헤더 로그인 회원가입 버튼 */
const AuthButtons = styled.div``;

const SignUpButton = styled.button`
  height: 42px;
  margin-right: 8px;
  padding: 0 16px;
  border: 0;
  outline: none;
  border-radius: 21px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: ${palette.gray_f7};
  }
`;

const LoginButton = styled.button`
  height: 42px;
  padding: 0 16px;
  border: 0;
  outline: none;
  border-radius: 21px;
  background-color: white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  }
`;

const Header: React.FC = () => {
  const { openModal, closeModal, ModalPortal } = useModal();

  return (
    <Container>
      <Link href="/">
        <Wrapper>
          <HeaderLogo />
          <AirbnbLogoTextIcon />
        </Wrapper>
      </Link>
      <AuthButtons>
        <SignUpButton onClick={openModal}>회원가입</SignUpButton>
        <LoginButton>로그인</LoginButton>
      </AuthButtons>
      <ModalPortal>
        <SignUpModal closePortal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
