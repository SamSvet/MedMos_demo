/* eslint-disable react/jsx-pascal-case */
import {
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { usePositionsColumns } from "./hooks/usePositionsColumns";
import { PositionInfoModel } from "../../../api/shared/position-info";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import {
  Box,
  Chip,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ColorBox } from "../../../components/ColorBox/ColorBox";
import SearchIcon from "@mui/icons-material/Search";

const PositionIteratorInfo = ({ pos }: { pos: PositionInfoModel }) => {
  return (
    <Box>
      <Typography variant="caption">Артикул по РУ: </Typography>

      <Chip size="small" label={pos.position_name} />
      <Typography variant="caption"> Модельный номер:</Typography>
      <Chip size="small" label={pos.model_id} />
      {pos.container && pos.container.length > 0 && (
        <>
          <Typography variant="caption"> Контейнер:</Typography>
          <Chip size="small" label={pos.container![0]} />
        </>
      )}
    </Box>
  );
};
const PositionIteratorInfoSecondary = ({ pos }: { pos: PositionInfoModel }) => {
  return (
    <Typography variant="body2" color="textSecondary" component="span">
      {pos.color}
      <ColorBox color={pos.color || "white"} />
    </Typography>
  );
};

const PositionIteratorInfo2 = ({ pos }: { pos: PositionInfoModel }) => {
  return (
    <Stack direction="column" spacing={0}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <PositionIteratorInfo pos={pos} />
        <PositionIteratorInfoSecondary pos={pos} />
      </Stack>
      <Stack>
        <Typography variant="subtitle2">{pos.position_description}</Typography>
      </Stack>
    </Stack>
  );
};

export const PositionTable = ({
  positions,
}: {
  positions: PositionInfoModel[];
}) => {
  //   const { positions } = usePositionListLogic();
  const columns = usePositionsColumns();
  const table = useMaterialReactTable({
    columns,
    data: positions,
    muiTablePaperProps: ({ table }) => ({
      //   elevation: 0,
      style: {
        zIndex: table.getState().isFullScreen ? 1201 : undefined,
      },
    }),
    renderToolbarInternalActions: ({ table }) => (
      <Box sx={{ width: "100%" }}>
        <Tooltip title="Поиск">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Tooltip>

        <MRT_ToggleFiltersButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
      </Box>
    ),
    enableRowVirtualization: true,
    initialState: {
      density: "compact",
      showColumnFilters: true,
      //   columnPinning: {
      //     left: ["action", "order.order_name"],
      //   },
    },
    muiTableBodyCellProps: () => ({
      sx: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    }),
    localization: { ...MRT_Localization_RU },
    renderCaption: ({ table }) => <PositionIteratorInfo2 pos={positions[0]} />,
  });
  return <MaterialReactTable table={table} />;
};

{
  /* <Grid container rowSpacing={1}>
<Grid item xs={6}>
  <Item>1</Item>
</Grid>
<Grid item xs={6}>
  <Item>2</Item>
</Grid>
<Grid item xs={6}>
  <Item>3</Item>
</Grid>
<Grid item xs={6}>
  <Item>4</Item>
</Grid>
</Grid> */
}
