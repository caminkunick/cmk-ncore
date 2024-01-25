import React, { useCallback, useState } from "react";
import { Box, Button, Slide, styled, TextField } from "@mui/material";
import { PassField } from "./pass.field";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Core, utils } from "..";
import { ChevronLeft, PersonAdd } from "@mui/icons-material";

const Container = styled(Box)({
  "&>:not(:last-child)": {
    marginBottom: "1rem",
  },
});

export const Register = ({
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
  const [data, setData] = useState<{ [key: string]: string }>({});

  const isComplete = {
    email: utils.validateEmail(data.email),
    pass: Boolean(data.pass && data.pass.length >= 8),
    cfpass: Boolean(data.cfpass && data.pass && data.cfpass === data.pass),
  };
  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setData((d) => ({ ...d, [field]: value }));
    };
  const handleRegister = useCallback(() => {
    if (auth) {
      createUserWithEmailAndPassword(auth, data.email, data.pass)
        .then(({ user: _ }) => {
          dispatch({ type: "alert/add", value: { label: "Register success" } });
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
    <Slide in={tab === "register"} direction="left" unmountOnExit>
      <div>
        <Button
          size="small"
          startIcon={<ChevronLeft />}
          onClick={onChangeTab("emailpass")}
        >
          Sign In
        </Button>
        <Container mt={3}>
          <TextField
            fullWidth
            label="Email"
            value={data.email || ""}
            onChange={handleChange("email")}
            error={!isComplete.email}
            helperText={!isComplete.email && "Invalid E-mail"}
          />
          <PassField
            label="Password"
            value={data.pass || ""}
            onChange={handleChange("pass")}
            error={!isComplete.pass}
            helperText={
              !isComplete.pass && "Password must more than 8 charecters"
            }
          />
          <PassField
            label="Confirm Password"
            value={data.cfpass || ""}
            onChange={handleChange("cfpass")}
            error={!isComplete.cfpass}
            helperText={!isComplete.cfpass && "Password not match"}
          />
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<PersonAdd />}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Container>
      </div>
    </Slide>
  );
};
