import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine, RiUserSettingsLine } from "react-icons/ri";

export const userProfileLinks = [
  {
    href: "/profile",
    label: "Profile",
    Icon: CiUser,
  },
  {
    href: "/profile/settings",
    label: "Account setting",
    Icon: RiUserSettingsLine,
  },
  {
    href: "/profile/update-password",
    label: "Security",
    Icon: RiLockPasswordLine,
  },
];
