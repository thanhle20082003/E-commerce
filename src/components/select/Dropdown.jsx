import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import PropTypes from "prop-types";

const Dropdown = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <Menu>
        <MenuHandler>
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            className="border border-gray-900 p-0.5 cursor-pointer"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
        </MenuHandler>
        <MenuList>
          <MenuItem>
            {user && user?.path === 0 ? (
              <Link to="/user">My Profile</Link>
            ) : (
              <Link to="/admin/profile">My Profile</Link>
            )}
          </MenuItem>
          <MenuItem>
            <Link to="/help">Help</Link>
          </MenuItem>
          <MenuItem>
            <span onClick={handleLogout}>Log out</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

Dropdown.propTypes = {
  user: PropTypes.object,
};

export default Dropdown;
