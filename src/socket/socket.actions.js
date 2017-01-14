
import io from "socket.io-client";

export const connectToSocket = () => {
  return (dispatch, getState) => {
    const token = getState().toJS().auth.token;
    // const socket = io.connect(process.env.SOCKET_URL);
    const socket = io.connect("http://localhost:8008");
      console.log("hei")
    socket.on('connect', function () {
      console.log("hei")
      socket
        .emit('authenticate', { token, }) //send the jwt
        .on('authenticated', function () {
          //do other things
          console.log("authenticated!")
        })
        .on('unauthorized', function(msg) {
          console.log("unauthorized: " + JSON.stringify(msg.data));
          throw new Error(msg.data.type);
        })
    });

    socket.on('connect', function(){
      console.log("connected")
    });

    socket.on('server-update', function(data){
      console.log("yo event", data)
      data.map(action => {
        dispatch(action)
      })
    });

    socket.on('disconnect', function(){
      console.log("disconnected!")
    });

    return dispatch(setSocket(socket));
  };
}

export const setSocket = (socket) => (
  {
    type: "SET_SOCKET",
    payload: {
      socket,
    }
  }
)

export const serverSaveThesis = (thesis) => (
  {
    type: "SERVER_SAVE_THESIS",
    payload: {
      thesis,
    }
  }
)

export const serverUpdateThesis = (thesis) => (
  {
    type: "SERVER_UPDATE_THESIS",
    payload: {
      thesis,
    }
  }
)

export const serverDeleteThesis = (thesis) => (
  {
    type: "SERVER_DELETE_THESIS",
    payload: {
      thesis,
    }
  }
)