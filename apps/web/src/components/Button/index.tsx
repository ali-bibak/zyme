import React from "react";

// Types
import type { ButtonProps } from "./types";

export const Button: React.FunctionComponent<ButtonProps> = React.forwardRef(
  (props: ButtonProps, ref: any) => {
    const {
      children,
      type = "primary",
      ghost,
      className = "",
      onClick,
      loading = false,
      isRound = false,
      disabled,
      icon,
      ...rest
    } = props;

    const [innerLoading, setLoading] = React.useState(!!loading);

    React.useEffect(() => {
      setLoading(!!loading);
    }, [loading]);

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
    ) => {
      const { disabled } = props;
      if (innerLoading || disabled) {
        e.preventDefault();
        return;
      }
      (
        onClick as React.MouseEventHandler<
          HTMLButtonElement | HTMLAnchorElement
        >
      )?.(e);
    };

    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        data-testid="button"
        ref={ref}
        {...rest}
      >
        <label data-testid="label">{innerLoading ? "..." : children}</label>
      </button>
    );
  },
);

Button.displayName = "Button";
