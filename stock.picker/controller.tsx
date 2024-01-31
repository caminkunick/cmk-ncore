import { User } from "firebase/auth";
import axios from "axios";
import { apiURL } from "../ctrls/api";
import { DateCtl } from "../ctrls/date.ctl";
import { VisibilityTabsValue } from "../visibility.tabs";
import { StockDisplayProps } from "../stock.display";
import {
  Unsubscribe,
  collection,
  onSnapshot,
  query,
  where,
  Firestore,
} from "firebase/firestore";

export class StockImageDocument {
  _id: string = "";
  datecreate: string = "";
  datemodified: string = "";
  visibility: "public" | "private" | "trash" = "private";
  type: string = "image";
  user: string = "";
  md5: string = "";
  originalname: string = "";
  size: number = 0;
  mimetype: string = "";
  name: string = "";
  path: string = "";
  height: number = 0;
  width: number = 0;
  blurhash: string = "";
  medium: string = "";
  thumbnail: string = "";
  original: string = "";

  constructor(data?: Partial<StockImageDocument>) {
    Object.assign(this, data);
  }

  Set<T extends keyof StockImageDocument>(
    key: T,
    value: StockImageDocument[T]
  ): StockImageDocument {
    if (this[key] instanceof Function === false) {
      return new StockImageDocument({ ...this, [key]: value });
    }
    return this;
  }

  static watch(
    db: Firestore,
    user: User,
    callback: (docs: StockImageDocument[]) => void
  ): Unsubscribe {
    return onSnapshot(
      query(collection(db, "images"), where("user", "==", user.uid)),
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => new StockImageDocument({ ...doc.data(), _id: doc.id })
        );
        callback(docs);
      }
    );
  }

  static view = (user: User, url: string) => {
    return new Promise<StockImageDocument>(async (resolve, reject) => {
      fetch(`/api/core`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({
          ref: "image",
          action: "view",
          url,
        }),
      })
        .then((res) => res.json())
        .then((res) => resolve(new StockImageDocument(res)))
        .catch(reject);
    });
  };

  static posToStr(pos?: StockImagePosition): string {
    return pos
      ? `${typeof pos?.left === "string" ? pos.left : 50} ${
          typeof pos?.top === "string" ? pos.top : 50
        }`
      : "center";
  }
}

export type StockImagePosition = Record<"top" | "left", string>;

export class StockImageController {
  user: User;
  apiURL: string = apiURL;

  constructor(user: User) {
    this.user = user;
  }

  async getHeader(user: User, opts?: HeadersInit): Promise<HeadersInit> {
    const token = await user.getIdToken();
    return Object.assign({}, opts, {
      Authorization: `Bearer ${token}`,
    } as HeadersInit);
  }

  getPublic = async (page: number = 1): Promise<StockImageDocument[]> => {
    if (this.user) {
      const result = await fetch(`${this.apiURL}/file/public/${page}`, {
        headers: await this.getHeader(this.user),
      }).then((res) => res.json());
      return result;
    }
    return [];
  };

