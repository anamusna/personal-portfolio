import clsx from "clsx";
import { ContainerProps } from "../../../tailwind/types/layout/container";
import { containerWidths } from "../../variables/containers";
import { spacers } from "../../variables/scales";

const gutter = spacers.xl;

const Container = ({
  style,
  children,
  className,
  theme = "light",
  size = "fw",
}: ContainerProps) => {
  return (
    <div
      className={clsx(
        "mx-auto",
        "w-full",
        `px-${gutter / 2}rem`,
        `sm:px-${gutter / 3}rem`,
        `md:px-${gutter / 4}rem`,
        `lg:px-${gutter / 5}rem`,
        `xl:px-${gutter / 6}rem`,
        className,
      )}
      style={{ maxWidth: containerWidths[size], ...style }}
    >
      {children}
    </div>
  );
};

export default Container;
