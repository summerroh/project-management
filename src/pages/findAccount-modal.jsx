import React, { useEffect, useState } from "react";

import { useTheme } from "@emotion/react";
import { Box, Button, Card, Grid, useMediaQuery, Modal } from "@mui/material";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import { H5, H6, Small, TableContent, Tiny } from "components/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import MySelect from "components/MySelect";
import { set } from "lodash";

export default function FindAccountModal({ open, setShowModal }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedTab, setSelectedTab] = useState("아이디 찾기");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : "34%",
    maxHeight: "90vh", // Set max height for scroll
    overflowY: "auto", // Enable vertical scroll if content overflows
    bgcolor: "background.paper",
    border: "1px solid #E1E1E1",
    p: isMobile ? 2 : 4,
    py: isMobile ? 4 : 5,
    scrollbarWidth: "thin", // Firefox
    "&::-webkit-scrollbar": {
      width: "0.4em", // Adjust the width as needed
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent", // Hide scrollbar thumb
    },
  };

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    zip: "",
    about: "",
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Name is Required!"),
    email: Yup.string().email().required("Email is Required!"),
    phone: Yup.number().min(8).required("Phone is Required!"),
    country: Yup.string().required("Country is Required!"),
    state: Yup.string().required("State is Required!"),
    city: Yup.string().required("City is Required!"),
    address: Yup.string().required("Address is Required!"),
    zip: Yup.string().required("Zip is Required!"),
    about: Yup.string().required("About is Required!"),
  });
  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
  });

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={style}>
            <Grid
              mb={6}
              p={1}
              container
              sx={{ backgroundColor: "#F0F0F0", borderRadius: 3 }}
            >
              <Grid
                item
                xs={6}
                py={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    selectedTab === "아이디 찾기" ? "#ffffff" : "none",
                  borderRadius: 3,
                  cursor: "pointer",
                }}
                onClick={() => setSelectedTab("아이디 찾기")}
              >
                <H5>아이디 찾기</H5>
              </Grid>
              <Grid
                item
                xs={6}
                py={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    selectedTab === "비밀번호 찾기" ? "#ffffff" : "none",
                  borderRadius: 3,
                  cursor: "pointer",
                }}
                onClick={() => setSelectedTab("비밀번호 찾기")}
              >
                <H5>비밀번호 찾기</H5>
              </Grid>
            </Grid>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TableContent mb={1}>이름</TableContent>
                  <AppTextField
                    fullWidth
                    name="phone"
                    placeholder="이름을 입력해 주세요"
                    value={values.phone}
                    onChange={handleChange}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                    sx={{
                      "& .MuiOutlinedInput-input::placeholder": {
                        fontWeight: 300,
                        fontSize: 15.5,
                        color: "#B5B7C0",
                      },
                    }}
                    inputProps={{ style: { height: 18 } }}
                  />
                </Grid>

                {selectedTab === "비밀번호 찾기" && (
                  <Grid item xs={12}>
                    <TableContent mb={1}>아이디</TableContent>
                    <AppTextField
                      fullWidth
                      name="country"
                      placeholder="아이디를 입력해 주세요"
                      value={values.country}
                      onChange={handleChange}
                      error={Boolean(touched.country && errors.country)}
                      helperText={touched.country && errors.country}
                      sx={{
                        "& .MuiOutlinedInput-input::placeholder": {
                          fontWeight: 300,
                          fontSize: 15.5,
                          color: "#B5B7C0",
                        },
                      }}
                      inputProps={{ style: { height: 18 } }}
                    />
                  </Grid>
                )}

                <Grid item xs={12} mt={2}>
                  <TableContent mb={1}>이메일</TableContent>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <FlexRowAlign
                      gap={2}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{ width: "100%" }}
                    >
                      <AppTextField
                        fullWidth
                        name="fullName"
                        placeholder="이메일을 입력해 주세요"
                        value={values.fullName}
                        onChange={handleChange}
                        error={Boolean(touched.fullName && errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-input::placeholder": {
                            fontWeight: 300,
                            fontSize: 15.5,
                            color: "#B5B7C0",
                          },
                        }}
                        inputProps={{ style: { height: 18 } }}
                      />
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          fontSize: 16.5,
                          fontWeight: 400,
                          width: 120,
                          borderRadius: 2,
                          whiteSpace: "nowrap",
                        }}
                      >
                        인증요청
                      </Button>
                    </FlexRowAlign>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <FlexRowAlign
                      gap={2}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{ width: "100%" }}
                    >
                      <AppTextField
                        fullWidth
                        name="email"
                        placeholder="인증번호를 입력해 주세요"
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{
                          "& .MuiOutlinedInput-input::placeholder": {
                            fontWeight: 300,
                            fontSize: 15.5,
                            color: "#B5B7C0",
                          },
                        }}
                        inputProps={{ style: { height: 18 } }}
                      />
                      <TableContent>3:00</TableContent>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          fontSize: 16.5,
                          fontWeight: 400,
                          width: 100,
                          borderRadius: 2,
                        }}
                      >
                        인증
                      </Button>
                    </FlexRowAlign>
                  </Box>
                </Grid>

                <Grid item xs={12} mt={2}>
                  <TableContent mb={1}>휴대전화</TableContent>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <FlexRowAlign gap={2} sx={{ width: "100%" }}>
                      <MySelect
                        items={["SKT", "KT", "LG"]}
                        width={"150px"}
                        height={"50px"}
                      />

                      <AppTextField
                        fullWidth
                        name="phoneNumber"
                        placeholder=""
                        value={values.phoneNumber}
                        onChange={handleChange}
                        error={Boolean(
                          touched.phoneNumber && errors.phoneNumber
                        )}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                        sx={{
                          "& .MuiOutlinedInput-input::placeholder": {
                            fontWeight: 300,
                            fontSize: 15.5,
                            color: "#B5B7C0",
                          },
                        }}
                        inputProps={{ style: { height: 18 } }}
                      />
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          fontSize: 16.5,
                          fontWeight: 400,
                          width: 150,
                          borderRadius: 2,
                          whiteSpace: "nowrap",
                        }}
                      >
                        인증요청
                      </Button>
                    </FlexRowAlign>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <FlexRowAlign
                      gap={2}
                      alignItems={"center"}
                      justifyContent={"center"}
                      width={"100%"}
                    >
                      <AppTextField
                        fullWidth
                        name="email"
                        placeholder="인증번호를 입력해 주세요"
                        value={values.phoneNumberCode}
                        onChange={handleChange}
                        error={Boolean(
                          touched.phoneNumberCode && errors.phoneNumberCode
                        )}
                        helperText={
                          touched.phoneNumberCode && errors.phoneNumberCode
                        }
                        sx={{
                          "& .MuiOutlinedInput-input::placeholder": {
                            fontWeight: 300,
                            fontSize: 15.5,
                            color: "#B5B7C0",
                          },
                        }}
                        inputProps={{ style: { height: 18 } }}
                      />
                      <TableContent>3:00</TableContent>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          fontSize: 16.5,
                          fontWeight: 400,
                          width: 100,
                          borderRadius: 2,
                        }}
                      >
                        인증
                      </Button>
                    </FlexRowAlign>
                  </Box>
                </Grid>

                <Grid
                  ml={0}
                  mt={3}
                  container
                  xs={12}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{ width: "100%" }}
                  spacing={2}
                >
                  <Grid item xs={12} sm={6} sx={{ order: isMobile ? 2 : 0 }}>
                    <Button
                      // type="submit"
                      variant="outlined"
                      size="small"
                      onClick={() => setShowModal(false)}
                      sx={{
                        fontSize: 15.5,
                        fontWeight: 500,
                        borderRadius: 2,
                        minWidth: isMobile ? "100%" : 240,
                        width: isMobile ? "100%" : 240,
                        borderRadius: 2,
                      }}
                    >
                      취소
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ order: isMobile ? 1 : 0 }}>
                    <Button
                      // type="submit"
                      variant="contained"
                      size="small"
                      sx={{
                        fontSize: 15.5,
                        fontWeight: 500,
                        borderRadius: 2,
                        minWidth: isMobile ? "100%" : 240,
                        width: isMobile ? "100%" : 240,
                        borderRadius: 2,
                        backgroundColor: "primary.darkBlue",
                        "&:hover": {
                          backgroundColor: "primary.darkBlueHover",
                        },
                      }}
                    >
                      {selectedTab === "아이디 찾기"
                        ? "아이디 찾기"
                        : "비밀번호 찾기"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
}
