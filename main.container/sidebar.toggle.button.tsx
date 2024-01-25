import { Menu } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";

export const SidebarToggleButton = (props: IconButtonProps) => {
  return (
    <IconButton edge="start" {...props}>
      <Menu />
    </IconButton>
  );
};
