import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect, useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface IDebounced {
  searchQuary: string;
  delay: number;
}
export const useDebounced = ({ searchQuary, delay }: IDebounced) => {
  const [debounced, setDebounced] = useState<string>(searchQuary);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(searchQuary);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuary, delay]);
  return debounced;
};
