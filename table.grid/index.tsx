import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { Avatar, Link as MLink, Typography } from "@mui/material";
import moment from "moment";
import { Delete, Edit, HideImage } from "@mui/icons-material";
import { ActionIcon } from "../action.icon";

export const genColumn = () => ({
  action: <T extends {} = {}>(
    actions?: Partial<Record<"edit" | "remove", (row: T) => void>>
  ): GridColDef => ({
    field: "action",
    headerName: " ",
    width: 64,
    align: "center",
    disableColumnMenu: true,
    sortable: false,
    filterable: false,
    renderCell: ({ row }) => (
      <>
        {actions?.edit && (
          <ActionIcon
            icon={<Edit />}
            color="warning"
            onClick={() => actions?.edit?.(row)}
          />
        )}
        {actions?.remove && (
          <ActionIcon
            icon={<Delete />}
            color="error"
            onClick={() => actions?.remove?.(row)}
          />
        )}
      </>
    ),
  }),
  cover: (field: string = "thumbnail"): GridColDef => ({
    field,
    headerName: " ",
    width: 64,
    align: "center",
    disableColumnMenu: true,
    sortable: false,
    filterable: false,
    renderCell: ({ value }) => (
      <Avatar variant="square" src={value}>
        <HideImage />
      </Avatar>
    ),
  }),
  title: <T extends {} = {}>(
    field: string = "title",
    url?: (row: T) => string
  ): GridColDef => ({
    field,
    headerName: "Title",
    width: 360,
    renderCell: ({ row, value }) =>
      url ? (
        <MLink
          variant="inherit"
          noWrap
          component={Link}
          href={url(row)}
          target="_blank"
        >
          {value}
        </MLink>
      ) : (
        <Typography variant="inherit" noWrap>
          {value}
        </Typography>
      ),
  }),
  date: (field: string = "date", headerName: string = "Date"): GridColDef => ({
    field,
    headerName,
    width: 160,
    renderCell: ({ value }) => moment(value).format("YYYY-MM-DD HH:mm"),
  }),
});
