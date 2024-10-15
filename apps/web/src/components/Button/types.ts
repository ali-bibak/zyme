import type { MouseEventHandler, ReactNode } from "react";

export type ButtonProps = {
  type?: string;
  ghost?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  children?: ReactNode;
  loading?: boolean;
  isRound?: boolean;
  icon?: ReactNode;
};
