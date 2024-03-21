import { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Formik } from "formik";
import { postCallingAPI } from "@/app/api";
import Select from "@mui/material/Select";

const CreateTestPaper = () => {
  const [bloomTaxonamy, setbloomTaxonamy] = useState("applying");
  const [questionType, setQuestionType] = useState("single_choice");
  const [result, setResult] = useState();

  const handleTaxonamyChange = (event) => {
    setbloomTaxonamy(event.target.value);
  };

  const handleSelectChange = (event) => {
    setQuestionType(event.target.value);    
  };

  useEffect(() => {
    document.body.classList.add("home");
    return () => {
      document.body.classList.remove("home");
    };
  }, []);

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <InfoOutlinedIcon fontSize="12px" />
        <Typography ml={1} fontSize={14}>
          Effortlessly Create Assessments on Any Topic
        </Typography>
      </Box>
      <Box className="conetnt-boxin" mt={2}>
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  text: "",
                  objective: "",
                  taxonomy:bloomTaxonamy,
                  question_type: questionType,
                  tenant_id: 1,
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  values.taxonomy = bloomTaxonamy;
                  values.question_type = questionType;
                  console.log(values);
                  try {
                    const data = await postCallingAPI(values,"GenAssessment");
                    console.log(data?.response);
                    if (data?.response?.data?.code === 401) {
                      window.location.href = window.location.origin+"/login.htm?tenant=Magic";
                    } else if (data?.code === 200) {
                      setResult(data?.response);
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
                    <Box minHeight="20vh">
                      {(
                        <Box className="textarea-box" p={2}>
                          <Typography variant="h3" className="textarea-heading">
                            Add Content
                          </Typography>
                          <TextField
                            id="outlined-basic"
                            fullWidth
                            variant="outlined"
                            placeholder={`Enter or paste your text and press "Submit"`}
                            value={values.text}
                            required
                            name="text"
                            onChange={handleChange}
                            multiline
                            rows={15}
                            inputProps={{ maxLength: 3000 }}
                            sx={{ border: 0, outline: "none" }}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box px={2} py={1}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Typography className="textarea-heading" mb={1}>
                            Learning Objective
                          </Typography>
                          <FormControl>
                          <TextField
                            id="outlined-basic"
                            fullWidth
                            variant="outlined"
                            placeholder={`Enter Text`}
                            value={values.objective}
                            onChange={handleChange}
                            required
                            name="objective"
                            size="small"                  
                            sx={{ border: 0, outline: "none" }}
                          />
                          </FormControl>
                        </Grid>
                        <Grid item md={3} sm={4}>
                          <Typography className="textarea-heading" mb={1}>
                          Bloom Taxonamy
                          </Typography>
                          <FormControl fullWidth className="sidebar-select">
                            <InputLabel id="demo-simple-select-label">
                              Select Choice
                            </InputLabel>
                            <Select
                              id="demo-simple-select"
                              value={bloomTaxonamy}
                              label="Select Choice"
                              size="small"
                              onChange={handleTaxonamyChange}
                            >
                              <MenuItem value="applying">
                                Applying
                              </MenuItem>
                              <MenuItem value="understanding">
                                Understanding
                              </MenuItem>
                              <MenuItem value="remembering">
                                Remembering
                              </MenuItem>
                              <MenuItem value="analysing">
                              Analyzing
                              </MenuItem>
                              <MenuItem value="evaluating">
                              Evaluating
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={3} sm={4}>
                          <Typography className="textarea-heading" mb={1}>
                          Question Type 
                          </Typography>
                          <FormControl fullWidth className="sidebar-select">
                            <InputLabel id="demo-simple-select-label">
                              Select Choice
                            </InputLabel>
                            <Select
                              id="demo-simple-select"
                              value={questionType}
                              label="Select Choice"
                              size="small"
                              onChange={handleSelectChange}
                            >
                              <MenuItem value="single_choice">
                                Single Choice
                              </MenuItem>
                              <MenuItem value="multiple_choice">
                                Multiple Choice
                              </MenuItem>
                              <MenuItem value="fill_in_blanks">
                                Fill in the blank
                              </MenuItem>
                              <MenuItem value="true_false">True/False</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box p={2} className="border-bottom">
                      <Box display="flex" justifyContent="space-between">
                        {values?.text?.length > 0 ? (
                          <Typography fontSize={12}>
                            {values?.text?.length}/3000 Characters
                          </Typography>
                        ) : (
                          <Box>
                          </Box>
                        )}
                        <Box>
                          <Button
                            variant="outlined"
                            className="reset-btn"
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
                            className="blue-btn"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Generate Questions
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
                          __html: result?.replaceAll("\n\n", "</br></br>"),
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
    </Box>
  );
};

export default CreateTestPaper;
