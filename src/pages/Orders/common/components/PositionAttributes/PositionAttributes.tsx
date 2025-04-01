import { FC } from "react";
import { Grid } from "@mui/material";
import {
  PositionTextField,
  PositionRefField,
  PositionRefMultiField,
  PositionRefModelField,
  PositionDateField,
  PositionNumberField,
  PositionContainerField,
  PositionTextStaticField,
} from "./PositionAttributes.fields";
import { IPositionAttrBase, AttrType } from "./PositionAttributes.interfaces";
import { SELENIUM_TEST_IDS } from "../../../../../constants/selenium-test-ids";
import { ListItem } from "../../../../../api/shared/common/list-item";

export interface PositionAttributesProps {
  model: IPositionAttrBase[][];
}

const FormGridItem: FC = ({ children, ...props }) => {
  return (
    <Grid item xs={12} mb={2} {...props}>
      {children}
    </Grid>
  );
};

export const FieldElement: FC<{ attr: IPositionAttrBase }> = ({ attr }) => {
  if (attr.hidden) {
    return null;
  }

  switch (attr.type) {
    case AttrType.Text:
      return (
        <FormGridItem key={attr.id} data-testid="textField-text">
          <PositionTextField {...attr} />
        </FormGridItem>
      );
    case AttrType.Number:
      return (
        <FormGridItem key={attr.id} data-testid="textField-number">
          <PositionNumberField {...attr} />
        </FormGridItem>
      );
    case AttrType.Ref:
      return (
        <FormGridItem key={attr.id} data-testid={"textField-ref"}>
          <PositionRefField {...attr} />
        </FormGridItem>
      );
    case AttrType.RefMulti:
      return (
        <FormGridItem key={attr.id} data-testid={"textField-refMulti"}>
          <PositionRefMultiField {...attr} />
        </FormGridItem>
      );
    case AttrType.RefModel:
      return (
        <FormGridItem key={attr.id} data-testid="textField-model">
          <PositionRefModelField {...attr} />
        </FormGridItem>
      );
    case AttrType.Date:
      return (
        <FormGridItem key={attr.id} data-testid={"textField-date"}>
          <PositionDateField {...attr} />
        </FormGridItem>
      );
    case AttrType.Container:
      return (
        <FormGridItem key={attr.id} data-testid={"textField-container"}>
          <PositionContainerField {...attr} />
        </FormGridItem>
      );
    case AttrType.TextStatic:
      return (
        <FormGridItem key={attr.id} data-testid={"textField-textStatic"}>
          <PositionTextStaticField
            {...attr}
            direction="row"
            plainValue={(attr.value as ListItem).name || ""}
          />
        </FormGridItem>
      );
    default:
      return null;
  }
};

export const PositionAttributes: FC<PositionAttributesProps> = ({ model }) => {
  return (
    <Grid container spacing={2} data-testid="Position-attributes">
      {model?.map((column, index) => {
        return (
          <Grid item xs={6} key={index}>
            {column.map((attr) => (
              <FieldElement
                attr={{
                  ...attr,
                  "data-test-id":
                    SELENIUM_TEST_IDS.scenariosCommon.scnearioAttr,
                }}
                key={attr.id}
              />
            ))}
          </Grid>
        );
      })}
    </Grid>
  );
};
