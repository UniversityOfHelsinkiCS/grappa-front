export const CREATE_FLASH_MESSAGE = "CREATE_FLASH_MESSAGE";
export const DELETE_FLASH_MESSAGE = "DELETE_FLASH_MESSAGE";

export const createMessage = (message) => (
  {
    type: CREATE_FLASH_MESSAGE,
    message,
  }
);

export const deleteMessage = (id) => (
  {
    type: DELETE_FLASH_MESSAGE,
    id,
  }
);
