import { OPEN_DRAWER, CLOSE_DRAWER } from "./actionTypes";

export const openDrawer = () => ({
  type: OPEN_DRAWER
});

export const closeDrawer = () => ({
  type: CLOSE_DRAWER
});
