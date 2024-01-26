import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  styled,
  Tooltip,
} from "@mui/material";

import { useMC } from "./ctx";
import { signOut, updateProfile } from "firebase/auth";
import { ProfileMenuNotSignListItem } from "./profile.menu.not.sign";
import { Fragment, useCallback, useState } from "react";
import { StockImageDocument, StockPicker } from "../stock.picker";
import ActionIcon from "../action.icon";
import { CameraAlt, Edit, InfoRounded, Logout } from "@mui/icons-material";
import { Core } from "..";
import { UserStatic } from "../ctrls/user.static";

const ListItemButtonErrorStyled = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const MCProfileMenu = () => {
  const {
    state: { auth, user, profileMenu },
    dispatch,
  } = Core.useCore();
  const { handleOpen, state, setState, profileMenu: pfm } = useMC();
  const [open, setOpen] = useState<boolean>(false);

  const handleChangeDisplayName = () => {
    dispatch({
      type: "popup",
      value: {
        title: "Edit Display Name",
        text: "Display Name",
        icon: <Edit fontSize="inherit" />,
        value: (user !== "loading" && user?.displayName) || "",
        type: "prompt",
        onConfirm: async (value) => {
          if (typeof value === "string" && user !== "loading" && user) {
            await UserStatic.changeDisplayName(user, value);
            dispatch({ type: "user", value: user });
          }
        },
      },
    });
  };
  const handleChangePhotoURL = async (images: StockImageDocument[]) => {
    if (images[0] && user !== "loading" && user) {
      const { medium: photoURL } = images[0];
      await updateProfile(user, { photoURL });
      dispatch({ type: "user", value: user });
    }
  };
  const handleClose = () => setState((s) => ({ ...s, anchorProfile: null }));
  const handleSignOut = useCallback(async () => {
    if (auth) {
      signOut(auth).then(() => window.open("/", "_self"));
    }
    handleClose();
  }, [auth]);

  return (
    <>
      <Menu
        open={Boolean(user !== "loading" && user && state.anchorProfile)}
        anchorEl={state.anchorProfile}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableEnforceFocus
        sx={(theme) => ({
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: theme.mixins.sidebar.width,
          },
        })}
      >
        <List disablePadding>
          <ListItem sx={{ justifyContent: "center", pt: 3 }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  size="small"
                  sx={{
                    color: "white",
                    backgroundColor: "#0008",
                    transition: "background-color 0.25s ease-in-out",
                    "&:hover": { backgroundColor: "#000D" },
                  }}
                  onClick={() => setOpen(true)}
                >
                  <CameraAlt />
                </IconButton>
              }
            >
              <Avatar
                src={(user !== "loading" && user?.photoURL) || undefined}
                sx={{ width: 128, height: 128 }}
              />
            </Badge>
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <>{(user !== "loading" && user?.displayName) || ""}&nbsp;</>
              }
              primaryTypographyProps={{
                noWrap: true,
                variant: "body1",
                fontWeight: "bold",
              }}
            />
            <ListItemSecondaryAction>
              <ActionIcon
                icon={<Edit />}
                color="warning"
                onClick={handleChangeDisplayName}
              />
              {user !== "loading" && user?.email && (
                <Tooltip title={user.email}>
                  <IconButton size="small">
                    <InfoRounded />
                  </IconButton>
                </Tooltip>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          {pfm}
          {profileMenu}
          {user ? (
            <Fragment>
              <ListItemButtonErrorStyled dense onClick={handleSignOut}>
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={"Sign Out"} />
              </ListItemButtonErrorStyled>
            </Fragment>
          ) : (
            <ProfileMenuNotSignListItem onClose={handleClose} />
          )}
        </List>
      </Menu>
      <StockPicker
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleChangePhotoURL}
      />
    </>
  );
};