  toBase64 = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
    });
  };

  upload = (file: File): Promise<StockImageDocument> => {
    return new Promise(async (resolve, reject) => {
      if (this.user) {
        const token = await this.user.getIdToken();
        const data = new FormData();
        data.append("file", await this.toBase64(file));
        data.append("name", file.name);
        data.append("mimetype", file.type);
        data.append("ref", "image");
        data.append("action", "upload");
        await axios
          .post(this.apiURL, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            resolve(new StockImageDocument(res.data));
          })
          .catch((e) => reject(new Error(e?.response?.data?.message)));
      } else {
        reject(new Error("User not found"));
      }
    });
  };

  update = async (
    _id: string,
    data: Partial<StockImageDocument>
  ): Promise<StockImageDocument | null> => {
    if (this.user) {
      const res = await fetch(`${this.apiURL}/file/`, {
        method: "PATCH",
        headers: await this.getHeader(this.user, {
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ _id, content: data }),
      }).then((res) => res.json());
      return res;
    }
    return null;
  };

  remove = async (_id: string) => {
    if (this.user) {
      const res = await fetch(`${this.apiURL}/file/id/${_id}`, {
        method: "DELETE",
        headers: await this.getHeader(this.user),
      }).then((res) => res.json());
      return res;
    }
  };

  keep = async (_id: string): Promise<StockImageDocument | null> => {
    if (this.user) {
      const res = await fetch(`${this.apiURL}/file/keep/${_id}`, {
        method: "PUT",
        headers: await this.getHeader(this.user),
      }).then(
        (res) => res.json(),
        (err) => console.log(err)
      );
      return res;
    }
    return null;
  };

  getTag = () => {
    return [];
  };

  private toDataURL(url: string): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(() => reject(new Error("Fail to load image from URL")));
    });
  }

  private dataURLtoFile(
    dataurl: string,
    onRejected?: (err: Error) => void
  ): File | null {
    var arr = dataurl.split(","),
      mime = arr[0]?.match(/:(.*?);/)?.[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    if (mime && /image/.test(mime)) {
      const filename =
        Date.now().toString() + "." + mime.split("/")[1].toLowerCase();
      return new File([u8arr], filename, { type: mime });
    } else {
      onRejected?.(new Error("Invalid type"));
      return null;
    }
  }

  fromURL = (url: string): Promise<File | null> => {
    return new Promise(async (resolved, reject) => {
      const buffer = await this.toDataURL(url).catch((err) => {
        reject(err);
      });
      if (typeof buffer === "string") {
        const file = this.dataURLtoFile(buffer, (err) => {
          reject(err);
        });
        resolved(file);
      } else {
        reject(new Error("invalid URL"));
      }
    });
  };
}

//SECTION - StockImageCtrl
export type StockImageCtrlConstructorValue = Omit<
  StockImageDocument,
  "visibility" | "datecreate" | "datemodified" | "credit"
> & {
  visibility: VisibilityTabsValue;
  datecreate: number | string;
  datemodified: number | string;
};

//ANCHOR - StockImageCtrl
export class StockImageCtrl
  implements
    Omit<
      StockImageDocument,
      "visibility" | "datecreate" | "datemodified" | "credit" | "Set"
    >
{
  _id: string;
  datecreate: number;
  datemodified: number;
  visibility: VisibilityTabsValue;
  type: "image" = "image";
  user: string;
  md5: string;
  originalname: string;
  size: number;
  mimetype: string;
  name: string;
  path: string;
  height: number;
  width: number;
  blurhash: string;
  medium: string;
  thumbnail: string;
  from: string;
  fromId: string;
  original: string;
  credit: {
    type: string;
    value: string;
    uid: string;
  } | null;
  ref: string;

  constructor(data?: Partial<StockImageCtrlConstructorValue>) {
    this._id = data?._id ?? "";
    this.datecreate = DateCtl.toNumber(data?.datecreate);
    this.datemodified = DateCtl.toNumber(data?.datemodified);
    this.visibility = data?.visibility ?? "private";
    this.user = data?.user ?? "";
    this.md5 = data?.md5 ?? "";
    this.originalname = data?.originalname ?? "";
    this.size = data?.size ?? 0;
    this.mimetype = data?.mimetype ?? "";
    this.name = data?.name ?? "";
    this.path = data?.path ?? "";
    this.height = data?.height ?? 0;
    this.width = data?.width ?? 0;
    this.blurhash = data?.blurhash ?? "";
    this.medium = data?.medium ?? "";
    this.thumbnail = data?.thumbnail ?? "";
    this.from = "";
    this.fromId = "";
    this.original = "";
    this.credit = null;
    this.ref = "";
  }

  toDisplay(): NonNullable<Pick<StockDisplayProps, "image" | "pos">> {
    return {
      image: {
        _id: this._id,
        blurhash: this.blurhash,
        width: this.width,
        height: this.height,
      },
      pos: { top: "50%", left: "50%" },
    };
  }
}
//!SECTION
