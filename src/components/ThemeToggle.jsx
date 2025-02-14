import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => props.theme.buttonBg};
  color: ${(props) => props.theme.buttonText};
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  width: 150px;
  margin-bottom: 20px;
`;

export default function ThemeToggle() {
  const { toggleTheme } = useContext(ThemeContext);

  return <Button onClick={toggleTheme}>Alternar Tema</Button>;
}
