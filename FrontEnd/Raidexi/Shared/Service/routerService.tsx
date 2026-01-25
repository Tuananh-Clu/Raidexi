"use client"
import { useRouter } from "next/navigation";

export const useRouterService = () => {
  const router = useRouter();

  return {
    navigate: (path: string) => router.push(path),
    replace: (path: string) => router.replace(path),
    back: () => router.back(),
    refresh: () => router.refresh(),
  };
};
