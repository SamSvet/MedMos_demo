import {
  Card,
  CardContent,
  Box,
  Avatar,
  Stack,
  Divider,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import {
  getAdditionalPositionsCreateData,
  getPositionCreate,
  getPositionCreateDelta,
} from "../../../selectors/orders/position-create-selectors";
import { useOrdersSelector } from "../../../store/orders-store";
import { getCurrentRefBooks } from "../../../selectors/orders/common-order-selectors";
import { PositionInfoViewModel } from "../../../api/shared/position-info";
import { useEffect, useMemo } from "react";
import { positionModelToViewModel } from "../../../api/shared/mappers/order-mappers";
import { useDraftPositionData } from "../common/hooks/useDraftPositionData";
import { usePositionValidation } from "../common/hooks/usePositionValidation";
import { usePositionCreateActions } from "./hooks/usePositionCreateActions";
import { usePositionCreateAttributes } from "./PositionCreate.model";
import BusinessIcon from "@mui/icons-material/Business";
import { FieldElement } from "../common/components/PositionAttributes/PositionAttributes";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import ContainerField from "../../../components/ContainerField/ContainerField";
import { ContainerItemSelect } from "../../../components/ContainerField/ContainerField.logic";
import { ContainerItem } from "../../../api/shared/common/container";
import { DataItem } from "../../../api/shared/common/response-data";
import { OptionsCreateType } from "../common/components/PositionAttributes/PositionAttributes.interfaces";
import { useOrderViewAttributes } from "../OrderShow/OrderShow.models";
import { OrderAside } from "../common/components/OrderAside/OrderAside";

export const PositionCreate = () => {
  const { orders } = useOrdersSelector(getPositionCreate);
  const { positions } = useOrdersSelector(getPositionCreateDelta);
  const refBooks = useOrdersSelector(getCurrentRefBooks);
  const { bad_attributes } = useOrdersSelector(
    getAdditionalPositionsCreateData,
  );

  const currPosition = useMemo<PositionInfoViewModel>(() => {
    return {
      ...positionModelToViewModel(positions?.[0] || {}, refBooks),
      order_id: orders[0].order_id,
    } as PositionInfoViewModel;
  }, [positions, refBooks, orders]);

  const { position, updatePositionInfo } = useDraftPositionData(currPosition);

  const { positionErrors, unsetPositionError } =
    usePositionValidation(bad_attributes);

  const modelOrder = useOrderViewAttributes(orders[0], null);

  const { save, cancel } = usePositionCreateActions(position);

  const { positionAttributes } = usePositionCreateAttributes(
    updatePositionInfo,
    position,
    positionErrors,
    unsetPositionError,
  );

  return (
    <Box mt={2} display="flex">
      <Box flex="1">
        <Card>
          <CardContent>
            <Stack direction="row">
              <Avatar sx={{ mt: 1 }}>
                <BusinessIcon />
              </Avatar>

              <Grid container spacing={2} ml={2} maxWidth={796}>
                <Grid item xs={6}>
                  <FieldElement
                    attr={positionAttributes.get("position_name")!}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FieldElement attr={positionAttributes.get("model_id")!} />
                </Grid>

                <Grid item xs={6}>
                  <FieldElement attr={positionAttributes.get("count")!} />
                </Grid>
                <Grid item xs={6}>
                  <FieldElement attr={positionAttributes.get("color")!} />
                </Grid>

                {/* <Grid item xs={6}>
                  <FieldElement attr={positionAttributes.get("container")!} />{" "}
                </Grid> */}

                <Grid item xs={6}>
                  <FieldElement attr={positionAttributes.get("status")!} />
                </Grid>
                {/* <Grid item xs={6}>
                  <FieldElement attr={positionAttributes.get("container")!} />
                </Grid> */}

                <Grid item xs={6}>
                  <ContainerField
                    value={
                      (positionAttributes.get("container")
                        ?.value as ContainerItem) || null
                    }
                    noOptionsText={"Нет опций для выбора"}
                    getDataOptions={
                      positionAttributes.get("container")?.getDataOptions as (
                        substring: string,
                      ) => Promise<DataItem<ContainerItem>>
                    }
                    onSelect={
                      positionAttributes.get("container")?.update as (
                        value: ContainerItem | null,
                      ) => void
                    }
                    createNewOption={
                      positionAttributes.get("container")?.createOption as (
                        newOption: ContainerItem,
                      ) => Promise<OptionsCreateType<ContainerItemSelect>>
                    }
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <ContainerFieldDialog />
                </Grid> */}

                <Divider sx={{ mb: 2, width: "100%" }} />
                <FieldElement
                  attr={positionAttributes.get("position_description")!}
                />
              </Grid>
            </Stack>
          </CardContent>
          <Divider sx={{ width: "100%" }} />
          <CardActions sx={{ backgroundColor: "rgb(245,245,245)" }}>
            <Stack
              flexGrow={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={8}
            >
              <Button
                size="small"
                variant="contained"
                color="inherit"
                startIcon={<CloseIcon />}
                onClick={cancel}
              >
                Отменить
              </Button>

              <Button
                size="small"
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={save}
              >
                Сохранить
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Box>
      <OrderAside model={modelOrder} linkHandler={cancel} link="show" />
    </Box>
  );
};

// <Toolbar variant="regular">
// <IconButton color="inherit" aria-label="open drawer">
//   <MenuIcon />
// </IconButton>
// <Box sx={{ flexGrow: 1 }} />
// <IconButton color="inherit">
//   <SearchIcon />
// </IconButton>
// <IconButton color="inherit">
//   <MoreIcon />
// </IconButton>
// </Toolbar>
