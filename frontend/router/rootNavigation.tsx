import { createRef } from "react";

export const navigationRef = createRef<NavigationProps>();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

interface NavigationProps {
  navigate: Function;
  goBack: Function;
}
