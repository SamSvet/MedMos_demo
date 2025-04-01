import { useCallback } from "react";
import { directoryApi } from "../../../../api/dictionaries-api";
import { Directory } from "../../../../api/shared/directory.enum";
import { usersApi } from "../../../../api/users-api";
import { containersApi } from "../../../../api/containers-api";
import { useOrdersDispatch } from "../../../../store/orders-store";
import { simpleDispatchFn } from "../../../../store/thunks/common/dispatch-utils";
import { ContainerItem } from "../../../../api/shared/common/container";

export const useGetOptionsInRefBox = () => {
  const dispatch = useOrdersDispatch();

  const getDirectoryOptions = useCallback(
    async (
      ref_code: Directory,
      substring: string,
      is_active: boolean = false,
    ) => {
      try {
        const response = await simpleDispatchFn(dispatch, () => {
          return directoryApi.selectValuesFromDirectory({
            ref_code,
            substring,
            is_active,
          });
        });
        return response.data[ref_code];
      } catch {
        return [];
      }
    },
    [dispatch],
  );

  const getUsersOptions = useCallback(
    async (substring: string) => {
      try {
        const response = await simpleDispatchFn(dispatch, () => {
          return usersApi.selectValuesFromUsers({
            users: {
              substring,
            },
          });
        });
        return response.data.users || [];
      } catch {
        return [];
      }
    },
    [dispatch],
  );

  const getContainersOptions = useCallback(
    async (substring: string) => {
      try {
        const response = await simpleDispatchFn(dispatch, () => {
          return containersApi.selectValuesFromContainers({
            containers: {
              substring,
            },
          });
        });
        return response.data.containers || [];
      } catch {
        return [];
      }
    },
    [dispatch],
  );

  const createNewContainer = useCallback(
    async (newOption: ContainerItem) => {
      try {
        const response = await simpleDispatchFn(dispatch, () => {
          return containersApi.createNewContainer({
            containers: {
              newOption,
            },
          });
        });

        return {
          bad_attributes: response.bad_attributes && response.bad_attributes,
          data: response.data?.containers || [],
        };
      } catch (e) {
        return { data: [] };
      }
    },
    [dispatch],
  );

  const getTeamsOptions = useCallback(async () => {
    try {
      const response = await simpleDispatchFn(dispatch, () => {
        return usersApi.selectValuesFromTeams({});
      });
      return response.data.teams || [];
    } catch {
      return [];
    }
  }, [dispatch]);

  return {
    getDirectoryOptions,
    getUsersOptions,
    getTeamsOptions,
    getContainersOptions,
    createNewContainer,
  };
};
