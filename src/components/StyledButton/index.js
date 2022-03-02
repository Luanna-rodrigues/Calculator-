import styled from "styled-components";
import { Button } from "@material-ui/core";

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.colors[props.color]};
  border-radius: 20px;
  font-size: 1.1rem;
`;

export default StyledButton;
