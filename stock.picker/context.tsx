import { createContext, Dispatch, useContext } from "react";
import { StockImageController, StockImageDocument } from "./controller";
import moment from "moment";
import { Core } from "..";

export type StateAction =
  | { type: "loading"; value: boolean }
  | { type: "docs"; value: StockImageDocument[] }
  | { type: "select/add" | "select/remove"; value: string }
  | { type: "select/clear" }
  | { type: "select/toggle"; value: string }
  | { type: "docs/update"; value: StockImageDocument }
  | { type: "docs/remove" }
  | { type: "multiple"; value?: boolean }
  | {
      type: "upload/add";
      value: File[];
      callback: (action: Core.StateAction) => void;
    }
  | { type: "upload/clear"; value: (StockImageDocument | null)[] }
  | { type: "progress"; index: number; value: number };
export class State {
  loading: boolean = true;
  docs: StockImageDocument[] = [];
  selected: string[] = [];
  uploadqueue: File[] = [];
  multiple: boolean = false;
  progress: { [key: number]: number } = {};

  constructor(init?: Partial<State>) {
    Object.assign(this, init);
  }

  Set<T extends keyof State>(key: T, value: State[T]): State {
    if (this[key] instanceof Function === false) {
      return new State({ ...this, [key]: value });
    }
    return this;
  }

  Get() {
    return {
      progress: (index: number): number => this.progress?.[index] ?? -1,
    };
  }

  Select() {
    return {
      add: (id: string) => this.Set("selected", this.selected.concat(id)),
      remove: (id: string) =>
        this.Set(
          "selected",
          this.selected.filter((i) => i !== id)
        ),
      toggle: (id: string): State => {
        if (this.multiple) {
          return this.Set(
            "selected",
            this.selected.includes(id)
              ? this.selected.filter((i) => i !== id)
              : this.selected.concat(id)
          );
        } else {
          return this.Set("selected", this.selected.includes(id) ? [] : [id]);
        }
      },
      clear: () => this.Set("selected", []),
    };
  }

  Docs() {
    return {
      update: (doc: StockImageDocument): State => {
        const index = this.docs.findIndex((d) => d.md5 === doc.md5);
        if (index > -1) {
          this.docs[index] = doc.Set(
            "datemodified",
            moment().format("YYYY-MM-DD HH:mm:ss")
          );
          return this.Set("docs", this.docs);
        } else {
          return this.Set("docs", this.docs.concat(doc));
        }
      },
      remove: (): State => {
        const docs = this.docs.filter(
          (doc) => !this.selected.includes(doc._id)
        );
        return this.Set("docs", docs).Select().clear();
      },
    };
  }

  Upload() {
    return {
      add: (
        files: File[],
        callback: (action: Core.StateAction) => void
      ): State => {
        if (this.uploadqueue.length > 0) {
          callback({
            type: "alert/add",
            value: {
              label: "Please wait until latest queue complete",
              severity: "warning",
            },
          });
          return this;
        }
        const filtered = files.filter((file) => /image/.test(file.type));
        if (filtered.length < files.length) {
          callback({
            type: "alert/add",
            value: { label: "Some files are not images" },
          });
        }
        return this.Set("uploadqueue", files);
      },
      clear: (docs: (StockImageDocument | null)[]): State => {
        docs.forEach((doc) => {
          if (doc) {
            const index = this.docs.findIndex((d) => d.md5 === doc.md5);
            if (index > -1) {
              this.docs[index] = doc;
            } else {
              this.docs.push(doc);
            }
          }
        });
        return new State({ ...this, uploadqueue: [], progress: {} });
      },
    };
  }

  static reducer(s: State, a: StateAction): State {
    switch (a.type) {
      case "loading":
        return s.Set("loading", a.value);
      case "docs":
        return s.Set("docs", a.value).Set("loading", false);
      case "select/add":
        return s.Select().add(a.value);
      case "select/remove":
        return s.Select().remove(a.value);
      case "select/clear":
        return s.Select().clear();
      case "select/toggle":
        return s.Select().toggle(a.value);
      case "docs/update":
        return s.Docs().update(a.value);
      case "docs/remove":
        return s.Docs().remove();
      case "multiple":
        return s.Set("multiple", Boolean(a.value));
      case "upload/add":
        return s.Upload().add(a.value, a.callback);
      case "upload/clear":
        return s.Upload().clear(a.value);
      case "progress":
        return s.Set("progress", { ...s.progress, [a.index]: a.value });
      default:
        return s;
    }
  }
}

export interface StockPickerProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (images: StockImageDocument[]) => void;
  multiple?: boolean;
}

export interface SPContextTypes {
  control?: StockImageController;
  state: State;
  dispatch: Dispatch<StateAction>;
}

export const SPContext = createContext<SPContextTypes>({
  state: new State(),
  dispatch: () => {},
});

export const useSP = () => useContext(SPContext);
