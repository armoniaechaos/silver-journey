import { useQuery, useQueryClient } from "@tanstack/react-query";

interface IGetUsers {
  size: number;
}

export function useGetUsers(options: IGetUsers) {
  const queryClient = useQueryClient();

  return useQuery(["users", options.size], () => {
    return fetch(
      `https://random-data-api.com/api/users/random_user?size=${options.size}`
    ).then((res) => res.json());
  });
}
