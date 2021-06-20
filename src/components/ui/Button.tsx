import { FunctionComponent } from "react";
import { colors } from "src/styles/colors";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  color?: "default" | "warning" | "info";
  fullWidth?: boolean;
  onClick?: () => void;
};

type buttonType = {
  color: "default" | "warning" | "info";
  fullWidth: boolean;
};

const StyledButton = styled.button<buttonType>`
  background-color: ${(props) =>
    props.color === "default"
      ? colors.btnBlue
      : props.color === "warning"
      ? "red"
      : props.color === "info"
      ? "yellow"
      : "blue"};

  ${(props) => props.fullWidth && "width: 100%"};

  border: 0;
  padding: 8px 16px;
  color: white;

  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;

  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.1));
  outline: 0;
  background-color: $btnBlue;

  &:hover {
    background-color: ${(props) =>
      props.color === "default"
        ? colors.btnBlueHover
        : props.color === "warning"
        ? "red"
        : props.color === "info"
        ? "yellow"
        : "blue"};
  }
`;

const Button: FunctionComponent<Props> = ({
  children,
  color = "default",
  fullWidth,
  onClick,
}) => {
  return (
    <StyledButton color={color} onClick={onClick} fullWidth>
      {children}
    </StyledButton>
  );
};

export default Button;
