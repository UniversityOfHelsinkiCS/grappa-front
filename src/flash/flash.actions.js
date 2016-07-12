export const CREATE_FLASH_MESSAGE = "CREATE_FLASH_MESSAGE";
export const HIDE_FLASH_MESSAGE = "HIDE_FLASH_MESSAGE";

export const createMessage = (message, id) => (
  {
    type: CREATE_FLASH_MESSAGE,
    id,
    message,
  }
);

export const hideMessage = (id) => (
  {
    type: HIDE_FLASH_MESSAGE,
    id,
  }
);
