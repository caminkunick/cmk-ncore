import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DefaultType } from "../ctrls/default";

export type VisibilitySelectProps = {
  value?: DefaultType.VisibilityValue;
  onChange?: (value: DefaultType.VisibilityValue) => void;
};
export const VisibilitySelect = (props: VisibilitySelectProps) => {
  return (
    <FormControl>
      <InputLabel>Visibility</InputLabel>
      <Select<DefaultType.VisibilityValue>
        label="Visibility"
        value={props.value ?? "private"}
        onChange={(e) =>
          props.onChange?.(e.target.value as DefaultType.VisibilityValue)
        }
      >
        <MenuItem value="public">Public</MenuItem>
        <MenuItem value="private">Private</MenuItem>
      </Select>
    </FormControl>
  );
};
