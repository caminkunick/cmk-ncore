import { IconButton, IconButtonProps, styled } from "@mui/material";
import { ReactNode, forwardRef } from "react";
import { Core } from "..";

export type ActionIconProps = IconButtonProps & {
  icon?: ReactNode;
};
export const ActionIcon = styled(
  forwardRef<HTMLButtonElement, ActionIconProps>(({ icon, ...props }, ref) => {
    const { mobile } = Core.useCore();

    return (
      <IconButton
        ref={ref}
        size={mobile ? "medium" : "small"}
        color="info"
        {...props}
      >
        {icon ?? props.children}
      </IconButton>
    );
  })
)({
  "&.MuiIconButton-sizeLarge": {
    width: 48,
    height: 48,
  },
  "&.MuiIconButton-sizeSmall": {
    padding: 2,
  },
  ".MuiSvgIcon-root": {
    fontSize: "inherit",
  },
});

export default ActionIcon;
