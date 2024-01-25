import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import * as React from "react";
import { Core } from "..";
import { SignIn } from "../sign.in";
import { Login } from "@mui/icons-material";

const ProfileMenuNotSignContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

export const ProfileMenuNotSign = (
  props: React.HTMLAttributes<React.ReactFragment>
) => {
  const {
    state: { user },
  } = Core.useCore();
  const [open, setOpen] = React.useState(false);

  return (
    <ProfileMenuNotSignContext.Provider value={{ open, setOpen }}>
      {props.children}
      {open && !Boolean(user) && <SignIn onClose={() => setOpen(false)} />}
    </ProfileMenuNotSignContext.Provider>
  );
};

interface ProfileMenuNotSignListItemProps {
  onClose: () => void;
}
export const ProfileMenuNotSignListItem = (
  props: ProfileMenuNotSignListItemProps
) => {
  const { setOpen } = React.useContext(ProfileMenuNotSignContext);

  return (
    <ListItemButton
      dense
      onClick={() => {
        setOpen(true);
        props.onClose();
      }}
    >
      <ListItemIcon>
        <Login />
      </ListItemIcon>
      <ListItemText primary="Sign In" />
    </ListItemButton>
  );
};
