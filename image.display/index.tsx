import { styled } from "@mui/material";
import { HTMLAttributes, SyntheticEvent, useCallback, useState } from "react";
import { StockImageDocument, StockImagePosition } from "../stock.picker";
import { Core } from "..";

export type ImageDisplayProps = HTMLAttributes<HTMLImageElement> & {
  src?: string;
  ratio?: string;
  pos?: StockImagePosition;
};
export const ImageDisplay = styled(
  ({ ratio, pos, className, ...props }: ImageDisplayProps) => {
    const { state } = Core.useCore();
    const [data, setData] = useState<StockImageDocument | null>(null);

    const handleLoad = useCallback(
      (e: SyntheticEvent<HTMLImageElement, Event>) => {
        if (
          !data &&
          e.currentTarget.width > 300 &&
          state.user !== "loading" &&
          !!state.user
        ) {
          StockImageDocument.view(state.user, e.currentTarget.src).then(
            setData
          );
        }
      },
      [state.user, data]
    );

    return (
      <div className={className}>
        <img {...props} src={data?.original ?? props.src} onLoad={handleLoad} />
      </div>
    );
  },
  {
    name: "ImageDisplay",
    shouldForwardProp: (prop) => prop !== "ratio" && prop !== "pos",
  }
)<ImageDisplayProps>(({ theme, ratio, pos }) => ({
  img: {
    width: "100%",
    backgroundColor: theme.palette.grey[500],
    border: "none",
    overflow: "hidden",
    aspectRatio: ratio ?? "1 / 1",
    objectFit: "cover",
    transition: "aspect-ratio 0.3s ease-in-out",
    objectPosition: StockImageDocument.posToStr(pos),
  },
}));
