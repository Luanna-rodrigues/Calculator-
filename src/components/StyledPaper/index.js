import styled from "styled-components";
import { Paper } from "@material-ui/core";

const StyledPaper = styled(Paper)`
  background-color: ${(props) => props.theme.colors.lightpink};
  padding: 25px;
`;

export default StyledPaper;
