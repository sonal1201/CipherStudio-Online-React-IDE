import { useCallback, useEffect, useState } from "react";
import { ReactFolder } from "../lib/path-to-json";
import { getReactIdeById, SaveUpdateCode } from "../action";
import { toast } from "sonner";

interface ReactIdeData {
  id: string;
  title: string;
  [key: string]: any;
}

interface UseReactIde {
  reactIdeData: ReactIdeData | null;
  reactFolderData: ReactFolder | null;
  isLoading: boolean;
  error: string | null;
  loadReactIde: () => Promise<void>;
  saveReactIdeData: (data: ReactFolder) => Promise<void>;
}

export const useReactIde = (id: string): UseReactIde => {
  const [reactIdeData, setReactIdeData] = useState<ReactIdeData | null>(null);
  const [reactFolderData, setReactFolderData] = useState<ReactFolder | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load the project by ID
  const loadReactIde = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);

      const data = await getReactIdeById(id);
      
      setReactIdeData(data);

      const rawData = data?.reactFiles?.[0]?.content;

      // If the project contains JSON content
      if (typeof rawData === "string") {
        const parsedData = JSON.parse(rawData);
        setReactFolderData(parsedData);
        toast.success("Project loaded successfully");
        return;
      }

      // Otherwise, fallback to fetching API route data
      const res = await fetch(`/api/react-Ide/${id}`);
      if (!res.ok) throw new Error(`Failed to load project: ${res.status}`);

      const reactRes = await res.json();

      setReactFolderData({
        folderName: "Root",
        items: Array.isArray(reactRes.templateJson)
          ? reactRes.templateJson
          : [],
      });

      toast.success("Project loaded successfully");
    } catch (err: any) {
      console.error("Error loading project:", err);
      setError(err.message || "Failed to load project");
      toast.error("Failed to load project");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // 🔹 Save updated code/folder structure
  const saveReactIdeData = useCallback(
    async (data: ReactFolder) => {
      try {
        await SaveUpdateCode(id, data);
        setReactFolderData(data);
        toast.success("Changes saved successfully");
      } catch (err) {
        console.error("Error saving project:", err);
        toast.error("Failed to save changes");
        throw err;
      }
    },
    [id]
  );

  useEffect(() => {
    loadReactIde();
  }, [loadReactIde]);

  return {
    reactIdeData,
    reactFolderData,
    isLoading,
    error,
    loadReactIde,
    saveReactIdeData,
  };
};
