import { IconBaseProps } from "react-icons/lib";

type Size = "tiny" | "small" | "medium" | "large";

interface Props extends IconBaseProps {
  size?: Size | number;
  icon?: any;
}

const ICON_SIZE: Record<Size, number> = {
  large: 20,
  medium: 18,
  small: 16,
  tiny: 14,
};

export function Icon({ className, size = "small", icon, ...rest }: Props) {
  const IconComponent = icon;
  const iconSize: number = typeof size === "string" ? ICON_SIZE[size] : size;
  return <IconComponent className={className} size={iconSize} {...rest} />;
}