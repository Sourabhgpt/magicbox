import { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";
import { postCallingAPI } from "@/app/api";
import Image from 'next/image';

const Div = styled.div`
  .conetnt-boxin {
    display: block;
    border-radius: 8px;
    background: #f8f8f8;
  }
  .sidebar-select {
    label {
      transform: translate(14px, 8px);
      &.Mui-focused {
        transform: translate(14px, -9px) scale(0.75);
      }
    }
  }
`;

const RephraseContent = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [result, setResult] = useState();

  return (
    <Div>
      <Box display="flex" alignItems="center" mb={2}>
        <InfoOutlinedIcon fontSize="12px" />
        <Typography ml={1} fontSize={14}>
        Streamline Your Content Creation Process and Create Engaging Content on Any Topic with Ease!
        </Typography>
      </Box>
      <Box className="conetnt-boxin" mt={2}>
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  text: "",
                  choice:"",
                  tenant_id: 1,
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  values.choice = "key_points";
                  console.log(values);
                  try {
                    const data = await postCallingAPI(values,"getCuration");
                    if (data?.code === 200) {
                      setResult(data?.response);
                    }
                    else if (data?.response?.data?.code === 401) {
                      window.location.href = window.location.origin+"/login.htm?tenant=Magic";
                    }
                  } catch (error) {
                    console.log(error);
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  handleChange,
                  resetForm,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box minHeight="30vh">
                      {!fileUrl && (
                        <Box className="textarea-box" p={2}>
                          <Typography variant="h3" className="textarea-heading">
                            Add Content
                          </Typography>
                          <TextField
                            id="outlined-basic"
                            fullWidth
                            variant="outlined"
                            placeholder={`Enter or paste your text and press “Submit”`}
                            value={values.text}
                            required
                            name="text"
                            onChange={handleChange}
                            multiline
                            rows={20}
                            inputProps={{ maxLength: 3000 }}
                            sx={{ border: 0, outline: "none" }}
                          />
                        </Box>
                      )}
                      {fileUrl && (
                        <Box p={1}>
                          <Box
                            mr={1}
                            display="inline-flex"
                            alignItems="center"
                            sx={{
                              borderRadius: "5px",
                              border: "1px solid #CCCACA",
                              background: "#fff",
                              padding: "5px",
                            }}
                          >
                          <Image src={fileUrl} alt="image" width={30} height={30} />
                            <Typography
                              maxWidth={200}
                              whiteSpace="nowrap"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              fontSize={12}
                              mx={1}
                            >
                              {values?.upload_file?.name}
                            </Typography>
                            <IconButton
                              onClick={() => {
                                setFieldValue("upload_file", "");
                                setFileUrl(null);
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      )}
                    </Box>
                    <Box p={2} borderBottom="1px solid #8f8f8f">
                      <Box display="flex" justifyContent="space-between">
                        {values?.text?.length > 0 ? (
                          <Typography fontSize={12}>
                            {" "}
                            {values?.text?.length}/3000 Characters
                          </Typography>
                        ) : (
                          <Box>
                          </Box>
                        )}
                        <Box>
                          <Button
                            variant="outlined"
                            sx={{
                              color: "#5c15e7",
                              border: "0 !important",
                              textTransform: "capitalize",
                              outline: "none",
                            }}
                            onClick={() => {
                              resetForm();
                              setFieldValue("upload_file", "");
                              setFileUrl(null);
                              setResult(null);
                            }}
                          >
                            Reset
                          </Button>
                          <Button
                            variant="filled"
                            sx={{
                              color: "#fff",
                              border: "1px solid #5c15e7",
                              background: "#5c15e7",
                              borderRadius: "30px",
                              textTransform: "capitalize",
                              outline: "none",
                            }}
                            className="blue-btn"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </form>
                )}
              </Formik>
            </Grid>
            <Grid item xs={12}>
              <Box p={2}>
              <Box minHeight="25vh" className="result-box">
                  {result && result ? (
                    <>
                      <Typography mb={2} fontWeight={600}>
                        AI generated result
                      </Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: result?.replaceAll("\n", "</br>"),
                        }}
                      />
                    </>
                  ) : (
                    <Typography className="placeholder-text">
                      AI generated result will appear here
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Div>
  );
};

export default RephraseContent;
