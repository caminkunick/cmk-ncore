import { Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Loading } from "../loading";
import { SignIn } from "../sign.in";
import { MCAppbar } from "./appbar";
import { MCContent } from "./content";
import { MainContainerProps, MCContext, MCContextTypes } from "./ctx";
import { MCProfileMenu } from "./profile.menu";
import { MCSidebar } from "./sidebar";
import { MCRestrict } from "./restrict";
import { ProfileMenuNotSign } from "./profile.menu.not.sign";
import { MCSignInBox } from "./signin.box";
import { MCRightbar } from "./rightbar";
import { Core } from "..";

export * from "./ctx";
export const MainContainer = (props: MainContainerProps) => {
  const {
    state: { user },
  } = Core.useCore();
  const [open, setOpen] = useState<MCContextTypes["open"]>({
    sidebar: true,
    setting: false,
    signin: false,
  });
  const [state, setState] = useState<MCContextTypes["state"]>({
    anchorProfile: null,
  });

  const store = {
    ...props,
    user,
    open,
    handleOpen: (key: string, value: boolean) => () =>
      setOpen((o) => ({ ...o, [key]: value })),
    state,
    setState,
  };

  if (props.signInOnly) {
    if (user === "loading") {
      return <Loading />;
    } else if (!user) {
      return <SignIn />;
    }
  }

  if (props.loading) {
    return <Loading maxWidth={props.maxWidth} />;
  }

  if (props.restrict) {
    return (
      <MCContext.Provider value={store}>
        <Toolbar />
        <MCContent>
          <MCRestrict {...props.restrictProps} />
        </MCContent>
        <MCAppbar />
      </MCContext.Provider>
    );
  }

  return (
    <MCContext.Provider value={store}>
      <ProfileMenuNotSign>
        <Toolbar />
        <MCContent>{props.children}</MCContent>
        <MCSidebar />
        <MCRightbar />
        <MCAppbar />
        <MCProfileMenu />
      </ProfileMenuNotSign>
      <MCSignInBox />
    </MCContext.Provider>
  );
};

export default MainContainer;
