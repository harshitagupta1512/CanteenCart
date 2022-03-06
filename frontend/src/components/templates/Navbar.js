import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();

  let user = localStorage.getItem("usertype");

  if (user === "V") {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/vendor/profile")}>
              Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/vendor/menu")}>
              Food Menu
            </Button>
            <Button color="inherit" onClick={() => navigate("/vendor/orders")}>
              Orders
            </Button>
            <Button color="inherit" onClick={() => navigate("/vendor/stats")}>
              Statistics
            </Button>
            <Button color="inherit" onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}>
              LOGOUT
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  if (user == "B") {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/buyer/profile")}>
              Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/buyer/wallet")}>
              Wallet
            </Button>
            <Button color="inherit" onClick={() => navigate("/buyer/menu")}>
              Food Menu
            </Button>
            <Button color="inherit" onClick={() => navigate("/buyer/favs")}>
              Favorites
            </Button>
            <Button color="inherit" onClick={() => navigate("/buyer/myorders")}>
              My Orders
            </Button>
            <Button color="inherit" onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}>
              LOGOUT
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

};

export default Navbar;
