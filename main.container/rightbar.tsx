import {
  Divider,
  Drawer,
  DrawerProps,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useMC } from "./ctx";
import { Core } from "..";

export const MCRightbar = () => {
  const { rightbar, open, handleOpen, disableSidebarPadding, restrict } =
    useMC();
  const { mobile } = Core.useCore();
  const isTablet = useMediaQuery("@media (min-width:1180px)");

  const getVariant = (): NonNullable<DrawerProps["variant"]> => {
    if (disableSidebarPadding) {
      return "temporary";
    } else {
      return mobile ? "temporary" : "permanent";
    }
  };

  return rightbar && !Boolean(restrict) && isTablet ? (
    <Drawer
      variant={getVariant()}
      open={open.sidebar}
      onClose={handleOpen("sidebar", false)}
      sx={(theme) => ({
        "& .MuiPaper-root": {
          width: theme.mixins.sidebar.width,
          zIndex: theme.zIndex.appBar - 1,
          backgroundColor: "background.paper",
        },
      })}
      anchor="right"
    >
      <Toolbar />
      <Divider />
      {rightbar}
      <Toolbar />
    </Drawer>
  ) : null;
};
