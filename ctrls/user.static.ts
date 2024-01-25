import { updateProfile, User } from "firebase/auth";

export type UserType = Record<
  "email" | "uid" | "displayName" | "photoUrl",
  string
>;

export class UserStatic {
  static async changeDisplayName(user: User, displayName: string) {
    return new Promise<void>((resolve, reject) => {
      updateProfile(user, { displayName })
        .then(() => resolve())
        .catch(reject);
    });
  }
}
