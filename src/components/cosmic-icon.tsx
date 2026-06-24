import { type IconProps } from 'iconsax-react-native';
import {
  Book1, Box, Briefcase, Calendar, Calendar1, Card, Chart2, CloseCircle, Cloud,
  Crown1, Drop, Element2, ElementEqual, Flash, Global, HambergerMenu, Hashtag,
  Heart, Home2, InfoCircle, MagicStar, MessageText1, Monitor, Moon,
  Notification, OmegaCircle, Pet, Profile, Profile2User, Refresh, SearchNormal1,
  Send2, Setting2, ShieldCross, Star1, StopCircle, Sun1, Text, TrendUp,
  UserOctagon, VolumeHigh, Warning2, Wind2,
} from 'iconsax-react-native';

const ICON_MAP = {
  Book1, Box, Briefcase, Calendar, Calendar1, Card, Chart2, CloseCircle, Cloud,
  Crown1, Drop, Element2, ElementEqual, Flash, Global, HambergerMenu, Hashtag,
  Heart, Home2, InfoCircle, MagicStar, MessageText1, Monitor, Moon,
  Notification, OmegaCircle, Pet, Profile, Profile2User, Refresh, SearchNormal1,
  Send2, Setting2, ShieldCross, Star1, StopCircle, Sun1, Text, TrendUp,
  UserOctagon, VolumeHigh, Warning2, Wind2,
} as const;

export type CosmicIconName = keyof typeof ICON_MAP;

interface CosmicIconProps {
  name: CosmicIconName;
  size?: number;
  color?: string;
  variant?: IconProps['variant'];
}

export function CosmicIcon({ name, size = 24, color = '#000', variant = 'Linear' }: CosmicIconProps) {
  const IconComponent = ICON_MAP[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} variant={variant} />;
}
