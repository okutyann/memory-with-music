import { proxy } from "valtio";

export const state = proxy<{
  userId: string;
  userName: string;
  userEmail: string;
}>({
  userId: "initId",
  userName: "unknownuser",
  userEmail: "unknownemail",
});

export const saveUserId = (id: string) => {
  state.userId = id;
};

export const saveUserName = (name: string) => {
  state.userName = name;
};

export const saveUserEmail = (email: string) => {
  state.userEmail = email;
};
