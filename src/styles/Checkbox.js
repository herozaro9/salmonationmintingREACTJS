import React from "react";
import styled, { keyframes } from "styled-components";

const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const Label = styled.label`
  position: relative;
  display: inline-block;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  margin: 0.6em 1em;
`;

const rotate = keyframes`
 from {
    opacity: 0;
    transform: rotate(0deg);
  }
  to {
    opacity: 1;
    transform: rotate(45deg);
  }
`;

const Indicator = styled.div`
  width: 1.2em;
  height: 1.2em;
  background: #f47621;
  position: absolute;
  top: -0.1em;
  left: -1.6em;
  border: 1px solid #f47621;
  border-radius: 0.2em;

  ${Input}:not(:disabled):checked & {
    background: #f47621;
  }

  ${Label}:hover & {
    background: #f47621;
  }

  &::after {
    content: "";
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: block;
    top: -0.1em;
    left: 0.25em;
    width: 35%;
    height: 70%;
    border: solid #fff;
    border-width: 0 0.2em 0.2em 0;
    animation-name: ${rotate};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  &::disabled {
    cursor: not-allowed;
  }
`;

export default function Checkbox({
  value,
  checked,
  onChange,
  name,
  id,
  label,
  disabled
}) {
  return (
    <Label htmlFor={id} disabled={disabled} className="agreement">
      {label}
      <Input
        id={id}
        type="checkbox"
        name={name}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <Indicator />
      <span style={{ marginLeft: 8 }}>Dengan Ini Anda Setuju <a href="/config/Ketentuan NFT SUI.pdf" target="_blank">Ketentuan NFT SUI</a></span>
    </Label>
  );
}
