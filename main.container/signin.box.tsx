import { Core } from "..";
import { SignIn } from "../sign.in";
import { useMC } from "./ctx";

export const MCSignInBox = () => {
  const {
    state: { user },
  } = Core.useCore();
  const {
    state: { anchorProfile },
    setState,
  } = useMC();

  return user !== "loading" && !Boolean(user) && Boolean(anchorProfile) ? (
    <SignIn onClose={() => setState((s) => ({ ...s, anchorProfile: null }))} />
  ) : null;
};
