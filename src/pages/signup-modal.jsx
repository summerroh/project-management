import { useState } from "react";

import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  useMediaQuery,
} from "@mui/material";
import naver from "assets/fab-naver.png";
import IconX from "assets/icon-close-modal.svg";
import AppCheckBox from "components/AppCheckBox";
import MySelect from "components/MySelect";
import { H5, H6, TableContent } from "components/Typography";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import { useFormik } from "formik";
import * as Yup from "yup"; // styled components
import TermsModalButton from "./terms-modal";

import arcticFox from "assets/personacon/arctic-fox.png";
import axolotl from "assets/personacon/axolotl.png";
import cat from "assets/personacon/cat.png";
import cat2 from "assets/personacon/cat2.png";
import chameleon from "assets/personacon/chameleon.png";
import dog from "assets/personacon/dog.png";
import dog2 from "assets/personacon/dog2.png";
import frog from "assets/personacon/frog.png";
import giantPanda from "assets/personacon/giant-panda.png";
import gorilla from "assets/personacon/gorilla.png";
import hamster from "assets/personacon/hamster.png";
import jaguar from "assets/personacon/jaguar.png";
import rabbit from "assets/personacon/rabbit.png";
import rat from "assets/personacon/rat.png";
import redPanda from "assets/personacon/red-panda.png";
import seaLion from "assets/personacon/sea-lion.png";
import snowLeopard from "assets/personacon/snow-leopard.png";
import turtle from "assets/personacon/turtle.png";
import whaleSharke from "assets/personacon/whale-sharke.png";
import porpoise from "assets/personacon/yangtze-porpoise.png";
import Personacon from "components/Personacon";

