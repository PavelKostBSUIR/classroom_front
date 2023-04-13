import { useLazyGetUsersQuery } from "../../redux/user/userApiSlice";
import { useLazyGetUserQuery } from "../../redux/user/userApiSlice";
import { Container, ListGroup } from "react-bootstrap";
import { useEffect } from "react";
import { FaHandPaper } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/auth/authSlice";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
const UserList = () => {
  const token = useSelector(selectCurrentToken);
  const [trigger, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetUsersQuery();
  const [userTrigger, {}] = useLazyGetUserQuery();
  useEffect(() => {
    trigger();
  }, [trigger]);
  useEffect(() => {
    //const sock = new SockJS("http://localhost:8080/ws");
    const client = Stomp.client("ws://localhost:8080/ws");

    client.connect({ token: token }, () => {
      const callback = () => {
        trigger();
      };
      client.subscribe("/topic/classroom.members.toggle.hand.event", () => {
        console.log("toggled");
        userTrigger();
        callback();
      });
      client.subscribe("/topic/classroom.members.logout.event", callback);
      client.subscribe("/topic/classroom.members.login.event", callback);
    });
    return () => {
      client.disconnect();
    };
  }, [trigger, userTrigger, token]);
  return isLoading ? (
    "Loading"
  ) : isError ? (
    error
  ) : !isSuccess ? (
    "Not success"
  ) : (
    <Container
      className="justify-content-md-center bg-white mt-5"
      style={{ width: "25%" }}
    >
      {data.map((user) => (
        <ListGroup>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> {user.name}</div>
            <div>{user.handRaised && <FaHandPaper />}</div>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </Container>
  );
};
export default UserList;
