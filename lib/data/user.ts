import { readFileSync, writeFileSync } from "fs";
import { StoredUserType } from "../../types/user";

// 유저 리스트 데이터 불러오기
const getList = () => {
  const usersBuffer = readFileSync("data/user.json");
  const usersString = usersBuffer.toString();

  if (!usersString) {
    return [];
  }

  const users: StoredUserType[] = JSON.parse(usersString);

  return users;
};

// 이메일의 유저가 있는지 확인하기
const exist = ({ email }: { email: string }) => {
  const users = getList();

  return users.some((user) => user.email === email);
};

// 유저 리스트 저장하기
const write = async (users: StoredUserType[]) => {
  writeFileSync("data/user.json", JSON.stringify(users));
};

// 이메일의 유저 불러오기
const find = ({ email }: { email: string }) => {
  const users = getList();

  return users.find((user) => user.email === email);
};

export default { getList, exist, write, find };
