import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // 계정 생성하기
  if (req.method === "POST") {
    const { email, firstname, lastname, password, birthday } = body;
    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    return res.end();
  }

  const userExist = Data.user.exist({ email });

  if (userExist) {
    res.statusCode = 409;
    res.send("이미 가입된 이메일입니다.");
  }
  res.statusCode = 405;

  return res.end();
};
