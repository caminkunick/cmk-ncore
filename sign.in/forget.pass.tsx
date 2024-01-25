import { Box, Button, Slide, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Core, utils } from "..";
import { ChevronLeft, Send } from "@mui/icons-material";

export const ForgetPassword = ({
  tab,
  onChangeTab,
}: {
  tab: string;
  onChangeTab: (tab: string) => () => void;
}) => {
  const {
    state: { auth },
    dispatch,
  } = Core.useCore();
  const [email, setEMail] = useState<string>("");

  const handleSendEmail = useCallback(() => {
    if (auth) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          dispatch({ type: "alert/add", value: { label: "Email Sent" } });
          onChangeTab("emailpass")();
        })
        .catch((err) => {
          dispatch({
            type: "alert/add",
            value: { label: err.message, severity: "error" },
          });
        });
    }
  }, [auth]);

  return (
    <Slide in={tab === "forget"} direction="left" unmountOnExit>
      <div style={{ width: "100%" }}>
        <Box mb={2}>
          <Button
            onClick={onChangeTab("emailpass")}
            size="small"
            startIcon={<ChevronLeft />}
          >
            Sign In
          </Button>
        </Box>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setEMail(value);
          }}
          error={!utils.validateEmail(email)}
          helperText={!utils.validateEmail(email) && "Invalid Email"}
        />
        <Button
          variant="outlined"
          size="large"
          fullWidth
          sx={{ mt: 1 }}
          startIcon={<Send />}
          disabled={!utils.validateEmail(email)}
          onClick={handleSendEmail}
        >
          Send Email
        </Button>
      </div>
    </Slide>
  );
};
