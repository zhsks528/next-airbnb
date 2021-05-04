import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
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
import { signupAPI } from "../../lib/api/auth";
import useValidateMode from "../../hooks/useValidateMode";
import PasswordWarning from "./PasswordWarning";

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

const SignUpModalSetLogin = styled.span`
  color: ${palette.dark_cyan};
  margin-left: 8px;
  cursor: pointer;
`;

interface IProps {
  closeModal: () => void;
}

const PASSWORD_MIN_LENGTH = 8;

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();

  const dispatch = useDispatch();
  const { validateMode, setValidateMode } = useValidateMode();

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

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

  // 비밀번호 입력창 포커스 되었을 때
  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  // 비밀번호가 이름이나 이메일을 포함하는지
  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastname ||
      password.includes(lastname) ||
      password.includes(email.split("@")[0]),
    [password, lastname, email]
  );

  // 비밀번호가 최소 자릿수 이상인지
  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  // 비밀번호가 숫자나 특수기호를 포함하는지
  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !(
        /[{}[\]/?.,;:)*~`!^\-_+<>@#$%&\\=('")]/g.test(password) ||
        /[0-9]/g.test(password)
      ),
    [password]
  );

  // 회원가입 폼 입력 값 확인하기
  const validateSignUpForm = () => {
    // 입력 값이 없다면
    if (!email || !lastname || !firstname || !password) {
      return false;
    }

    // 비밀번호가 올바르지 않다면
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      isPasswordHasNumberOrSymbol
    ) {
      return false;
    }

    // 생년월일 선택 값이 없다면
    if (!birthDay || !birthMonth || !birthYear) {
      return false;
    }

    return true;
  };

  // 회원가입 폼 제출하기
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);

    dispatch(commonActions.setValidateMode(true));

    if (validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          lastname,
          firstname,
          password,
          birthDay: new Date(
            `${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`
          ).toISOString(),
        };

        const { data } = await signupAPI(signUpBody);

        dispatch(userActions.setLoggedUser(data));

        closeModal();

        console.log(userActions.setLoggedUser(data));
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container>
      <ModalCloseXIcon onClick={closeModal} />
      <InputWrapper>
        <Input
          placeholder="이메일 주소"
          type="email"
          name="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage="이메일이 필요합니다."
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="이름(예: 길동)"
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
          useValidation
          isValid={!!lastname}
          errorMessage="이름을 입력하세요."
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="성(예: 홍)"
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
          useValidation
          isValid={!!firstname}
          errorMessage="성을 입력하세요."
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
          useValidation
          isValid={
            !isPasswordHasNameOrEmail &&
            !isPasswordOverMinLength &&
            !isPasswordHasNumberOrSymbol
          }
          errorMessage="비밀번호를 입력하세요."
          onFocus={onFocusPassword}
        />
      </InputWrapper>
      {passwordFocused && (
        <>
          <PasswordWarning
            isValid={isPasswordHasNameOrEmail}
            text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
          />
          <PasswordWarning isValid={!isPasswordOverMinLength} text="최소 8자" />
          <PasswordWarning
            isValid={isPasswordHasNumberOrSymbol}
            text="숫자나 기호를 포함하세요."
          />
        </>
      )}
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
            isValid={!!birthMonth}
          />
        </SignUpModalBirthdayMonthSelector>
        <SignUpModalBirthdayDaySelector>
          <Selector
            options={dayList}
            disabledOptions={["일"]}
            defaultValue="일"
            value={birthDay}
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </SignUpModalBirthdayDaySelector>
        <SignUpModalBirthdayYearSelector>
          <Selector
            options={yearList}
            disabledOptions={["년"]}
            defaultValue="년"
            value={birthYear}
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </SignUpModalBirthdayYearSelector>
      </SignUpModalBirthdaySelectors>

      <SignUpModalSubmitButtonWrapper>
        <Button type="submit">가입하기</Button>
      </SignUpModalSubmitButtonWrapper>
      <p>
        <SignUpModalSetLogin role="presentation" onClick={() => {}}>
          로그인
        </SignUpModalSetLogin>
      </p>
    </Container>
  );
};

export default SignUpModal;
