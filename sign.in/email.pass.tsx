import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Link,
  Slide,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { PassField } from "./pass.field";
import { signInWithEmailAndPassword } from "firebase/auth";
import { PopupSignIn } from "./popup.signin";
import { Core } from "..";
import { Login, PersonAdd } from "@mui/icons-material";

const Root = styled("div")({
  "&>:not(:last-child)": {
    marginBottom: "1rem",
  },
});
const LinkButton = styled(Link)({
  cursor: "pointer",
  "&:not(:last-child)": {
    marginBottom: "0.5rem",
  },
});

export const EmailPass = ({
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ [key: string]: string }>({
    email: "",
    pass: "",
  });

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setData((d) => ({ ...d, [field]: value }));
    };
  const handleEmailPassSignIn = useCallback(async () => {
    setLoading(true);
    if (auth) {
      await signInWithEmailAndPassword(auth, data.email, data.pass).catch(
        (err) =>
          dispatch({
            type: "alert/add",
            value: { label: err.message, severity: "error" },
          })
      );
    }
    setLoading(false);
  }, [auth]);

  return (
    <Slide in={tab === "emailpass"} direction="right" unmountOnExit>
      <Root>
        <Typography variant="h5" textAlign="center" textTransform="uppercase">
          Welcome
        </Typography>
        <Box pt={3} />
        <TextField
          fullWidth
          label={"Email"}
          value={data.email}
          disabled={loading}
          onChange={handleChange("email")}
        />
        <PassField
          label="Password"
          value={data.pass || ""}
          onChange={handleChange("pass")}
          disabled={loading}
        />
        <Button
          fullWidth
          variant="outlined"
          size="large"
          startIcon={<Login />}
          disabled={!Boolean(data.email && data.pass) || loading}
          onClick={handleEmailPassSignIn}
        >
          Sign In
        </Button>
        <PopupSignIn />
        <Box textAlign={"center"} display={"flex"} flexDirection={"column"}>
          <LinkButton
            variant="caption"
            color={"textSecondary"}
            onClick={onChangeTab("register")}
          >
            <PersonAdd style={{ marginRight: "0.5rem" }} />
            Register
          </LinkButton>
          <LinkButton
            variant="caption"
            color={"textSecondary"}
            onClick={onChangeTab("forget")}
          >
            Forget Password
          </LinkButton>
        </Box>
      </Root>
    </Slide>
  );
};
