import { FunctionComponent } from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  color?: string;
  bold?: boolean;
  textAlign?: "left" | "center" | "right";
  allCaps?: boolean;
};

type h1Type = {
  color: string;
  bold: boolean;
  textAlign: "left" | "center" | "right";
  allCaps: boolean;
};

const StyledHeading = styled.h1<h1Type>`
  font-size: 1.5rem;
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  text-align: ${(props) => props.textAlign};
  text-transform: ${(props) => props.allCaps && "uppercase"};
`;

const Heading: FunctionComponent<Props> = ({
  children,
  color = "white",
  bold = true,
  textAlign = "left",
  allCaps = false,
}) => {
  return (
    <StyledHeading
      color={color}
      bold={bold}
      textAlign={textAlign}
      allCaps={allCaps}
    >
      {children}
    </StyledHeading>
  );
};

export default Heading;
