import {type ChangeEvent} from "react";

export const extractValue = (method: (value: string) => void) => {
  return (e: ChangeEvent<HTMLInputElement>) => {
    method(e.target.value);
  }
}