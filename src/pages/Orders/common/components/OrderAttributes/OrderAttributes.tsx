import { Box, Grid, TextField, useTheme } from "@mui/material";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { v4 } from "uuid";
import { ListItem } from "../../../../../api/shared/common/list-item";
import { DataItem } from "../../../../../api/shared/common/response-data";
import { UserItem } from "../../../../../api/shared/common/users";
import { TeamItem } from "../../../../../api/shared/common/teams";
import { RefBox, OptionsSettings } from "../../../../../components/RefBox";
import { REQUEST_MIN_SYMBOLS_USERS } from "../../../../../constants/ref-box-options-settings";
import { IAttrBase, AttrType } from "./OrderAttributes.interfaces";
import { SELENIUM_TEST_IDS } from "../../../../../constants/selenium-test-ids";

export interface OrderAttributesProps {
  model: {
    top: IAttrBase[][];
    bottom: IAttrBase[][];
  };
}
const FormGridItem: FC = ({ children, ...props }) => {
  return (
    <Grid item xs={6} md={6} xl={6} {...props}>
      {children}
    </Grid>
  );
};

const onCreateNewTagOption = (valueStr: string) => ({
  id: v4(),
  name: valueStr,
});

export const FieldElement: FC<{ attr: IAttrBase }> = ({ attr }) => {
  const { t } = useTranslation();

  if (attr.hidden) {
    return null;
  }

  switch (attr.type) {
    case AttrType.Text:
      return (
        <FormGridItem key={attr.id} data-testid="textfield-text">
          <TextField
            fullWidth
            value={attr.value}
            label={attr.label}
            variant="standard"
            required={attr.required}
            onChange={(e) => attr.update && attr.update(e.target.value)}
            error={attr.error}
            helperText={attr.errorText}
            InputProps={{
              readOnly: attr.readOnly,
            }}
            data-test-id={SELENIUM_TEST_IDS.campaignsCommon.campaignAttrInput}
            data-campaign-attr-field={attr.id}
          />
        </FormGridItem>
      );
    case AttrType.Ref:
      return (
        <FormGridItem key={attr.id} data-testid="textfield-ref">
          <RefBox
            getDataOptions={
              attr.getDataOptions as (
                substring: string,
              ) => Promise<DataItem<ListItem>>
            }
            label={attr.label}
            value={(attr.value as ListItem) || null}
            onSelect={attr.update as (value: ListItem) => void}
            optionSettings={attr.optionSettings as OptionsSettings<ListItem>}
            noOptionsText={t("refs.noResults")}
            required={attr.required}
            readOnly={attr.readOnly}
            error={attr.error}
            helperText={attr.errorText}
            autocompleteProps={{
              "data-test-id":
                SELENIUM_TEST_IDS.campaignsCommon.campaignAttrInput,
              "data-campaign-attr-field": attr.id,
            }}
          />
        </FormGridItem>
      );
    // case AttrType.Tag:
    //   return (
    //     <FormGridItem key={attr.id} data-testid="textfield-tag">
    //       <RefBox
    //         getDataOptions={
    //           attr.getDataOptions as (
    //             substring: string,
    //           ) => Promise<DataItem<TagItem>>
    //         }
    //         label={attr.label}
    //         value={(attr.value as TagItem[]) || []}
    //         onSelect={attr.update as (value: TagItem[]) => void}
    //         onCreateNewOption={onCreateNewTagOption}
    //         optionSettings={attr.optionSettings as OptionsSettings<TagItem>}
    //         required={attr.required}
    //         readOnly={attr.readOnly}
    //         noOptionsText={t("refs.noResults")}
    //         requestMinSymbols={REQUEST_MIN_SYMBOLS_TAGS}
    //         newOptionText={(newTagName) =>
    //           t("refs.addNewOption", { newTagName })
    //         }
    //         error={attr.error}
    //         helperText={attr.errorText}
    //         notDeletableOptions={attr.notDeletableOptions as TagItem[]}
    //         multiple
    //         autocompleteProps={{
    //           "data-test-id":
    //             SELENIUM_TEST_IDS.campaignsCommon.campaignAttrInput,
    //           "data-campaign-attr-field": attr.id,
    //         }}
    //         noOptionDeselecting
    //       />
    //     </FormGridItem>
    //   );
    case AttrType.Descr:
      return (
        <Grid item xs={12} key={attr.id} data-testid="textfield-desc">
          <TextField
            fullWidth
            multiline
            label={attr.label}
            value={attr.value}
            variant="standard"
            required={attr.required}
            onChange={(e) => attr.update && attr.update(e.target.value)}
            error={attr.error}
            helperText={attr.errorText}
            InputProps={{
              readOnly: attr.readOnly,
            }}
            data-test-id={SELENIUM_TEST_IDS.campaignsCommon.campaignAttrInput}
            data-campaign-attr-field={attr.id}
          />
        </Grid>
      );
    case AttrType.User:
      return (
        <FormGridItem key={attr.id} data-testid="textfield-user">
          <RefBox
            getDataOptions={
              attr.getDataOptions as (
                substring: string,
              ) => Promise<DataItem<UserItem>>
            }
            label={attr.label}
            value={(attr.value as UserItem) || null}
            onSelect={attr.update as (value: UserItem) => void}
            optionSettings={attr.optionSettings as OptionsSettings<UserItem>}
            // requestMinSymbols={REQUEST_MIN_SYMBOLS_USERS}
            readOnly={attr.readOnly}
            required={attr.required}
            noOptionsText={t("refs.noResults")}
            error={attr.error}
            helperText={attr.errorText}
            fullWidth
            autocompleteProps={{
              "data-test-id":
                SELENIUM_TEST_IDS.campaignsCommon.campaignAttrInput,
              "data-campaign-attr-field": attr.id,
            }}
          />
        </FormGridItem>
      );
    case AttrType.Team:
      return (
        <FormGridItem key={attr.id} data-testid="textfield-team">
          <RefBox
            getDataOptions={
              attr.getDataOptionsTeam as () => Promise<DataItem<TeamItem>>
            }
            label={attr.label}
            value={(attr.value as TeamItem) || null}
            onSelect={attr.update as (value: TeamItem) => void}
            optionSettings={attr.optionSettings as OptionsSettings<TeamItem>}
            readOnly={attr.readOnly}
            required={attr.required}
            noOptionsText={t("refs.noResults")}
            error={attr.error}
            helperText={attr.errorText}
            fullWidth
            autocompleteProps={{
              "data-test-id":
                SELENIUM_TEST_IDS.campaignsCommon.campaignAttrInput,
              "data-campaign-attr-field": attr.id,
            }}
          />
        </FormGridItem>
      );
    default:
      return null;
  }
};
export const OrderAttributes: FC<OrderAttributesProps> = ({ model }) => {
  const { top, bottom } = model;
  const theme = useTheme();

  const GridContainer = useCallback((attrModel: IAttrBase[][]) => {
    return (
      <Grid
        container
        sx={{
          flexDirection: "column",
          padding: "0 12px 16px 12px",
          marginTop: "4px",
          // border: `1px dashed ${theme.palette.border.dark}`,
          borderRadius: "6px",
        }}
        rowSpacing={2}
      >
        {attrModel.map((row, i) => {
          return (
            <Grid item container key={i} columnSpacing={4}>
              {row.map((attr) => {
                return attr && <FieldElement attr={attr} key={attr.id} />;
              })}
            </Grid>
          );
        })}
      </Grid>
    );
  }, []);

  return (
    <Box
      component="form"
      data-testid="campaign-attributes"
      sx={{
        " > *+* ": {
          marginTop: "20px !important",
        },
      }}
    >
      {GridContainer(top)}
      {GridContainer(bottom)}
    </Box>
  );
};
