import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Grid } from "@material-ui/core";
import { AddToPhotos, FileCopy, MoreHoriz, Send } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import TextOverflow from "../TextOverflow/TextOverflow";
import SendIcon from "@material-ui/icons/Send";
import APIURL from "../../assets/URL";
import OptionsPopup from "../OptionsPopup/OptionsPopup";
import FeedbackPopup from "../FeedbackPopup/FeedbackPopup";
import { copyFallback } from "../../util";
import { showAlert } from "../Alerts/Alerts";
import AddToClosetPopup from '../AddToClosetPopup/AddToClosetPopup';

function ProductItem({ item, updateProducts }) {
  const [hover, hoverSet] = useState(false);
  const [image, imageSet] = useState(undefined);
  const [brand, brandSet] = useState("Brand");
  const [productName, setProductName] = useState("Product name");
  const [price, priceSet] = useState("$99.99");
  // const [brandLogo, setBrandLogo] = useState(undefined);
  const [showPopup, setShowPopup] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [showAddToClosetPopup, setShowAddToClosetPopup] = useState(false);
  const [friends, friendsSet] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (item.images !== null) {
      fetch(item.images)
        .then((res) => res.json())
        .then((json) => {
          imageSet(json.img_1);
        });
    } else {
      fetch(item.screenshot)
        .then((res) => res.json())
        .then((json) => imageSet(json.uri));
    }
    brandSet(item.brand);
    // setBrandLogo(item.site_name);
    setProductName(item.name);
    const itemPrice = item.price ? `${item.price}` : "";
    priceSet(itemPrice);
  }, [item]);

  useEffect(() => {
    const rexUID = localStorage.getItem("rexUID");
    fetch(`${APIURL}/api/get-users?uid=${rexUID}&text=${text}`)
      .then((res) => res.json())
      .then((json) => {
        friendsSet(json.users);
      });
  }, [text]);

  const handleShowFeedbackPopup = () => {
    setShowFeedbackPopup(true);
    setShowPopup(false);
  };

  const handleSendRequest = (id) => {
    const rexUID = localStorage.getItem("rexUID");
    const payload = {
      user_requesting_id: id,
      product_id: item.id,
    };
    fetch(`${APIURL}/api/send_rex?uid=${rexUID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .catch((err) => {
        showAlert("Failed to send", err);
      })
      .then(() => {
        showAlert("Sent Rex!", "success");
      });
  };

  const handleGetCopyLink = () => {
    const rexUID = localStorage.getItem("rexUID");
    const payload = { listing_id: item.id };
    fetch(`${APIURL}/api/copy_feedback_link?uid=${rexUID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.text())
      .then((link) => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(link).catch((err) => {
            console.error(err);
            copyFallback(link);
          });
        } else copyFallback(link);
      })
      .then(() => {
        showAlert("Copied link!", "success");
      });
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setText(value);
  };

  const debounceSearch = () => {
    let timeout;

    return (event) => {
      const func = () => {
        clearTimeout(timeout);
        handleSearch(event);
      };

      clearTimeout(timeout);
      setTimeout(func, 1000);
    };
  };

  const handleCloseFeedbackPopup = () => {
    setShowFeedbackPopup(false);
    setText("");
  };

  const handleInvite = async (ref) => {
    if (!ref.current) return;

    try {
      const rexUID = localStorage.getItem("rexUID");
      const res = await fetch(`${APIURL}/api/addfriendnumber?uid=${rexUID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phonenumber: ref.current.value,
        }),
      });
      const json = await res.json();
      if (json.success) showAlert("Invited user!", "success");
      else {
        showAlert(`${json.reason}!`, "error");
        return new Error(json.reason);
      }
    } catch (err) {
      showAlert("Invite failed!", "error");
      throw err;
    }
  };

  const handleDelete = () => {
    const rexUID = localStorage.getItem("rexUID");
    fetch(`${APIURL}/api/deletelisting?uid=${rexUID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: item.id,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        showAlert("Removed product!", "success");
        updateProducts();
        setShowPopup(false);
      })
      .catch((err) => {
        console.error(err);
        showAlert("Removing product failed!", "error");
      });
  };

  const handleShowAddToClosetPopup = () => {
    setShowAddToClosetPopup(true);
    setShowPopup(false);
  };

  const productId = `product-${item.id}`;

  return (
    <>
      <motion.div
        className="product"
        onMouseEnter={() => hoverSet(true)}
        onMouseLeave={() => hoverSet(false)}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "tween", delay: 0.3 }}
      >
        {/* <img style={{width: '30px', height: 'auto', borderRadius: '100%'}} src={`logo.clearbit.com/${brandLogo}`} /> */}
        <img src={image} alt="product" id="image" />
        <Grid
          style={{ width: 220, padding: "0 10px" }}
          justify="space-between"
          container
        >
          <Grid xs={8} direction="column" container item>
            <span
              style={{
                fontWeight: "bold",
                textAlign: "left",
                fontSize: "15px",
              }}
            >
              {brand}
            </span>
            <TextOverflow
              style={{
                color: "rgb(114, 114, 114)",
                fontSize: "13px",
                lineHeight: "1em",
                textAlign: "left",
                zIndex: 200,
              }}
              text={productName ? productName.split(",")[0] : ""}
              overflowLength={30}
            />
          </Grid>
          <Grid xs={4} direction="column" container item>
            <Grid id="price" item>
              <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                {price}
              </span>
            </Grid>
            <Grid item>
              <IconButton
                id={productId}
                style={{ zIndex: 200, padding: "unset" }}
                onClick={() => setShowPopup(true)}
              >
                <MoreHoriz />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <AnimatePresence>
          {hover && (
            <motion.div
              id="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div id="top">
                <IconButton onClick={handleShowFeedbackPopup} id="info">
                  <SendIcon
                    fontSize="large"
                    style={{ color: "14c4b2", width: "30px", height: "30px" }}
                  />
                </IconButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <OptionsPopup
        anchorElementId={productId}
        open={showPopup}
        onClose={() => setShowPopup(false)}
        title="Options"
        buttons={[
          { text: "Add to Closet", onClick: handleShowAddToClosetPopup, icon: <AddToPhotos /> },
          { text: "Send a Rex", onClick: handleShowFeedbackPopup, icon: <Send />, },
          { text: "Copy Link", onClick: handleGetCopyLink, icon: <FileCopy /> },
          { text: "Remove Product", onClick: handleDelete, isDelete: true },
        ]}
      />
      <FeedbackPopup
        anchorElementId={productId}
        open={showFeedbackPopup}
        onClose={handleCloseFeedbackPopup}
        handleGetCopyLink={handleGetCopyLink}
        handleSearch={debounceSearch()}
        friends={friends}
        handleSendRequest={handleSendRequest}
        handleInvite={handleInvite}
      />
      <AddToClosetPopup
          anchorElementId={productId}
          open={showAddToClosetPopup}
          onClose={() => setShowAddToClosetPopup(false)}
          item={item}
          updateProducts={updateProducts}
      />
    </>
  );
}

export default ProductItem;
