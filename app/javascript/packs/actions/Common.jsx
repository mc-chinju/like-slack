import * as constants from "./CommonConstants";

export function openModal() {
  return {
    type: constants.OPEN_MODAL,
  };
}

export function closeModal() {
  return {
    type: constants.CLOSE_MODAL,
  };
}