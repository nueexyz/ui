import type { Icon as PhosphorIcon, IconProps as PhosphorIconProps } from "@phosphor-icons/react";
import {
  ArrowDownIcon,
  ArrowSquareOutIcon,
  ArrowsDownUpIcon,
  ArrowUpIcon,
  CalendarIcon,
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ChecksIcon,
  ClockIcon,
  ColumnsIcon,
  CopyIcon,
  DotsThreeIcon,
  EyeSlashIcon,
  FolderIcon,
  FunnelIcon,
  InfoIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  StopIcon,
  WarningIcon,
  WrenchIcon,
  XCircleIcon,
  XIcon,
} from "@phosphor-icons/react";

export const iconRegistry = {
  close: XIcon,
  chevronDown: CaretDownIcon,
  chevronLeft: CaretLeftIcon,
  chevronRight: CaretRightIcon,
  chevronsLeft: CaretDoubleLeftIcon,
  chevronsRight: CaretDoubleRightIcon,
  check: CheckIcon,
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: WarningIcon,
  info: InfoIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  externalLink: ArrowSquareOutIcon,
  menu: ListIcon,
  moreHorizontal: DotsThreeIcon,
  search: MagnifyingGlassIcon,
  arrowUp: ArrowUpIcon,
  arrowDown: ArrowDownIcon,
  arrowsUpDown: ArrowsDownUpIcon,
  funnel: FunnelIcon,
  eyeSlash: EyeSlashIcon,
  viewColumns: ColumnsIcon,
  copy: CopyIcon,
  checkDouble: ChecksIcon,
  wrench: WrenchIcon,
  stop: StopIcon,
  microphone: MicrophoneIcon,
  folder: FolderIcon,
} satisfies Record<string, PhosphorIcon>;

export type IconName = keyof typeof iconRegistry;

export type IconProps = PhosphorIconProps & {
  name: IconName;
};

export function Icon({ name, weight = "thin", ...props }: IconProps) {
  const IconComponent = iconRegistry[name];

  return <IconComponent {...props} weight={weight} />;
}
