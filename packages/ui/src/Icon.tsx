"use client";

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
  CaretUpIcon,
  CaretUpDownIcon,
  CheckCircleIcon,
  CheckIcon,
  ChecksIcon,
  ClockIcon,
  ColumnsIcon,
  CopyIcon,
  DotsThreeIcon,
  EyeSlashIcon,
  FileIcon,
  FolderIcon,
  FunnelIcon,
  GitBranchIcon,
  InfoIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  PaperclipIcon,
  DownloadSimpleIcon,
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
  chevronUp: CaretUpIcon,
  chevronsLeft: CaretDoubleLeftIcon,
  chevronsRight: CaretDoubleRightIcon,
  caretUpDown: CaretUpDownIcon,
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
  file: FileIcon,
  paperclip: PaperclipIcon,
  download: DownloadSimpleIcon,
  branch: GitBranchIcon,
} satisfies Record<string, PhosphorIcon>;

export type IconName = keyof typeof iconRegistry;

export type IconProps = PhosphorIconProps & {
  name: IconName;
};

export function Icon({ name, weight = "regular", ...props }: IconProps) {
  const IconComponent = iconRegistry[name];

  return <IconComponent {...props} weight={weight} />;
}
