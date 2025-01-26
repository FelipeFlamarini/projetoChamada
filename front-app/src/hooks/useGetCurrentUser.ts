import { useQuery } from "@tanstack/react-query";

import { customInstance } from "@/api/mutator/custom-instance";

export function useGetCurrentUser() {
  return useQuery({
    queryKey: ["/api/users/me", "GET"],
    queryFn: async () => {
      return await customInstance({ url: `api/users/me` }, { maxRedirects: 0 });
    },
    retry: 0,
  });
}
