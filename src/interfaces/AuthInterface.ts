export interface SuccessLogin {
  message: "success";
  user: UserInterface;
  token: string;
}

export interface FaildLogin {
  message: string;
  statusMsg: string;
}

export interface UserInterface {
  name: string;
  email: string;
  role: string;
}
