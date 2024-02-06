import { app } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { ServerImage } from "./image";

const resolve = (data: Record<string, any>) =>
  Response.json(data, { status: 200 });
const reject = (message: string, status: number = 400) =>
  Response.json({ message }, { status });

export const ServerCoreApi = (req: Request, app: app.App) => {
  return new Promise<Response>(async (res) => {
    const authorization = req.headers.get("authorization")?.split(" ")[1];
    if (!authorization) return reject("No authorization header");

    const auth = getAuth(app);
    const user = await auth
      .verifyIdToken(authorization)
      .catch((e) => new Error(e.message));
    if (user instanceof Error) return res(reject(user.message));

    const body = await req.json().catch((_e) => ({}));

    switch (body?.ref) {
      case "image":
        return await ServerImage(user, app, body)
          .then((data) => res(resolve(data)))
          .catch((e) => res(reject(e)));
      default:
        return res(reject(`Invalid ref (${body?.ref})`));
    }
  });
};
