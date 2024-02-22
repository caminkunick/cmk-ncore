import { IconButton, IconButtonProps, Tooltip, styled } from "@mui/material";
import { ReactElement, ReactNode, forwardRef, memo } from "react";
import { Core } from "..";

export type ActionIconProps = Omit<IconButtonProps, "title"> & {
  title?: string;
  icon?: ReactNode;
};
export const ActionIcon = memo(
  styled(
    forwardRef<HTMLButtonElement, ActionIconProps>(
      ({ icon, title, ...props }, ref) => {
        const { mobile } = Core.useCore();

        const Wrapper = (props: { children: ReactElement }) =>
          title ? (
            <Tooltip title={title}>{props.children}</Tooltip>
          ) : (
            <>{props.children}</>
          );

        return (
          <Wrapper>
            <IconButton
              ref={ref}
              size={mobile ? "medium" : "small"}
              color="neutral"
              {...props}
            >
              {icon ?? props.children}
            </IconButton>
          </Wrapper>
        );
      }
    )
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
  })
);

export default ActionIcon;
