import AuthAttributes from "../inteface/AuthUserInterface";

const GetAuth = (): AuthAttributes | null => {
  const userString = localStorage.getItem("userData_Apps");

  if (userString) {
    const user: AuthAttributes = JSON.parse(userString);

    return user;
  }

  return null;
};

const SetAuth = (data: AuthAttributes) => {
  const userString = JSON.stringify(data);

  localStorage.setItem("userData_Apps", userString);
};
const RemoveAuth = () => {
  const userString = localStorage.getItem("userData_Apps");
  if (userString) {
    localStorage.removeItem("userData_Apps");
  }
};

export default { GetAuth, SetAuth, RemoveAuth };
