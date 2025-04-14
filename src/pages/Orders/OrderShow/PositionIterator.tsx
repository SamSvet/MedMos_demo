import {
  Avatar,
  Box,
  Chip,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
  Slide,
  Badge,
  styled,
  useTheme,
  Tooltip,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import { ArrowBack } from "@mui/icons-material";
import { PositionInfoViewModel } from "../../../api/shared/position-info";
import { ColorBox } from "../../../components/ColorBox/ColorBox";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useState, forwardRef } from "react";
import IconButton from "@mui/material/IconButton";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import { PositionBadge } from "./PositionBadge";
import { useTranslation } from "react-i18next";

export const PositionIteratorInfo = ({
  pos,
}: {
  pos: PositionInfoViewModel;
}) => {
  return (
    <Box>
      <Typography variant="caption">Артикул по РУ: </Typography>

      <Chip size="small" label={pos.position_name} />
      <Typography variant="caption"> Модельный номер:</Typography>
      <Chip size="small" label={pos.model_id?.name} />
      {pos.container && pos.container.length > 0 && (
        <>
          <Typography variant="caption"> Контейнер:</Typography>
          <Chip size="small" label={pos.container![0].name} />
        </>
      )}
    </Box>
  );
};
export const PositionIteratorInfoSecondary = ({
  pos,
}: {
  pos: PositionInfoViewModel;
}) => {
  return (
    <Typography variant="body2" color="textSecondary" component="span">
      {pos.color?.name}
      <ColorBox color={pos.color?.name || "white"} />
    </Typography>
  );
};

export const PositionIteratorInfo2 = (pos: PositionInfoViewModel) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <PositionIteratorInfo pos={pos} />
      <PositionIteratorInfoSecondary pos={pos} />
    </Stack>
  );
};

export const PositionIterator = ({
  positions,
  clickHandler,
}: {
  positions: PositionInfoViewModel[];
  clickHandler: (pos_id: PositionInfoViewModel) => void;
}) => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 500,
        // "& ul": { padding: 0 },
      }}
    >
      {positions.map((pos, idx) => (
        <ListItemButton key={idx} onClick={() => clickHandler(pos)}>
          <ListItemAvatar>
            <Avatar>{pos.count}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={PositionIteratorInfo({ pos })}
            secondary={<>{pos.position_description} </>}
          />
          <ListItemSecondaryAction>
            <PositionIteratorInfoSecondary pos={pos} />
          </ListItemSecondaryAction>
        </ListItemButton>
      ))}
    </List>
  );
};
interface PositionIteratorProps {
  positions: PositionInfoViewModel[];
  clickHandler: (pos_id: PositionInfoViewModel) => void;
  clickEditHandler: (pos_id: PositionInfoViewModel) => void;
  clickReserveHandler: (pos_id: PositionInfoViewModel) => void;
  keyValue: string;
  isOpen?: boolean;
  tabNumber: number;
  prevTabNumber: number;
}

export const PositionIteratorRef = forwardRef<
  HTMLElement,
  PositionIteratorProps
>(function PositionIteratorRef(props, ref) {
  const {
    keyValue,
    isOpen,
    positions,
    clickHandler,
    clickEditHandler,
    clickReserveHandler,
    prevTabNumber,
    tabNumber,
  } = props;

  return (
    <Slide
      in={isOpen}
      key={keyValue}
      direction={tabNumber > prevTabNumber ? "left" : "right"}
    >
      <Box>
        {positions.map((pos, idx) => (
          <PositionIteratorItem
            position={pos}
            clickHandler={clickHandler}
            clickEditHandler={clickEditHandler}
            clickReserveHandler={clickReserveHandler}
            key={idx}
          />
        ))}
      </Box>
    </Slide>
  );
});

export const PositionIterator2 = ({
  positions,
  clickHandler,
  clickEditHandler,
  clickReserveHandler,
}: {
  positions: PositionInfoViewModel[];
  clickHandler: (pos_id: PositionInfoViewModel) => void;
  clickEditHandler: (pos_id: PositionInfoViewModel) => void;
  clickReserveHandler: (pos_id: PositionInfoViewModel) => void;
}) => {
  return (
    <>
      {positions.map((pos, idx) => (
        <PositionIteratorItem
          position={pos}
          clickHandler={clickHandler}
          clickEditHandler={clickEditHandler}
          clickReserveHandler={clickReserveHandler}
          key={idx}
        />
      ))}
    </>
  );
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    //backgroundColor: "#44b700",
    // color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export const PositionIteratorItem = ({
  position,
  clickHandler,
  clickEditHandler,
  clickReserveHandler,
}: {
  position: PositionInfoViewModel;
  clickHandler: (pos_id: PositionInfoViewModel) => void;
  clickEditHandler: (pos_id: PositionInfoViewModel) => void;
  clickReserveHandler: (pos_id: PositionInfoViewModel) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        backgroundColor: "background.paper",
        marginTop: "16px",
        borderRadius: "10px",
        "&:hover": {
          bgcolor: "rgb(237,243,240)",
        },
      }}
      onMouseOver={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Grid item xs={1}>
        <PositionBadge
          maxValue={position.count || 1}
          value={position.reserved_count || 0}
        />
      </Grid>
      <Grid item xs={10}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption">
              {t("table.header.positionName")}:{" "}
            </Typography>
            <Chip size="small" label={position.position_name} />
            <Typography variant="caption">
              {" "}
              {t("table.header.modelID")}:
            </Typography>
            <Chip size="small" label={position.model_id?.name} />
          </Grid>
          <Grid item xs={12}>
            {position.container && position.container.length > 0 && (
              <>
                <Typography variant="caption">
                  {" "}
                  {t("table.header.container")}:
                </Typography>
                <Chip size="small" label={position.container![0].name} />
              </>
            )}
            <Typography variant="caption">
              {" "}
              {t("table.header.color")}:
            </Typography>
            <Chip
              size="small"
              label={position.color?.name}
              variant="outlined"
              sx={{
                borderColor: `${position.color?.name}`,
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px ",
              }}
            />
            <Typography variant="caption">
              {" "}
              {t("table.header.reserved")}:
            </Typography>
            <Chip size="small" label={position.reserved_count || 0} />
            <Typography variant="caption">
              {" "}
              {t("table.header.remain")}:
            </Typography>
            <Chip
              size="small"
              label={(position.count || 0) - (position.reserved_count || 0)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              {position.position_description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <Stack
          direction="column"
          alignItems="center"
          sx={{ visibility: `${isVisible ? "unset" : "hidden"}` }}
        >
          <Tooltip title={t("order.show.splitOrderBtn")} disableInteractive>
            <IconButton onClick={() => clickEditHandler(position)}>
              <CallSplitIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("order.show.reserveBtn")} disableInteractive>
            <IconButton onClick={() => clickReserveHandler(position)}>
              <HowToRegIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Grid>
    </Grid>
  );
};
