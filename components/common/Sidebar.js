import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import MuiDrawer from "@mui/material/Drawer";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import CssBaseline from "@mui/material/CssBaseline";
import { Logout } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import SidebarUserSelect from "./SidebarUserSelect";
import Image from 'next/image';

const drawerWidth = 300;
const headerHeight = 70;

const openedMixin = (theme) => ({
  background: "#f8f8f8",
  width: drawerWidth,
  top: headerHeight,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: "unset",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: "unset",
  top: headerHeight,
  width: `calc(${theme.spacing(2)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(2)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  flexWrap: "wrap",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  minHeight: "111px !important",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const ListData = [
  {
    icon: `${process.env.NEXT_PUBLIC_BASE_URL}/img/icon/question-icon.svg`,
    label: "Create Question & Answer",
    subtitle: "Extract from Description",
    link: "/edu-ai-skills/create-question-answer",
    user_type: [
      {
        name: "all",
      },
      {
        name: "teacher",
      },
      {
        name: "content",
      },
    ],
  },
  {
    icon: `${process.env.NEXT_PUBLIC_BASE_URL}/img/icon/image-icon.svg`,
    label: "Convert Image into Caption",
    subtitle: "Providing Image Title",
    link: "/edu-ai-skills/convert-image-into-caption",
    user_type: [
      {
        name: "all",
      },
      {
        name: "teacher",
      },
      {
        name: "content",
      },
    ],
  },
  {
    icon: `${process.env.NEXT_PUBLIC_BASE_URL}/img/icon/text-icon.svg`,
    label: "Convert Image to Title",
    subtitle: "Providing name to doc file",
    link: "/edu-ai-skills/convert-doc-file-in-title",
    user_type: [
      {
        name: "all",
      },
      {
        name: "content",
      },
    ],
  },
  {
    icon: `${process.env.NEXT_PUBLIC_BASE_URL}/img/icon/summarization-icon.svg`,
    label: "Create Outline of Description",
    subtitle: "Concise rephrasing",
    link: "/edu-ai-skills/create-outline-of-description",
    user_type: [
      {
        name: "all",
      },
      {
        name: "student",
      },
    ],
  },
  {
    icon: `${process.env.NEXT_PUBLIC_BASE_URL}/img/icon/keywords-icon.svg`,
    label: "Create Meaningful Search Term",
    subtitle: "Extract from Description",
    link: "/edu-ai-skills/create-meaningful-search-term",
    user_type: [
      {
        name: "all",
      },
      {
        name: "teacher",
      },
      {
        name: "content",
      },
    ],
  },
  {
    icon: `${process.env.NEXT_PUBLIC_BASE_URL}/img/icon/grading-icon.svg`,
    label: "Auto Evaluation",
    subtitle: "Creating Auto Grading Answers",
    link: "/edu-ai-skills/auto-evaluation",
    user_type: [
      {
        name: "all",
      },
      {
        name: "teacher",
      },
      {
        name: "content",
      },
    ],
  },
  {
    icon: `${process.env.NEXT_PUBLIC_BASE_URL}/img/icon/content-icon.svg`,
    label: "Rephrase Content",
    subtitle: "Providing Meaningful Content",
    link: "/edu-ai-skills/rephrase-content",
    user_type: [
      {
        name: "all",
      },
      {
        name: "content",
      },
    ],
  },
  {
    icon: `${process.env.NEXT_PUBLIC_BASE_URL}/img/icon/assessment-icon.svg`,
    label: "Create Test Paper",
    subtitle: "With Answer & Logics",
    link: "/edu-ai-skills/create-test-paper",
    user_type: [
      {
        name: "all",
      },
      {
        name: "teacher",
      },
      {
        name: "content",
      },
    ],
  },
  {
    icon: `${process.env.NEXT_PUBLIC_BASE_URL}/img/icon/assessment-icon.svg`,
    label: "Convert Image to Text",
    subtitle: "Extracting Text from Image",
    link: "/edu-ai-skills/convert-image-to-text",
    user_type: [
      {
        name: "all",
      },
      {
        name: "content",
      },
    ],
  },
];

const SideBar = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuList, setMenuList] = useState(ListData);
  const [userSelect, setUserSelect] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setMenuOpen((prev) => !prev);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleUserSelect = (e) => {
    setUserSelect(e.target.value);
  };

  const handleSidebarSearch = (e) => {
    const filterBySearch = ListData?.filter((item) => {
      if (item?.label?.toLowerCase().includes(searchValue.toLowerCase())) {
        return item;
      } else if (
        item?.subtitle?.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return item;
      }
    });
    setMenuList(filterBySearch);
  };

  useEffect(() => {
    const filtered = ListData.filter((chat) => {
      const searchValue = userSelect.toLowerCase();
      return (
        chat.user_type.filter((user) =>
          user.name.toLowerCase().includes(searchValue)
        ).length > 0
      );
    });
    setMenuList(filtered);
    if (userSelect === "") {
      setMenuList(ListData);
      return;
    }
  }, [userSelect]);

  useEffect(() => {
    if (searchValue === "") {
      setMenuList(ListData);
      return;
    }
  }, [searchValue]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    if (media.matches) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("mod_auth_permission");
    localStorage.removeItem("mod_auth_role");
    localStorage.removeItem("mod_auth_email");
    localStorage.removeItem("mod_auth_login");
    router.push("/login");
  };

  return (
    <>
      <Box sx={{ display: "flex" }} position="relative">
        {" "}
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton
              className="side-toggle-btn"
              onClick={handleDrawerToggle}
            >
              {open ? (
                <ArrowCircleLeftRoundedIcon />
              ) : (
                <ArrowCircleRightRoundedIcon />
              )}
            </IconButton>
            <Box
              visibility={open ? "visible" : "hidden"}
              display="flex"
              flexWrap="wrap"
            >
              <Box className="header-logo" p={2}>
                <Typography variant="h3" fontSize={20} fontWeight={600}>
                  AI Workflows
                </Typography>
              </Box>
              <SidebarUserSelect
                userSelect={userSelect}
                setUserSelect={setUserSelect}
                handleUserSelect={handleUserSelect}
                searchValue={searchValue}
                handleSidebarSearch={handleSidebarSearch}
                setSearchValue={setSearchValue}
              />
            </Box>
          </DrawerHeader>
          <Divider />
          <List id="nav">
            {menuList &&
              menuList.map((item) => (
                <>
                  <Link
                    href={item?.children ? "#" : `${item?.link}`}
                    key={item?.label}
                    className={pathname == `${item?.link}` ? "active" : ""}
                    onClick={item?.children ? handleClick : null}
                    style={{ color: item?.children ? "#6B7280" : "" }}
                  >
                    <ListItem>
                      <ListItemIcon
                        sx={{
                          minWidth: "35px",
                        }}
                      >
                      <Image src={item?.icon} alt={item?.label} width={20} height={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item?.label}
                        secondary={item?.subtitle}
                      />
                      {item?.children ? (
                        menuOpen ? (
                          <KeyboardArrowUpIcon
                            sx={{ color: "#6B7280 !important" }}
                          />
                        ) : (
                          <KeyboardArrowDownIcon
                            sx={{ color: "#6B7280 !important" }}
                          />
                        )
                      ) : null}
                    </ListItem>
                  </Link>
                </>
              ))}
            {menuList && menuList?.length === 0 && (
              <Typography p={1}>No Result&apos;s Found</Typography>
            )}
          </List>
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
