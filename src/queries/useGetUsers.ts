import { useQuery, useQueryClient } from "@tanstack/react-query";
import { APIUser } from "../model/APIUser";

interface IGetUsers {
  size: number;
  enabled: boolean;
}

export function useGetUsers(options: IGetUsers) {
  const queryClient = useQueryClient();

  return useQuery<APIUser[], Error>(
    ["users", options.size],
    () => {
      if (options.size === 0) return Promise.resolve([]);
      if (options.size > 20) {
        return Promise.reject(new Error("Size must be less than 20"));
      }

      return fetch(
        `https://random-data-api.com/api/users/random_user?size=${options.size}`
      ).then((res) => res.json());
    },
    {
      enabled: options.enabled,
      refetchOnMount: false,
      staleTime: Infinity, // never stale,
    }
  );
}
