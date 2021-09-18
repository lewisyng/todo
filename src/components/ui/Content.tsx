import { FunctionComponent } from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

type pType = {};

const StyledContent = styled.p<pType>`
  color: white;
`;

const Content: FunctionComponent<Props> = ({ children }) => {
  return <StyledContent>{children}</StyledContent>;
};

export default Content;
