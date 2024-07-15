import { BsCartCheck } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineManageHistory } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";

export const customerLinks = [
  {
    href: "/profile",
    label: "Profile",
    Icon: CiUser,
  },
  {
    href: "/settings",
    label: "Account setting",
    Icon: RiUserSettingsLine,
  },
  {
    href: "/my-orders",
    label: "My orders",
    Icon: FiShoppingBag,
  },
  {
    href: "/track-order",
    label: "Track my order",
    Icon: BsCartCheck,
  },
];

export const ownerLinks = [
  {
    href: "/profile/earning",
    label: "Earning",
    Icon: FiShoppingBag,
  },
  {
    href: "/profile/order",
    label: "Orders",
    Icon: FiShoppingBag,
  },
  {
    href: "/profile/manage-product",
    label: "Manage Product",
    Icon: MdOutlineManageHistory,
  },
  {
    href: "/profile/product-create",
    label: "Add Product",
    Icon: BsCartCheck,
  },
  {
    href: "/profile/utility",
    label: "Utility",
    Icon: MdOutlineManageHistory,
  },
  {
    href: "/profile",
    label: "Profile",
    Icon: CiUser,
  },
  {
    href: "/settings",
    label: "Account setting",
    Icon: RiUserSettingsLine,
  },
];
