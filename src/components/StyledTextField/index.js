import styled from "styled-components";
import { TextField } from "@material-ui/core";

const StyledTextField = styled(TextField)`
  width: 86%;
  margin: 20px auto;
  background-color: ${(props) => props.theme.colors.lightblue};
  input {
    text-align: right;
    font-weight: bold;
    color: black;
  }
`;

export default StyledTextField;
