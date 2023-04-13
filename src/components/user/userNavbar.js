import { useGetUserQuery } from "../../redux/user/userApiSlice";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/auth/authApiSlice";
import { useSendUserToggleHandMutation } from "../../redux/user/userApiSlice";
import { logOut } from "../../redux/auth/authSlice";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
const UserNavbar = () => {
  const { data, isLoading, isError, error } = useGetUserQuery();
  const [fetchLogout, {}] = useLogoutMutation();
  const [fetchToggleHand, {}] = useSendUserToggleHandMutation();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await fetchLogout().unwrap();
      dispatch(logOut({}));
    } catch {
      console.log("logout error");
    }
  };
  const toggleHand = async () => {
    try {
      await fetchToggleHand().unwrap();
    } catch {
      console.log("toggle hand  error");
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavDropdown title="Actions" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={toggleHand}>
            {isLoading
              ? "Loading..."
              : isError
              ? error
              : data.handRaised
              ? "Raise hand down"
              : "Raise hand up"}
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          title={isLoading ? "Loading..." : isError ? error : data.name}
          id="navbar"
          className="ms-auto"
        >
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};
export default UserNavbar;
