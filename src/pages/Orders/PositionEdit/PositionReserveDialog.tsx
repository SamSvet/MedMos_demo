import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useOrdersSelector } from "../../../store/orders-store";
import { useDraftPositionData } from "../common/hooks/useDraftPositionData";
import { usePositionEditActions } from "./hooks/usePositionEditActions";
import { usePositionValidation } from "../common/hooks/usePositionValidation";
import { usePositionAttrModel } from "./PositionReserve.models";
import { getOrderView } from "../../../selectors/orders/order-view-selectors";
import { PaperComponent } from "../common/components/PaperComponent/PaperComponent";
import { FieldElement } from "../common/components/PositionAttributes/PositionAttributes";
import {
  getAdditionalPositionsReserveData,
  getPositionReserve,
} from "../../../selectors/orders/position-reserve-selectors";
import {
  PositionNumberField,
  PositionTextStaticField,
} from "../common/components/PositionAttributes/PositionAttributes.fields";
import { ListItem } from "../../../api/shared/common/list-item";
import { ColorBox } from "../../../components/ColorBox/ColorBox";
import { DialogCloseButton } from "../../../components/DialogCloseButton/DialogCloseButton";

export const PositionReserveDialog = () => {
  const { t } = useTranslation();

  const { positions } = useOrdersSelector(getPositionReserve);
  const { orders } = useOrdersSelector(getOrderView);

  const { position, updatePositionInfo } = useDraftPositionData(positions?.[0]);

  const { save, cancel } = usePositionEditActions(orders[0], position);
  const { bad_attributes } = useOrdersSelector(
    getAdditionalPositionsReserveData,
  );
  const { positionErrors, unsetPositionError } =
    usePositionValidation(bad_attributes);

  const { positionAttributes } = usePositionAttrModel(
    updatePositionInfo,
    position,
    positionErrors,
    unsetPositionError,
    positions?.[0],
  );

  return (
    <Dialog
      open={true}
      fullWidth={true}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle
        style={{ cursor: "move" }}
        // sx={{ position: "absolute" }}
        sx={{
          paddingTop: 2,
          paddingRight: 0,
          paddingLeft: 0,
          paddingBottom: 0,
        }}
        id="draggable-dialog-title"
      ></DialogTitle>

      <DialogContent>
        <DialogCloseButton
          onClose={cancel}
          top={10}
          right={10}
          // color={"white"}
        />
        <Typography variant="h5">Резервирование позиций </Typography>

        <Grid container spacing={1.5}>
          <Grid item container xs={12}>
            <Stack>
              <Typography variant="caption">
                {
                  positionAttributes.get("position_description")
                    ?.label as string
                }
                :
              </Typography>

              <Typography variant="body2">
                {
                  positionAttributes.get("position_description")
                    ?.value as string
                }
              </Typography>
            </Stack>
          </Grid>

          <Grid item container xs={12}>
            <Grid item xs={12}>
              <PositionTextStaticField
                {...positionAttributes.get("position_name")!}
                direction="row"
                plainValue={
                  positionAttributes.get("position_name")?.value as string
                }
              />
            </Grid>
            <Grid item xs={12}>
              <PositionTextStaticField
                {...positionAttributes.get("model_id")!}
                direction="row"
                plainValue={
                  (positionAttributes.get("model_id")?.value as ListItem).name
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Stack
                justifyContent="flex-start"
                alignItems="baseline"
                spacing={1}
                direction={"row"}
              >
                <Typography variant="caption">
                  {positionAttributes.get("color")?.label as string}:
                </Typography>

                <Box>
                  <Typography variant="caption">
                    {(positionAttributes.get("color")?.value as ListItem).name}
                  </Typography>
                  <ColorBox
                    color={
                      (positionAttributes.get("color")?.value as ListItem).name
                    }
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <PositionTextStaticField
                {...positionAttributes.get("container")!}
                direction="row"
                plainValue={
                  (positionAttributes.get("container")?.value as ListItem)?.name
                }
              />
            </Grid>
            <Grid item xs={12}>
              <PositionTextStaticField
                {...positionAttributes.get("status")!}
                direction="row"
                plainValue={
                  (positionAttributes.get("status")?.value as ListItem).name
                }
              />
            </Grid>
            <Grid item xs={12}>
              <PositionTextStaticField
                {...positionAttributes.get("count")!}
                direction="row"
                plainValue={positionAttributes.get("count")?.value as string}
              />
            </Grid>
          </Grid>
          {/* <Divider sx={{ width: "100%" }} /> */}
          <Grid item container xs={6}>
            <PositionNumberField
              {...positionAttributes.get("reserved_count")!}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button autoFocus onClick={cancel}>
          Отмена
        </Button>
        <Button onClick={save}>Редактировать</Button>
      </DialogActions>
    </Dialog>
  );
};
