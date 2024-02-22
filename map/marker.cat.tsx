import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { MapTool as M } from "./map.tool";

export type MarkerCategorySelectProps = {
  value: string;
  onChange: (value: string) => void;
};
export const MarkerCategorySelect = (props: MarkerCategorySelectProps) => {
  return (
    <FormControl>
      <InputLabel>Category</InputLabel>
      <Select
        label="Category"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {M.Marker.Categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
