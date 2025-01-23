

export enum HttpCode {
  OK = 200,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  CREATED = 201,
}

export enum Messege {
  SOMETHING_WENT_WRONG = "Something went wrong",
  NO_DATA_FOUND = "No data is found",
  CREATE_FAILED = "Create is failed",
  UPDATE_FAILED = "Update is failed",
  NO_MEMBER_NICK = "NO member with that member nick!",
  BLOCKED_USER = " You have been blocked, contact restaurant",
  USED_NICK_PHONE = "You are inserting already used nick or phone!",
  TOKEN_CREATION_FAILED = " Token creation error",
  WRONG_PASSWORD = "Wrong password, please try again!",
  NOT_AUTHENTIFICATED = "You are not authentificated , Please , login first !",
}

class Errors extends Error {
  public code: HttpCode;
  public message: Messege;

  static standard = {
    code: HttpCode.INTERNAL_SERVER_ERROR,
    messege: Messege.SOMETHING_WENT_WRONG,
  };

  constructor(statusCode: HttpCode, statusMessege: Messege) {
    super();
    this.code = statusCode;
    this.message = statusMessege;
  }
}

export default Errors;
