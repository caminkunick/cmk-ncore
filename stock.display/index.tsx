import { Box, BoxProps, Checkbox, styled } from "@mui/material";
import React, {
  Fragment,
  HTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";
import { CreditDisplay, CreditDisplayProps } from "./credit";
import { BlurhashImage } from "./blurhash.image";
import { useOnScreen } from "./observ";
import { apiURL } from "../ctrls/api";
import { Link } from "@mui/icons-material";

export * from "./blurhash.image";

const getCredit = (
  _imageId: string,
  _callback: (result?: CreditDisplayProps) => void
): (() => void) => {
  const controller = new AbortController();
  // const signal = controller.signal;

  // fetch(`${apiURL}/file/credit/${imageId}`, {
  //   method: "get",
  //   signal,
  // })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     callback(result || null);
  //   })
  //   .catch((err) => {
  //     console.log(`Image (${imageId}): ${err.message}`);
  //   });

  return () => controller.abort();
};

const TransImg = styled("img")(({ theme }) => theme.mixins.absoluteFluid);

const LinkStyled = styled("a")(({ theme }) => ({
  display: "block",
  "& .link-icon": {
    ...theme.mixins.absoluteFluid,
    ...theme.mixins.flexMiddle,
    color: "white",
    fontSize: theme.typography.h2.fontSize,
    filter: "opacity(0)",
    transition: "all 0.25s",
  },
  "& img": {
    transition: "all 0.25s",
  },
  "&:hover": {
    "& .link-icon": {
      filter: "opacity(1)",
    },
    "& img": {
      filter: "brightness(0.7)",
    },
  },
}));

interface rootProps {
  ratio?: number;
  hover?: boolean;
  checked?: boolean;
}
const Root = styled(Box, {
  shouldForwardProp: (prop) =>
    !["ratio", "hover", "checked"].includes(String(prop)),
})<rootProps>(({ ratio, hover, checked, theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.neutral.main,
  "&:after": {
    content: "''",
    display: "block",
    paddingTop: `calc(100% * ${ratio || 1})`,
  },
  "& img, canvas": {
    filter: checked ? `brightness(0.6) grayscale(50%)` : undefined,
  },
  "&:hover img": {
    objectFit: hover ? "contain" : undefined,
  },
}));

const ImgStyled = styled("img")<{
  pos?: {
    top: string;
    left: string;
  };
}>(({ pos }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: pos ? `${pos?.left} ${pos?.top}` : undefined,
}));

const CheckboxStyled = styled(Checkbox)({
  position: "absolute",
  left: "0.5rem",
  bottom: "0.5rem",
  "& svg": {
    color: "white",
    filter: "drop-shadow(0 0 4px #000)",
  },
});

export interface StockDisplayImageTypes {
  blurhash?: string;
  _id: string;
  width?: number;
  height?: number;
  credit?: CreditDisplayProps;
  thumbnail?: string;
}

export interface StockDisplayProps {
  children?: React.ReactNode;
  image?: StockDisplayImageTypes;
  ratio?: number;
  pos?: {
    top: string;
    left: string;
  };
  checkbox?: boolean;
  checked?: boolean;
  onCheck?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  rootProps?: BoxProps;
  hover?: boolean;
  size?: "small" | "medium" | "large";
  url?: string;
  source?: { id: string; uri: string };
  blurhash?: string;
}

export const StockDisplay = ({
  children,
  image,
  pos: posProps,
  checkbox,
  checked,
  onCheck,
  rootProps,
  hover,
  size,
  source,
  ...props
}: StockDisplayProps) => {
  const divRef = useRef<HTMLDivElement>();
  const [err, setErr] = useState<boolean>(false);
  const [cstate, setCState] = useState<{
    loading: boolean;
    data?: CreditDisplayProps;
  }>({
    loading: false,
  });

  const isVisible = useOnScreen(divRef);

  const handleError = () => setErr(true);
  const getRatio = useCallback((): number => {
    return (
      props.ratio ||
      (image?.width && image.height && image?.width / image?.height) ||
      1
    );
  }, [props.ratio, image]);

  const getSrc = useCallback(
    (image: StockDisplayImageTypes) => {
      if (image.thumbnail?.includes("http")) {
        return image.thumbnail;
      }

      switch (size) {
        case "small":
          return `${apiURL}/file/id/${image._id}/thumbnail`;
        case "large":
          return `${apiURL}/file/id/${image._id}/`;
        default:
          return `${apiURL}/file/id/${image._id}/medium`;
      }
    },
    [size]
  );

  const Wrapper = useCallback(
    (p: HTMLAttributes<HTMLDivElement>) => {
      return props.url ? (
        <LinkStyled href={props.url} rel="noreferrer" target="_blank">
          {p.children}
          <Box className="link-icon">
            <Link />
          </Box>
        </LinkStyled>
      ) : (
        <Fragment>{p.children}</Fragment>
      );
    },
    [props.url]
  );

  React.useEffect(() => {
    if (cstate.loading === false && !cstate.data) {
      if (image?.credit) {
        setCState((s) => ({ ...s, loading: false, data: image.credit }));
      } else if (image?._id) {
        setCState((s) => ({ ...s, loading: true }));
        getCredit(image._id, (result) => {
          setCState((s) => ({ ...s, loading: false, data: result }));
        });
      } else if (source?.id) {
        setCState((s) => ({ ...s, loading: true }));
        getCredit(source.id, (result) => {
          setCState((s) => ({ ...s, loading: false, data: result }));
        });
      }
    }
    return () => {};
  }, [image, cstate, source]);

  return (
    <Root
      className="StockDisplay-root"
      ref={divRef}
      ratio={getRatio()}
      {...rootProps}
      hover={hover}
      checked={checked}
    >
      <Wrapper>
        {(image?.blurhash || props.blurhash) && (
          <BlurhashImage
            hash={image?.blurhash ?? props.blurhash ?? ""}
            canvasProps={{
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              },
            }}
          />
        )}
        {isVisible && image?._id && !err && (
          <ImgStyled src={getSrc(image)} pos={posProps} onError={handleError} />
        )}
        {source && <ImgStyled src={source.uri} pos={posProps} />}
        {checkbox && (
          <CheckboxStyled checked={Boolean(checked)} onChange={onCheck} />
        )}
        <TransImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
      </Wrapper>
      {children}
      {cstate.data && <CreditDisplay isAbsolute {...cstate.data} />}
    </Root>
  );
};
