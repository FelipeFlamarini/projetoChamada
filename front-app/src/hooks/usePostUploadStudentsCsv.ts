import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGetStudentsApiStudentsGetQueryKey as activeStudentsKey } from "@/chamada";
import { exec } from "child_process";

export default function usePostUploadStudentsCsv(
  setUploadProgress: (progress: number) => void
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`/api/students/csv`, `POST`],
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("csv_file", data.data.csv_file);

      const URL = import.meta.env.VITE_FASTAPI_APP_URL;
      const response = await fetch(`${URL}/api/students/csv`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (!response.body) {
        throw new Error("ReadableStream not supported");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        try {
          setUploadProgress(JSON.parse(chunk).progress);
        } catch {
          break;
        }
      }

      return result;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: activeStudentsKey() }),
  });
}
