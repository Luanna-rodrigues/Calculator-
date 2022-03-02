import "./App.css";
import Calculator from "./pages/Calculator";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Calculator />
      </ThemeProvider>
    </div>
  );
}

export default App;
