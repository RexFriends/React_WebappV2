import { useState, useEffect } from "react";
import SearchBarComp from "material-ui-search-bar";
import "./SearchBar.scss";
import Scrollbars from "react-custom-scrollbars";
import { AnimatePresence, motion } from "framer-motion";
import URL from "../../assets/URL";
import { useHistory } from "react-router-dom";
type SearchBarProps = {
    scrolled: boolean;
};

type SearchResultObject = {
    first_name?: string;
    last_name?: string;
    username?: string;
    id: number;
    is_user: boolean;
    phone_number: string | null;
    profile_image: string;
};

export const SearchBar = ({ scrolled }: SearchBarProps) => {
    const [searchBar, searchBarSet] = useState<string>("");
    const [searchResults, searchResultsSet] = useState<SearchResultObject[]>(
        []
    );
    let history = useHistory();
    useEffect(() => {
        if (searchBar.length < 1) {
            searchResultsSet([]);
        }
        const timeoutId = setTimeout(() => {
            if (searchBar.length >= 1) {
                const rexUID = localStorage.getItem("rexUID");

                fetch(
                    URL + "/api/get-users?uid=" + rexUID + "&text=" + searchBar
                )
                    .then((res) => res.json())
                    .then((json) => {
                        searchResultsSet(json.users);
                    });
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchBar]);

    useEffect(() => {
        return () => {};
    }, [searchResults]);

    const handleSearch = () => {
        // console.log(
        //     "Search term:, we render a new page with the search query",
        //     searchBar
        // );
    };
    const OpenUserPage = (id: number) => {
        history.push(`/user/${id}`);
        searchBarSet("");
    };
    return (
        <div id="SearchBar">
            <SearchBarComp
                placeholder="Find People You Know"
                value={searchBar}
                onChange={(val) => searchBarSet(val)}
                onRequestSearch={handleSearch}
                onCancelSearch={() => {
                    searchResultsSet([]);
                }}
                style={{ backgroundColor: scrolled && "#f6f8f8" }}
            />
            <AnimatePresence>
                {searchResults.length > 0 && (
                    <motion.div
                        id="result-container"
                        initial={{ height: 0 }}
                        animate={{
                            height:
                                searchResults.length > 8
                                    ? 400
                                    : searchResults.filter((u) => u.is_user)
                                          .length * 50,
                        }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div id="results">
                            <Scrollbars autoHide>
                                {searchResults
                                    .filter((u) => u.is_user)
                                    .map((u) => (
                                        <div
                                            id="row"
                                            onClick={() => OpenUserPage(u.id)}
                                        >
                                            <img
                                                src={u.profile_image}
                                                alt="pro-img"
                                                id="pro-img"
                                            />
                                            {u.is_user ? (
                                                <div id="text">
                                                    <div>
                                                        {u.first_name +
                                                            " " +
                                                            u.last_name}
                                                    </div>
                                                    <div id="username">
                                                        @{u.username}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div id="text">
                                                    {u.phone_number}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </Scrollbars>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;
