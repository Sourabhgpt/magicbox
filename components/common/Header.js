import * as React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Image from 'next/image';
import { redirect } from "next/dist/server/api-utils";

const Div = styled.section`
  position: fixed;
  z-index: 99999;
  top: 0;
  padding: 15px;
  width: 100%;
  background: #393e46;
  img {
    height: 40px;
  }
  h1 {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }
  svg {
    color: #fff;
  }
`;

function Header({ pageProps }) {
  const logoimg = `${process.env.NEXT_PUBLIC_BASE_URL}/img/logo.svg`;
  return (
    <Div className="header">
      <Box display="flex" alignItems="center" justifyContent="space-between">
      <Image src={logoimg} alt="Logo" width={50} height={50} />
        <Typography variant="h1">{pageProps?.page_title}</Typography>
        <IconButton>
          <CloseRoundedIcon onClick={() => window.location.href = "https://mbx-staging.getmagicbox.com/admin/dashboard.htm"}/>
        </IconButton>
      </Box>
    </Div>
  );
}

export default Header;
