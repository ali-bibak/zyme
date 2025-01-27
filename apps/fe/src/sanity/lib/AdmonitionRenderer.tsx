import type { CSSProperties, FC } from "react";
interface AdmonitionValue {
  variant: "success" | "info" | "warning" | "error";
}

interface AdmonitionRendererProps {
  value: AdmonitionValue;
  renderDefault: (props: AdmonitionRendererProps) => React.JSX.Element;
}

const AdmonitionRenderer: FC<AdmonitionRendererProps> = (props) => {
  const { value, renderDefault } = props;

  let admonitionColor: CSSProperties = {};

  switch (value.variant) {
    case "success":
      admonitionColor = {
        background: "rgba(162, 219, 0, 0.15)",
        borderLeft: "4px solid rgba(214, 255, 98, 1)",
      };
      break;
    case "info":
      admonitionColor = {
        background: "rgba(0, 174, 239, 0.15)",
        borderLeft: "4px solid rgba(0, 174, 239, 1)",
      };
      break;
    case "warning":
      admonitionColor = {
        background: "rgba(255, 196, 0, 0.15)",
        borderLeft: "4px solid rgba(255, 196, 0, 1)",
      };
      break;
    case "error":
      admonitionColor = {
        background: "rgba(255, 0, 0, 0.15)",
        borderLeft: "4px solid rgba(255, 0, 0, 1)",
      };
      break;
    default:
      admonitionColor = {
        background: "rgba(162, 219, 0, 0.15)",
        borderLeft: "4px solid rgba(214, 255, 98, 1)",
      };
  }
  return (
    <div>
      <aside
        style={{
          padding: "1rem",
          ...admonitionColor,
        }}
      >
        {renderDefault(props)}
      </aside>
    </div>
  );
};

export default AdmonitionRenderer;
