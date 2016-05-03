export const CREATE_FLASH_MESSAGE = "CREATE_FLASH_MESSAGE";
export const DELETE_FLASH_MESSAGE = "DELETE_FLASH_MESSAGE";

/**
 * Action-creator for sending the login request to API
 *
 * @param {Object} UserData - User login information
 * @return {Object} - Action for API to handle
 */
export const createMessage = (message) => {
  return {
    type: CREATE_FLASH_MESSAGE,
    message,
  };
};

export const deleteMessage = (id) => {
  return {
    type: DELETE_FLASH_MESSAGE,
    id,
  };
};
