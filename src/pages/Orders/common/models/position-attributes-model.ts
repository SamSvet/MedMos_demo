import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ListItem } from "../../../../api/shared/common/list-item";
import { DataItem } from "../../../../api/shared/common/response-data";
import { Directory } from "../../../../api/shared/directory.enum";
import {
  PositionInfo,
  PositionInfoViewModel,
} from "../../../../api/shared/position-info";
import {
  CONTAINERS_OPTIONS_SETTINGS,
  REF_OPTIONS_SETINGS,
} from "../../../../constants/ref-box-options-settings";
import {
  AttrType,
  IPositionAttrBase,
  ValueType,
} from "../components/PositionAttributes/PositionAttributes.interfaces";
import { useGetOptionsInRefBox } from "../hooks/useGetOptionInRefBox";
import { PositionAttrError } from "../interfaces/position-errors";
import { ContainerItem } from "../../../../api/shared/common/container";

export const usePositionAttributesModel = (
  position: PositionInfoViewModel,
  positionErrors: PositionAttrError | null,
  fieldsConstraints: {
    [key in keyof PositionInfo]?: {
      required?: boolean;
      readOnly?: boolean;
      disabled?: boolean;
      minDate?: Date;
    };
  },
  getUpdateFunction?: (
    attrName: keyof PositionInfo,
  ) => (val: ValueType) => void,
  basePosition?: PositionInfoViewModel,
  notDeletableOptions: {
    dct_container?: DataItem<ListItem>;
  } = { dct_container: [] },
) => {
  const { t } = useTranslation();

  const { getDirectoryOptions, getContainersOptions, createNewContainer } =
    useGetOptionsInRefBox();

  return useMemo(
    () =>
      new Map<keyof PositionInfo, IPositionAttrBase>([
        [
          "position_name",
          {
            type: AttrType.Text,
            id: "position_name",
            label: t("table.header.positionName"),
            update: getUpdateFunction && getUpdateFunction("position_name"),
            value: position.position_name,
            error: Boolean(positionErrors?.position_name?.isError),
            errorText: positionErrors?.position_name?.errorText,
            ...fieldsConstraints["position_name"],
          },
        ],
        [
          "color",
          {
            type: AttrType.Ref,
            id: "color",
            label: t("table.header.color"),
            update: getUpdateFunction && getUpdateFunction("color"),
            value: position.color,
            optionSettings: REF_OPTIONS_SETINGS,
            error: Boolean(positionErrors?.color?.isError),
            errorText: positionErrors?.color?.errorText,
            getDataOptions: (substring: string) =>
              getDirectoryOptions(Directory.COLOR, substring, true),
            ...fieldsConstraints["color"],
          },
        ],
        [
          "position_description",
          {
            type: AttrType.Text,
            id: "position_description",
            label: t("table.header.positionDescription"),
            update:
              getUpdateFunction && getUpdateFunction("position_description"),
            value: position.position_description,
            error: Boolean(positionErrors?.position_description?.isError),
            errorText: positionErrors?.position_description?.errorText,
            ...fieldsConstraints["position_description"],
          },
        ],
        [
          "model_id",
          {
            type: AttrType.Ref,
            id: "model_id",
            label: t("table.header.modelID"),
            update: getUpdateFunction && getUpdateFunction("model_id"),
            value: position.model_id,
            optionSettings: REF_OPTIONS_SETINGS,
            error: Boolean(positionErrors?.model_id?.isError),
            errorText: positionErrors?.model_id?.errorText,
            getDataOptions: (substring: string) =>
              getDirectoryOptions(Directory.MODEL, substring, true),
            ...fieldsConstraints["model_id"],
          },
        ],
        [
          "count",
          {
            type: AttrType.Number,
            id: "count",
            label: t("table.header.positionCount"),
            update: getUpdateFunction && getUpdateFunction("count"),
            value: position.count,
            error: Boolean(positionErrors?.count?.isError),
            errorText: positionErrors?.count?.errorText,
            ...fieldsConstraints["count"],
            ...(basePosition?.count && {
              helperText: `${basePosition?.count || 0} максимум`,
            }),
          },
        ],

        [
          "reserved_count",
          {
            type: AttrType.Number,
            id: "reserved_count",
            label: t("table.header.reserved"),
            update: getUpdateFunction && getUpdateFunction("reserved_count"),
            value: position.reserved_count,
            error: Boolean(positionErrors?.count?.isError),
            errorText: positionErrors?.count?.errorText,
            ...fieldsConstraints["reserved_count"],
            ...(basePosition?.count && {
              helperText: `${basePosition?.count || 0}  максимум`,
            }),
          },
        ],

        [
          "container",
          {
            type: AttrType.Container,
            id: "container",
            label: t("table.header.container"),
            update: getUpdateFunction && getUpdateFunction("container"),
            value: position.container ? position.container[0] : [],
            optionSettings: CONTAINERS_OPTIONS_SETTINGS,
            error: Boolean(positionErrors?.container?.isError),
            errorText: positionErrors?.container?.errorText,
            getDataOptions: getContainersOptions,
            createOption: (newOption: ValueType) => {
              return createNewContainer(newOption as ContainerItem);
            },
            //createOption: createNewContainer,

            // createOption: async (
            //   newOption: ValueType,
            // ): Promise<DataItem<ContainerItem>> => {
            //   return [];
            // },
            ...fieldsConstraints["container"],
          },
        ],

        [
          "status",
          {
            type: AttrType.Ref,
            id: "status",
            label: t("table.header.status"),
            update: getUpdateFunction && getUpdateFunction("status"),
            value: position.status,
            optionSettings: REF_OPTIONS_SETINGS,
            error: Boolean(positionErrors?.status?.isError),
            errorText: positionErrors?.status?.errorText,
            getDataOptions: (substring: string) =>
              getDirectoryOptions(Directory.STATUS, substring, true),
            ...fieldsConstraints["status"],
          },
        ],
        // [
        //   "plan_delivery_dt",
        //   {
        //     type: AttrType.Date,
        //     id: "plan_delivery_dt",
        //     label: "Плановая дата доставки",
        //     update: getUpdateFunction && getUpdateFunction("plan_delivery_dt"),
        //     value: position.plan_delivery_dt,
        //     error: Boolean(positionErrors?.plan_delivery_dt?.isError),
        //     errorText: positionErrors?.plan_delivery_dt?.errorText,
        //     minDate: new Date(new Date().setHours(0, 0, 0)),
        //     ...fieldsConstraints["plan_delivery_dt"],
        //   },
        // ],
      ]),
    [
      basePosition?.count,
      createNewContainer,
      fieldsConstraints,
      getContainersOptions,
      getDirectoryOptions,
      getUpdateFunction,
      position.color,
      position.container,
      position.count,
      position.model_id,
      position.position_description,
      position.position_name,
      position.reserved_count,
      position.status,
      positionErrors?.color?.errorText,
      positionErrors?.color?.isError,
      positionErrors?.container?.errorText,
      positionErrors?.container?.isError,
      positionErrors?.count?.errorText,
      positionErrors?.count?.isError,
      positionErrors?.model_id?.errorText,
      positionErrors?.model_id?.isError,
      positionErrors?.position_description?.errorText,
      positionErrors?.position_description?.isError,
      positionErrors?.position_name?.errorText,
      positionErrors?.position_name?.isError,
      positionErrors?.status?.errorText,
      positionErrors?.status?.isError,
      t,
    ],
  );
};
// type MyType<T> = Map<string, T[]>
