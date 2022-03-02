import { Box, Container, Grid } from "@material-ui/core";

import React, { useState, useEffect } from "react";
import itemsList from "./items-list";
import {
  StyledButton,
  StyledTextField,
  StyledGridList,
  StyledPaper,
} from "../components";

const Calculator = () => {
  const [data, setData] = useState({ result: [], isError: null });

  const handleKeyDown = (event) => {
    const item = itemsList
      .flatMap(({ items }) => items)
      .find(({ label }) => label === event?.key);

    if (event.key === "Backspace") {
      return handleClick(null, "C");
    }

    if (item) {
      handleClick(item?.number, item?.operator);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const setTotalvalue = (number1, operator, number2) => {
    switch (operator) {
      case "AC":
        setData({ ...data, result: [] });
        break;
      case "C":
        const value = data.result.pop();
        if (value && value.toString().length > 1) {
          data.result.push(value.toString().slice(0, -1));
        }
        setData({ ...data, result: data.result });
        break;
      case "*":
        setData({
          ...data,
          result: [parseFloat(number1) * parseFloat(number2)],
        });
        break;
      case "-":
        setData({
          ...data,
          result: [parseFloat(number1) - parseFloat(number2)],
        });
        break;
      case "%":
        setData({ ...data, result: [parseFloat(number1) / 100] });
        break;
      case "/":
        setData({
          ...data,
          result: [parseFloat(number1) / parseFloat(number2)],
        });
        break;
      default:
        setData({
          ...data,
          result: [parseFloat(number1) + parseFloat(number2)],
        });
    }
  };

  const handleClick = (number, operator) => {
    if (["=", "AC", "C"].includes(operator)) {
      return setTotalvalue(
        data.result[0],
        ["AC", "C"].includes(operator) ? operator : data.result[1],
        data.result[2]
      );
    }

    if (!operator || ["+/-", "."].includes(operator)) {
      let result = [];
      if (data?.result?.length > 0 && data?.result?.length !== 2) {
        result = data.result.map((item, index) => {
          const value =
            data?.result?.length - 1 === index
              ? `${item}${number !== null ? number : ""}`
              : item;

          if (operator === "+/-") {
            return value > 0 ? -Math.abs(value) : Math.abs(value);
          }

          if (operator === ".") {
            return `${value}${operator}`;
          }

          return value;
        });
      } else {
        data?.result?.push(number);
        result = data?.result;
      }

      setData({ ...data, result });
    } else {
      data.result.push(operator);
      setData({ ...data, result: data.result });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box m={5} />
      <StyledPaper elevation={3}>
        <Grid>
          <StyledTextField
            id="total-result"
            placeholder="result"
            label="result"
            variant="outlined"
            disabled={true}
            value={data?.result?.join("")}
          />
        </Grid>

        {itemsList.map(({ items }, index) => (
          <StyledGridList key={index}>
            {items.map(({ label, number, operator, color }, i) => (
              <Grid item key={label}>
                <StyledButton
                  variant="contained"
                  color={color}
                  onClick={() => handleClick(number, operator)}
                >
                  {label}
                </StyledButton>
              </Grid>
            ))}
          </StyledGridList>
        ))}
      </StyledPaper>
    </Container>
  );
};

export default Calculator;
