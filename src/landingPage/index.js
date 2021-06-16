import React from "react";
import axios from "axios";
import ImageHost from "../imageHost/index";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function LandingPage(props) {
  const classes = useStyles();
  const [imgList, newList] = React.useState([]);
  const [page, newPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const divField = React.useRef({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0
  });

  const apiCall = () => {
    axios
      .get(`https://picsum.photos/v2/list?page=${page}&limit=30`)
      .then(({ data }) => {
        newList([...imgList, ...data]);
      })
      .then((res) => newPage(page + 1))
      .catch((err) => console.log(err));
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = divField.current;
    console.log(
      "scrollTop, scrollHeight, clientHeight ",
      scrollTop,
      scrollHeight,
      clientHeight
    );
    if (scrollTop + clientHeight === scrollHeight) {
      // TO SOMETHING HERE
      apiCall();
    }
  };

  const handleOpen = (x) => {
    setOpen(x);
  };

  React.useEffect(() => {
    apiCall();
  }, []);

  return (
    <div onScroll={(e) => console.log("e", e)}>
      <div
        // ref={divField}
        style={{ display: "flex", flexWrap: "wrap", justifySelf: "auto" }}
      >
        {imgList.map((x) => (
          <span style={{ padding: "5px" }}>
            <ImageHost id={x} func={handleOpen} />
          </span>
        ))}
      </div>
      <div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            background: "#FFFFFF",
            height: "750px",
            width: "720px",
            display: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <div>
            <img
              style={{ height: "700px", width: "700px" }}
              alt={`${open}`}
              src={`${open}`}
            />
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              color="primary"
            >
              close
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
