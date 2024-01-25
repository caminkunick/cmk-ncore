import {
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  styled,
  Toolbar,
} from "@mui/material";
import { useMC } from "./ctx";
import { Core } from "..";
import { Menu } from "@mui/icons-material";

export const MCSidebar = styled(({ className }: { className?: string }) => {
  const { sidebar, open, handleOpen, disableSidebarPadding, restrict } =
    useMC();
  const { mobile } = Core.useCore();

  const getVariant = (): Exclude<DrawerProps["variant"], undefined> => {
    if (disableSidebarPadding) {
      return "temporary";
    } else {
      return mobile ? "temporary" : "permanent";
    }
  };

  return sidebar && !Boolean(restrict) ? (
    <Drawer
      variant={getVariant()}
      open={open.sidebar}
      onClose={handleOpen("sidebar", false)}
      PaperProps={{ className }}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Toolbar>
        <IconButton edge="start" onClick={handleOpen("sidebar", false)}>
          <Menu />
        </IconButton>
      </Toolbar>
      <Divider />
      {sidebar}
      <Toolbar />
    </Drawer>
  ) : null;
})(({ theme }) => ({
  width: theme.mixins.sidebar.width,
  zIndex: theme.zIndex.appBar - 1,
}));
