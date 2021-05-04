import React, { useState } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import Input from "../common/Input";
import Selector from "../common/Selector";
import Button from "../common/Button";
import { monthList, dayList, yearList } from "lib/staticData";
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
`;

const SignUpBirthdayLabel = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const SignUpModalBrithdayInfo = styled.p`
  margin-bottom: 16px;
  color: ${palette.charcoal};
`;

const SignUpModalBirthdaySelectors = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const SignUpModalBirthdayMonthSelector = styled.div`
  margin-right: 16px;
  flex-grow: 1;
`;

const SignUpModalBirthdayDaySelector = styled.div`
  margin-right: 16px;
  width: 25%;
`;

const SignUpModalBirthdayYearSelector = styled.div`
  width: 33.3333%;
`;

const SignUpModalSubmitButtonWrapper = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${palette.gray_eb};
`;

interface IProps {
  closePortal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closePortal }) => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();

  // 이메일 주소 변경 함수
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // 이름 변경 함수
  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  // 성 변경 함수
  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };

  // 비밀번호 변경 함수
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // 비밀번호 숨김 토글 함수
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  // 생년월일 년도 변경 함수
  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };

  // 생년월일 월 변경 함수
  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };

  // 생년월일 일 변경 함수
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };

  return (
    <Container>
      <ModalCloseXIcon onClick={closePortal} />
      <InputWrapper>
        <Input
          placeholder="이메일 주소"
          type="email"
          name="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="이름(예: 길동)"
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="성(예: 홍)"
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="비밀번호 설정하기"
          type={hidePassword ? "password" : "text"}
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </InputWrapper>
      <SignUpBirthdayLabel>생일</SignUpBirthdayLabel>
      <SignUpModalBrithdayInfo>
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
        에어비앤비 이용자에게 공개되지 않습니다.
      </SignUpModalBrithdayInfo>
      <SignUpModalBirthdaySelectors>
        <SignUpModalBirthdayMonthSelector>
          <Selector
            options={monthList}
            disabledOptions={["월"]}
            defaultValue="월"
            value={birthMonth}
            onChange={onChangeBirthMonth}
          />
        </SignUpModalBirthdayMonthSelector>
        <SignUpModalBirthdayDaySelector>
          <Selector
            options={dayList}
            disabledOptions={["일"]}
            defaultValue="일"
            value={birthDay}
            onChange={onChangeBirthDay}
          />
        </SignUpModalBirthdayDaySelector>
        <SignUpModalBirthdayYearSelector>
          <Selector
            options={yearList}
            disabledOptions={["년"]}
            defaultValue="년"
            value={birthYear}
            onChange={onChangeBirthYear}
          />
        </SignUpModalBirthdayYearSelector>
      </SignUpModalBirthdaySelectors>

      <SignUpModalSubmitButtonWrapper>
        <Button type="submit">가입하기</Button>
      </SignUpModalSubmitButtonWrapper>
    </Container>
  );
};

export default SignUpModal;
