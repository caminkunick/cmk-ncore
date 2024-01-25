import * as React from "react";
import { Box, BoxProps, styled } from "@mui/material";
import { Copyright } from "@mui/icons-material";

export interface CreditDisplayProps extends BoxProps {
  type: string;
  value: string;
  uid?: string;
  isAbsolute?: boolean;
}

export const CreditDisplay = styled(
  ({ type, value, uid, ...props }: CreditDisplayProps) => {
    return (
      <Box {...props}>
        {(() => {
          switch (type) {
            default:
              return (
                <React.Fragment>
                  <Copyright />
                  &nbsp;
                  <a
                    href={`https://mek.network/profile/${uid}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {value}
                  </a>
                </React.Fragment>
              );
          }
        })()}
      </Box>
    );
  }
,{
  shouldForwardProp: prop => prop !== "isAbsolute"
})<CreditDisplayProps>(({ theme, isAbsolute }) => ({
  ...theme.typography.caption,
  color: "white",
  padding: theme.spacing(0, 0.5),
  backgroundColor: `rgba(0,0,0,0.5)`,
  "& a": { color: "inherit" },
  ...(isAbsolute
    ? {
        position: "absolute",
        top: 0,
        left: 0,
      }
    : {}),
}));
