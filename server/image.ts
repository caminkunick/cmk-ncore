import { app } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import moment from "moment";
import crypto from "crypto";
import sharp from "sharp";
import { encode } from "blurhash";
import { getDownloadURL } from "firebase-admin/storage";

export const ServerImage = (
  user: DecodedIdToken,
  app: app.App,
  body: Record<string, any>
) => {
  return new Promise<any>(async (resolve, reject) => {
    const db = getFirestore(app);

    if (body?.action === "get") {
      const docs = await db
        .collection("images")
        .where("user", "==", user.uid)
        .get();
      const images = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return resolve(images);
    } else if (body?.action === "upload") {
      const { name, mimetype, file } = body;
      return resolve(await ImageUpload(app, user, file, name, mimetype));
    } else if (body?.action === "view") {
      if(!body?.url) return reject("url is required");
      const doc = await db.collection("images").where("thumbnail", "==", body.url).get();
      if(doc.empty) return reject("image not found");
      const image = doc.docs[0].data();
      return resolve(image);
    }

    console.log(body);
    return reject(`invalid action (${body?.action})`);
  });
};

const ImageUpload = async (
  app: app.App,
  user: DecodedIdToken,
  url: string,
  name: string,
  mimetype: string
) => {
  const bucket = app.storage().bucket();
  const md5 = crypto.createHash("md5").update(url).digest("hex");
  const image = sharp(Buffer.from(url.split(",")[1], "base64"));
  const metadata = await image.metadata();

  const original = await new Promise<string>(async (resolve) => {
    const ref = bucket.file(`${user.sub}/${md5}/original.webp`);
    getDownloadURL(ref)
      .then((url) => {
        resolve(url);
      })
      .catch(() => {
        image.webp().toBuffer((_err, data) => {
          ref
            .save(data, {
              metadata: {
                contentType: "image/webp",
              },
            })
            .then(async () => {
              resolve(await getDownloadURL(ref));
            });
        });
      });
  });

  const medium = await new Promise<string>(async (resolve) => {
    const ref = bucket.file(`${user.sub}/${md5}/medium.webp`);
    getDownloadURL(ref)
      .then((url) => {
        resolve(url);
      })
      .catch(() => {
        image
          .resize(600)
          .webp()
          .toBuffer((_err, data) => {
            ref
              .save(data, {
                metadata: {
                  contentType: "image/webp",
                },
              })
              .then(async () => {
                resolve(await getDownloadURL(ref));
              });
          });
      });
  });
  const thumbnail = await new Promise<string>(async (resolve) => {
    const ref = bucket.file(`${user.sub}/${md5}/thumbnail.webp`);
    getDownloadURL(ref)
      .then((url) => {
        resolve(url);
      })
      .catch(() => {
        image
          .resize(300)
          .webp()
          .toBuffer((_err, data) => {
            ref
              .save(data, {
                metadata: {
                  contentType: "image/webp",
                },
              })
              .then(async () => {
                resolve(await getDownloadURL(ref));
              });
          });
      });
  });

  const blurhash = await new Promise<string>((resolve) => {
    image
      .raw()
      .ensureAlpha()
      .resize(16, 16, { fit: "inside" })
      .toBuffer((_err, data, { width, height }) => {
        const hash = encode(new Uint8ClampedArray(data), width, height, 4, 4);
        resolve(hash);
      });
  });

  const data = {
    datecreate: moment().format("YYYY-MM-DD HH:mm:ss"),
    datemodified: moment().format("YYYY-MM-DD HH:mm:ss"),
    visibility: "private",
    type: "image",
    user: user.sub,
    originalname: name,
    name,
    path: `/${user.sub}/${md5}`,
    mimetype,
    md5,
    width: metadata.width,
    height: metadata.height,
    size: metadata.size,
    blurhash,
    original,
    medium,
    thumbnail,
  };

  const result = await app.firestore().collection("images").add(data);

  return { ...data, _id: result.id };
};
