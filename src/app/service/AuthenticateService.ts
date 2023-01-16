import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY as string;

interface AuthenticateProps {
  user: {
    id: string;
    name: string;
    surname: string;
    username: string;
  };
  expiresIn: string;
}

class AuthenticateService {
  async execute({ user, expiresIn }: AuthenticateProps) {
    const token = jwt.sign({}, secretKey, {
      subject: user.id,
      expiresIn,
    });

    const tokenReturn = {
      token,
      user: {
        name: user.name,
        surname: user.surname,
        username: user.username,
      },
    };

    return tokenReturn;
  }
}

export = new AuthenticateService();
