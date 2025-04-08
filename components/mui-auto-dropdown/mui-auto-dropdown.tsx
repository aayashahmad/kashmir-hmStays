import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function MUIAutoDropDown({
  id = "mui-dropdown",
  label,
  options,
  onChange,
  value,
  placeholder,
  error,
  multiple,
  ...rest
}) {
  const mappedOptions = options.map((options) => options.name);

  return (
    <div>
      <Autocomplete
        disablePortal
        id={id}
        options={mappedOptions}
        onChange={(event, newValue) => onChange(newValue)}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label={label} />}
        multiple={multiple}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
