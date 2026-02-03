import { queryOptions } from "@tanstack/react-query";
import { getCategories } from "../services/CategoryService";

export const categoryQueries = {
  key: (userId: number) => ["categories", userId],
  all: (userId: number) =>
    queryOptions({
      queryKey: categoryQueries.key(userId),
      queryFn: () => getCategories(userId),
    }),
};
