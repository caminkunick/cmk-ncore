import { AppBar, Box, Stack, styled, Toolbar, Typography } from "@mui/material";
import { useMC } from "./ctx";
import { MCIconProfile } from "./icon.profile";
import { SidebarToggleButton } from "./sidebar.toggle.button";
import { SiteLogo } from "./site.logo";
import { SiteHomeLink } from "./site.home.link";
import { Core } from "..";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: "solid 1px",
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
}));

export const MCAppbar = () => {
  const {
    sidebar,
    handleOpen,
    startActions: sa,
    endActions: ea,
    disableSidebarPadding,
  } = useMC();
  const {
    state: { sitename, logo, startActions, endActions },
    mobile,
  } = Core.useCore();

  return (
    <AppBarStyled elevation={0}>
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={1} flex={1}>
          {(Boolean(disableSidebarPadding && sidebar) ||
            Boolean(sidebar && mobile)) && (
            <SidebarToggleButton onClick={handleOpen("sidebar", true)} />
          )}
          {Boolean(sitename || logo) && (
            <SiteHomeLink>
              <SiteLogo logo={logo} />
              {sitename && !mobile && (
                <Typography
                  className="site-name"
                  variant="h6"
                  sx={{ pl: 1, fontFamily: "sarabun" }}
                >
                  {sitename}
                </Typography>
              )}
            </SiteHomeLink>
          )}
          {startActions}
          {sa}
          <Box flex={1} />
          {ea}
          {endActions}
          <MCIconProfile />
        </Stack>
      </Toolbar>
    </AppBarStyled>
  );
};
