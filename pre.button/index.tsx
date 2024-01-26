import { Button, ButtonProps, styled } from "@mui/material";
import { Add as AddIcon, Refresh } from "@mui/icons-material";

export namespace PreButton {
  const BaseButton = styled((props) => (
    <Button variant="outlined" {...props} />
  ))<ButtonProps>({});

  export const Add = styled((props) => (
    <BaseButton startIcon={<AddIcon />} children="Add" {...props} />
  ))<ButtonProps>({});

  export const Confirm = styled((props) => (
    <BaseButton color="primary" children="Confirm" {...props} />
  ))<ButtonProps>({});

  export const Close = styled((props) => (
    <BaseButton color="neutral" children="Close" {...props} />
  ))<ButtonProps>({});

  export const Remove = styled((props) => (
    <BaseButton color="error" children="Remove" {...props} />
  ))<ButtonProps>({});

  export const Reload = styled((props) => (
    <BaseButton
      color="neutral"
      children="Reload"
      startIcon={<Refresh />}
      {...props}
    />
  ))<ButtonProps>({});
}
