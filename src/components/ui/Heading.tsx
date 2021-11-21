import { FunctionComponent } from "react";
import styled from "styled-components";
import cn from "classnames";

type Props = {
  children: React.ReactNode;
  color?: string;
  weight?: "normal" | "bold" | "extrabold";
  textAlign?: "left" | "center" | "right";
  allCaps?: boolean;
  className?: string;
};

type h1Type = {
  color: string;
  weight: "normal" | "bold" | "extrabold";
  textAlign: "left" | "center" | "right";
  allCaps: boolean;
};

const StyledHeading = styled.h1<h1Type>`
  font-size: 1.35rem;
  color: ${(props) => props.color};
  font-weight: ${(props) =>
    props.weight === "bold"
      ? "700"
      : props.weight === "extrabold"
      ? "900"
      : "500"};
  text-align: ${(props) => props.textAlign};
  text-transform: ${(props) => props.allCaps && "uppercase"};
`;

const Heading: FunctionComponent<Props> = ({
  children,
  color = "white",
  weight = "normal",
  textAlign = "left",
  allCaps = false,
  className,
}) => {
  return (
    <StyledHeading
      color={color}
      weight={weight}
      textAlign={textAlign}
      allCaps={allCaps}
      className={cn(className)}
    >
      {children}
    </StyledHeading>
  );
};

export default Heading;
