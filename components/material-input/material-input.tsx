import React from "react";
import {
  InputLabel,
  OutlinedInput,
  FormControl,
  FormHelperText,
} from "@mui/material";

interface MaterialInputProps {
  label: string;
  onChange: (val: string) => void;
  value: string;
  placeholder: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
  type: string
}

const MaterialInput: React.FC<MaterialInputProps> = ({
  label,
  onChange,
  value,
  placeholder,
  error,
  multiline = false,
  rows = 1,
  type="text"
 
}) => {


  console.log("values in input are", label, type)
  return (
    <FormControl variant="outlined" error={!!error}>
      <InputLabel htmlFor="outlined-input">{label}</InputLabel>
      <OutlinedInput
        id="outlined-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        multiline={multiline}
        rows={rows}
        type={type}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default MaterialInput;
