export enum ErrorCodes {
  NOT_AUTHENTICATED = -1,
  NOT_AUTHORIZED = -2,
  NO_PAGE = -3,
  BAD_PARAMS = -4,
  INVALID_OPERATION = -5,
  LOCKED = -201,
  NOT_FOUND = -7,
  NO_ACCESS = -8,
  SYSTEM_ERROR = -32400,
}

export enum ErrorModals {
  BAD_PARAMS = "badParams",
  FAIL = "fail",
  NO_ACCESS = "noAccess",
  SYSTEM_ERROR = "systemError",
  NOT_FOUND = "notFound",
  NO_PAGE = "noPage",
  INVALID_OPERATION = "invalidOperation",
  LOCKED = "locked",
}
