export const TURHA_REQUEST = "TURHA_REQUEST";
export const TURHA_SUCCESS = "TURHA_SUCCESS";

export const requestTurha = () => {
  return {
    type: TURHA_REQUEST,
  }
}

export const successTurha = () => {
  return {
    type: TURHA_SUCCESS,
  }
}
