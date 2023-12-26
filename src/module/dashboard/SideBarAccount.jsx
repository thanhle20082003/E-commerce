import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import logo from "../../assets/images/about-02.jpg";
import { BiSolidCartAdd } from "react-icons/bi";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { MdOutlinePlace } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const SideBarAccount = () => {
  return (
    <>
      <div className="w-full h-screen max-w-xs max-h-screen">
        <div className="flex items-center justify-center mt-10 mb-5">
          <img
            src={logo}
            alt=""
            className="object-cover object-center rounded-full h-28 w-28"
          />
        </div>
        <div className="overflow-auto scrollbar scrollbar-thin scrollbar-thumb-blue-gray-100 max-h-[calc(100vh-72px">
          <List className="px-5">
            <Link to="/user">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="w-5 h-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </Link>
            <Link to="/user/order">
              <ListItem>
                <ListItemPrefix>
                  <BiSolidCartAdd className="w-5 h-5" />
                </ListItemPrefix>
                My Order
              </ListItem>
            </Link>
            <Link to="/user/changePassword">
              <ListItem>
                <ListItemPrefix>
                  <MdLockOutline className="w-5 h-5" />
                </ListItemPrefix>
                Change Password
              </ListItem>
            </Link>
            <Link to="/user/address">
              <ListItem>
                <ListItemPrefix>
                  <MdOutlinePlace className="w-5 h-5" />
                </ListItemPrefix>
                Address
              </ListItem>
            </Link>
            <Link to="/user/historyOrder">
              <ListItem>
                <ListItemPrefix>
                  <MdOutlineShoppingCartCheckout className="w-5 h-5" />
                </ListItemPrefix>
                History Order
              </ListItem>
            </Link>
            <Link>
              <ListItem>
                <ListItemPrefix>
                  <PowerIcon className="w-5 h-5" />
                </ListItemPrefix>
                Log Out
              </ListItem>
            </Link>
          </List>
        </div>
      </div>
    </>
  );
};

export default SideBarAccount;
