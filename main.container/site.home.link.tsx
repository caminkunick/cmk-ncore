import { Box, BoxProps, Stack, styled } from "@mui/material";

const Root = styled(Box)({ cursor: "pointer" });

export type SiteHomeLinkProps = Omit<BoxProps, "onClick">;

export const SiteHomeLink = ({ children, ...props }: SiteHomeLinkProps) => {
  return (
    <Root {...props} onClick={() => window.open("/", "_self")}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {children}
      </Stack>
    </Root>
  );
};