function SignupModal({ open, setShowSignupModal }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = window.innerWidth > 1720;

  const [selectedPersonacon, setSelectedPersonacon] = useState(null);

  const personaconList = [
    rabbit,
    axolotl,
    cat,
    cat2,
    dog,
    dog2,
    frog,
    giantPanda,
    gorilla,
    hamster,
    arcticFox,
    rat,
    redPanda,
    seaLion,
    whaleSharke,
    snowLeopard,
    turtle,
    porpoise,
    jaguar,
    chameleon,
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : "44%",
    maxHeight: "90vh", // Set max height for scroll
    overflowY: "auto", // Enable vertical scroll if content overflows
    bgcolor: "background.paper",
    border: "1px solid #E1E1E1",
    // boxShadow: 24,
    p: 4,
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
    setShowSignupModal(false);
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
            <img
              onClick={() => setShowSignupModal(false)}
              src={IconX}
              style={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
                position: "absolute",
                top: "22px",
                right: "22px",
              }}
            />
            <Box
              mt={3}
              mb={6}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <H5>회원 가입</H5>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TableContent mb={1}>
                    고객 분류
                    <span style={{ color: theme.palette.primary.red }}> *</span>
                  </TableContent>

                  <FlexBox
                    gap={2.5}
                    mt={2}
                    sx={{
                      display: "flex",
                      direction: "row",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                    >
                      <AppCheckBox label={"개인사업자"} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                    >
                      <AppCheckBox label={"설계사"} />
                    </Box>
                  </FlexBox>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TableContent mb={1}>
                    SNS 로그인
                    <span style={{ color: theme.palette.primary.red }}> *</span>
                  </TableContent>

                  <Grid item width={isMobile ? "100%" : 250}>
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
                        backgroundColor: "primary.naver",
                        "&:hover": {
                          backgroundColor: "primary.naver",
                        },
                      }}
                    >
                      <img
                        src={naver}
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "8px",
                        }}
                      />
                      네이버 로그인
                    </Button>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <TableContent mb={1}>
                    퍼스나콘 선택
                    <span style={{ color: theme.palette.primary.red }}> *</span>
                  </TableContent>

                  <FlexRowAlign
                    mb={1.5}
                    gap={isLargeScreen ? 3 : 2}
                    sx={{
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      alignContent: "flex-start",
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    {personaconList.map((personacon, index) => {
                      return (
                        <Personacon
                          key={index}
                          src={personacon}
                          index={index}
                          setSelectedPersonacon={setSelectedPersonacon}
                          selectedPersonacon={selectedPersonacon}
                        />
                      );
                    })}
                  </FlexRowAlign>
                </Grid>

                {/* <Grid
                  container
                  item
                  xs={12}
                  // spacing={2}
                  rowGap={2}
                  padding={0}
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    justifyContent: "space-between",
                    backgroundColor: "red",
                  }}
                >
                  {personaconList.map((personacon, index) => {
                    return (
                      <Grid
                        key={index}
                        item
                        xs={3}
                        sm={4}
                        md={2}
                        lg={1}
                        xl={1.5}
                      >
                        <Personacon
                          src={personacon}
                          index={index}
                          setSelectedPersonacon={setSelectedPersonacon}
                          selectedPersonacon={selectedPersonacon}
                        />
                      </Grid>
                    );
                  })}
                </Grid> */}

                <Grid item sm={6} xs={12}>
                  <TableContent mb={1}>
                    이메일
                    <span style={{ color: theme.palette.primary.red }}> *</span>
                  </TableContent>
                  <AppTextField
                    fullWidth
                    name="fullName"
                    placeholder="이메일을 입력해 주세요"
                    value={values.fullName}
                    onChange={handleChange}
                    error={Boolean(touched.fullName && errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
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
                <Grid item sm={6} xs={12}>
                  {!isMobile && (
                    <TableContent mb={1}>
                      <span style={{ color: "#ffffff" }}> *</span>
                    </TableContent>
                  )}
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <FlexRowAlign
                      gap={2}
                      alignItems={"center"}
                      justifyContent={"center"}
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
                <Grid item sm={6} xs={12}>
                  <TableContent mb={1}>
                    이름
                    <span style={{ color: theme.palette.primary.red }}> *</span>
                  </TableContent>
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
                <Grid item sm={6} xs={12}>
                  <TableContent mb={1}>
                    아이디
                    <span style={{ color: theme.palette.primary.red }}> *</span>
                  </TableContent>
                  <AppTextField
                    fullWidth
                    name="country"
                    placeholder="영문 소문자/숫자, 4~16자"
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
                <Grid item sm={6} xs={12}>
                  <TableContent mb={1}>
                    비밀번호
                    <span style={{ color: theme.palette.primary.red }}> *</span>
                  </TableContent>
                  <AppTextField
                    fullWidth
                    name="state"
                    placeholder="영문 대소문자/숫자/특수문자 중 2가지, 10~16자"
                    value={values.state}
                    onChange={handleChange}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
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
                <Grid item sm={6} xs={12}>
                  <TableContent mb={1}>
                    비밀번호 확인
                    <span style={{ color: theme.palette.primary.red }}> *</span>
                  </TableContent>
                  <AppTextField
                    fullWidth
                    name="city"
                    placeholder="비밀번호를 한번 더 입력해 주세요"
                    value={values.city}
                    onChange={handleChange}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
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

                <Grid item sm={6} xs={12}>
                  <TableContent mb={1}>
                    휴대전화
                    <span style={{ color: theme.palette.primary.red }}> *</span>
                  </TableContent>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <FlexRowAlign gap={2}>
                      <MySelect
                        items={["010", "001", "011"]}
                        width={"100%"}
                        height={"50px"}
                      />

                      <AppTextField
                        fullWidth
                        name="email"
                        placeholder=""
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
                      <AppTextField
                        fullWidth
                        name="email"
                        placeholder=""
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
                    </FlexRowAlign>
                  </Box>
                </Grid>

                <Grid item sm={6} xs={12}>
                  {!isMobile && (
                    <TableContent mb={1}>
                      <span style={{ color: "#ffffff" }}> *</span>
                    </TableContent>
                  )}
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <FlexRowAlign
                      gap={2}
                      alignItems={"center"}
                      justifyContent={"center"}
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

                <Grid item sm={12} xs={12}>
                  <Grid item sm={6} xs={12}>
                    <TableContent mb={1}>주소</TableContent>
                    <FlexRowAlign gap={2}>
                      <AppTextField
                        fullWidth
                        name="address"
                        placeholder="주소를 검색해 주세요"
                        value={values.address}
                        onChange={handleChange}
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
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
                          width: 100,
                          borderRadius: 2,
                        }}
                      >
                        검색
                      </Button>
                    </FlexRowAlign>
                  </Grid>
                </Grid>
                <Divider
                  style={{
                    width: "100%",
                    marginTop: "50px",
                  }}
                />

                <Grid item xs={12}>
                  <FlexBox
                    gap={1}
                    mt={2}
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "flex-start" : "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                    >
                      <AppCheckBox label={"전체"} />
                      <TableContent
                        ml={1}
                        style={{
                          color: theme.palette.primary.dark,
                          whiteSpace: "normal",
                        }}
                      >
                        [전체 동의] 이용약관 및 개인정보수집 및 이용, 쇼핑정보
                        수신 (선택)에 모두 동의합니다.
                      </TableContent>
                    </Box>
                  </FlexBox>
                </Grid>

                <Grid item xs={12}>
                  <FlexBox
                    gap={1}
                    mt={2}
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "flex-start" : "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                    >
                      <AppCheckBox />
                      <TableContent ml={1}>
                        이용약관 동의 (필수){" "}
                        <span style={{ color: theme.palette.primary.red }}>
                          *
                        </span>
                      </TableContent>
                    </Box>
                    <Box
                      ml={isMobile ? 3.5 : 0}
                      sx={{
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                    >
                      <TermsModalButton />
                    </Box>
                  </FlexBox>
                </Grid>

                <Grid item xs={12}>
                  <FlexBox
                    gap={1}
                    mt={2}
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "flex-start" : "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                    >
                      <AppCheckBox />
                      <TableContent ml={1}>
                        개인정보처리방침 동의 (필수)
                        <span style={{ color: theme.palette.primary.red }}>
                          *
                        </span>
                      </TableContent>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                    >
                      <TermsModalButton />
                    </Box>
                  </FlexBox>
                </Grid>

                <Grid item xs={12}>
                  <FlexBox
                    gap={1}
                    mt={2}
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "flex-start" : "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                    >
                      <AppCheckBox label={"쇼핑정보 수신 동의 (선택)"} />
                    </Box>
                    <Box
                      ml={isMobile ? 3.5 : 0}
                      sx={{
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                    >
                      <TermsModalButton />
                    </Box>
                  </FlexBox>
                </Grid>

                <Grid item xs={12}>
                  <FlexBox
                    ml={3.5}
                    gap={1}
                    mt={2}
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "flex-start" : "center",
                      // justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                    >
                      <AppCheckBox label={"SMS 수신 동의 (선택)"} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                    >
                      <AppCheckBox label={" 이메일 수신 동의 (선택)"} />
                    </Box>
                  </FlexBox>
                </Grid>

                <Divider
                  style={{
                    width: "100%",
                    marginTop: "30px",
                    marginBottom: "20px",
                  }}
                />

                <Grid
                  ml={0}
                  mt={1}
                  container
                  item
                  xs={12}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{ width: "100%" }}
                  spacing={2}
                >
                  <Grid item width={isMobile ? "100%" : 250}>
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
                      회원가입
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

const SignupModalButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log("modal close");
    // setOpen(false);
  };

  return (
    <div>
      <H6
        fontWeight={600}
        onClick={handleOpen}
        style={{ cursor: "pointer", whiteSpace: "nowrap" }}
      >
        {/* <NavLink to={`/signup`} style={{ color: "#151515" }}> */}
        회원가입
        {/* </NavLink> */}
      </H6>
      <SignupModal open={open} onClose={handleClose} />
    </div>
  );
};

export default SignupModal;
