import {
  Box,
  Button as BTN,
  TextField as TF,
  Typography,
  styled,
  TypographyProps,
  TextFieldProps,
  BoxProps,
  ButtonProps,
} from "@mui/material";

export namespace PopupEnhance {
  export const Title = styled((props) => (
    <Typography variant="h6" {...props} />
  ))<TypographyProps>({
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  });

  export const TextField = styled((props) => (
    <TF fullWidth autoFocus {...props} />
  ))<TextFieldProps>({ marginTop: 16 });

  export const ContentCenter = styled(Box)<BoxProps>({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  });

  export const Text = styled((props) => (
    <Typography
      variant="body2"
      color="textSecondary"
      textAlign="center"
      {...props}
    />
  ))<TypographyProps>(({ theme }) => ({
    padding: theme.spacing(0, 1),
  }));

  export const Button = styled((props) => (
    <BTN fullWidth size="large" color="info" {...props} />
  ))<ButtonProps>({});
}
