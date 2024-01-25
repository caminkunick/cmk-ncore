import {
  Avatar,
  Box,
  BoxProps,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useMC } from "./ctx";
import { Login } from "@mui/icons-material";

export const MCIconProfile = (props: Omit<BoxProps, "children">) => {
  const { user, setState } = useMC();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setState((s) => ({ ...s, anchorProfile: event.currentTarget }));

  return (
    <Box {...props}>
      {user === "loading" ? (
        <IconButton color="inherit" disabled>
          <CircularProgress size={36} color="inherit" />
        </IconButton>
      ) : user ? (
        <IconButton edge="end" onClick={handleOpen}>
          <Avatar src={user?.photoURL || undefined} />
        </IconButton>
      ) : (
        <IconButton edge="end" color="inherit" onClick={handleOpen}>
          <Login />
        </IconButton>
      )}
    </Box>
  );
};
