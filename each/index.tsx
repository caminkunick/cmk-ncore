import { Children } from "react";

export const Each = <T extends {} = {}>(props: {
  docs: T[];
  render: (item: T) => JSX.Element;
}) => Children.toArray(props.docs.map(props.render));
