import { FieldError } from "react-hook-form";

interface FieldState {
  error?: FieldError | undefined;
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
}

export function isFieldValid(state: FieldState) {
  if (state.isDirty && state.isTouched && !state.invalid && state.error === undefined) {
   return true
 }
 if (state.isDirty && !state.isTouched && !state.invalid && state.error === undefined) {
   return true
 }
 return false
}