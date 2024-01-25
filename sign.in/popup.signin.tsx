import { Box, IconButton, styled } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Core } from "..";
import { useCallback } from "react";
import { GoogleLogo } from "./google.logo";

const IconButtonOutlined = styled(IconButton)(({ theme }) => ({
  border: `solid 1px ${theme.palette.grey[300]}`,
}));

export const PopupSignIn = () => {
  const { state, dispatch } = Core.useCore();

  const handleGoogleSign = useCallback(() => {
    if (state.auth) {
      const provider = new GoogleAuthProvider();
      signInWithPopup(state.auth, provider).catch((err) =>
        dispatch({
          type: "alert/add",
          value: { label: err.message, severity: "error" },
        })
      );
    }
  }, [state.auth]);

  return (
    <Box display={"flex"} justifyContent={"center"} mt={6} mb={2}>
      <IconButtonOutlined onClick={handleGoogleSign}>
        {/* <GoogleLogo style={{ width: 32, height: 32 }} /> */}
        <img
          src={`data:image/svg+xml;base64,${GoogleLogo()}`}
          style={{ width: 32, height: 32 }}
        />
      </IconButtonOutlined>
    </Box>
  );
};
