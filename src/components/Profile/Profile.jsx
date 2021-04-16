import React, { useEffect, useState } from "react";
import APIURL from "../../assets/URL";
import "./Profile.scss";
import { useHistory, useParams } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import Button from "@material-ui/core/Button";
import { RiUser3Fill, RiUserHeartFill } from "react-icons/ri";

import ClosetPreview from "./ClosetPreview";

function Profile() {
    const [closetData, closetDataSet] = useState(undefined);
    const [userData, userDataSet] = useState(undefined);
    const [currUserInfo, currUserInfoSet] = useState(undefined);
    const [following, followingSet] = useState(undefined);
    const rexUID = localStorage.getItem("rexUID");
    const { id } = useParams();
    const history = useHistory();
    console.log(`make a fetch to /api/profile/${id} to fill content with data`);

    const fetchClosets = () => {
        console.log("id", id);
        fetch(`${APIURL}/api/closets-from-user?id=${id}&uid=${rexUID}`)
            .then((res) => res.json())
            .then((json) => {
                console.log("closets", json);
                const updatedData = json.closets.filter(
                    (c) => c.closet_name !== "Saved Products"
                );
                closetDataSet(updatedData);
                console.log("owner", json.owner);
                userDataSet(json.owner);
                currUserInfoSet(json.info);
                console.log("info", json.info);
                followingSet(json.info.is_following);
            });
    };

    useEffect(() => {
        fetchClosets();
    }, []);

    const handleFollow = () => {
        // fetch call to change follow state

        console.log("Change follow state to:", id);

        if (following) {
            fetch(`${APIURL}/api/unfollow-user?following=${id}&uid=${rexUID}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((json) => {
                    followingSet(false);
                });
        } else {
            fetch(`${APIURL}/api/follow-user?uid=${rexUID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    following: id,
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    followingSet(true);
                });
        }
    };

    const handleBack = () => {
        history.push("/closets");
    };

    const handleProfileMenu = () => {
        console.log("show user menu");
    };

    return (
        <div id="profile-page">
            {userData && (
                <div id="user-info">
                    <img
                        src={userData.profile_image}
                        id="propic"
                        alt="propic"
                    />
                    <div id="name">{`${userData.first_name} ${userData.last_name}`}</div>
                    <div id="username">@{userData.username}</div>
                    <div id="buttons">
                        <IconButton id="back" onClick={handleBack}>
                            <BiArrowBack />
                        </IconButton>
                        <div id="closetcount">{`${userData.followers} Followers | ${userData.count} Closets`}</div>
                        <div id="profile-options">
                            <Button
                                id="follow"
                                className={following ? "highlight" : "none"}
                                onClick={() => {
                                    handleFollow();
                                }}
                                size="small"
                                startIcon={
                                    following ? (
                                        <RiUserHeartFill />
                                    ) : (
                                        <RiUser3Fill />
                                    )
                                }
                            >
                                {following ? "Following" : "Follow"}
                            </Button>
                            <IconButton id="menu" onClick={handleProfileMenu}>
                                <BsThreeDotsVertical />
                            </IconButton>
                        </div>
                    </div>
                </div>
            )}
            {closetData && (
                <div id="user-closets">
                    {closetData.map(c => (
                        <ClosetPreview
                            closet={c}
                            updateClosets={fetchClosets}
                            key={c.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Profile;
