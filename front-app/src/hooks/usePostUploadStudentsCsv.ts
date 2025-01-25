import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGetStudentsApiStudentsGetQueryKey as activeStudentsKey } from "@/chamada";
import { FETCH_URL } from "@/settings";

interface UploadData {
  data: {
    csv_file: File;
  };
}

export default function usePostUploadStudentsCsv(
  setUploadProgress: (progress: number) => void
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`/api/students/csv`, `POST`],
    mutationFn: async (data: UploadData) => {
      const formData = new FormData();
      formData.append("csv_file", data.data.csv_file);

      const response = await fetch(`${FETCH_URL}/api/students/csv`, {
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
