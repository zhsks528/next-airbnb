import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Container = styled.div`
  width: 100%;
  height: 46px;
`;

const SelectWrapper = styled.select`
  width: 100%;
  height: 100%;
  padding: 0 11px;
  border: 1px solid ${palette.gray_eb};
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
  background-color: white;
  background-image: url("/static/svg/common/selector/selector_down_arrow.svg");
  background-position: right 11px center;
  background-repeat: no-repeat;
  font-size: 16px;

  &:focus {
    border-color: ${palette.dark_cyan};
  }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
}

const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  ...props
}) => {
  return (
    <Container>
      <SelectWrapper {...props}>
        {disabledOptions.map((option, index) => {
          <option key={index} value={option} disabled>
            {option}
          </option>;
        })}
      </SelectWrapper>
    </Container>
  );
};

export default Selector;
