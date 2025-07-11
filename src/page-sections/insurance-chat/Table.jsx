import {
  Box,
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { alpha } from "@mui/system";
import FlexBox from "components/flexbox/FlexBox";
import Scrollbar from "components/ScrollBar";
import { H5, TableContent } from "components/Typography";
import { useTranslation } from "react-i18next"; // Styled components
import AppAvatar from "components/avatars/AppAvatar";
import avatar3 from "assets/avatar-3.png";

const HeadTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 400,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: `1rem !important`,
  paddingRight: `1rem !important`,
  backgroundColor: "#FBFBFB",
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  // "&:last-of-type": {
  //   textAlign: "right",
  // },
}));
const BodyTableCell = styled(TableCell)(() => ({
  padding: "0.5rem 0",
  paddingLeft: `1rem !important`,
  paddingRight: `1rem !important`,
  fontWeight: 400,
  "&:first-of-type": {
    minWidth: 200,
  },
  "&:nth-of-type(2)": {
    minWidth: 150,
  },
  // "&:last-of-type": {
  //   textAlign: "right",
  // },
}));

export default function MyTable() {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        padding: 3,
        height: "100%",
      }}
    >
      <H5 mb={2}>{t("Popular Products")}</H5>

      <Scrollbar autoHide={false}>
        <Table>
          <TableHead>
            <TableRow>
              <HeadTableCell>Product</HeadTableCell>
              <HeadTableCell>Date</HeadTableCell>
              <HeadTableCell>Category</HeadTableCell>
              <HeadTableCell>Brand</HeadTableCell>
              <HeadTableCell>Price</HeadTableCell>
              <HeadTableCell>Status</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {courseList.map((item, index) => (
              <TableRow key={index}>
                <BodyTableCell>
                  <FlexBox alignItems="center">
                    <AppAvatar
                      alt={"avatar"}
                      src={avatar3}
                      sx={{ width: "34px", height: "34px" }}
                    />
                    <Box ml={1}>
                      <TableContent>{item.product}</TableContent>
                    </Box>
                  </FlexBox>
                </BodyTableCell>
                <BodyTableCell>{item.date}</BodyTableCell>
                <BodyTableCell>{item.category}</BodyTableCell>
                <BodyTableCell>{item.brand}</BodyTableCell>
                <BodyTableCell>${item.price}.00</BodyTableCell>

                <BodyTableCell>
                  <Chip
                    label={item.status}
                    sx={{
                      height: 24,
                      fontSize: 14.5,
                      color:
                        item.status === "Out of Stock"
                          ? "primary.red"
                          : item.status === "Available"
                          ? "primary.darkBlue"
                          : "primary.dark",
                      backgroundColor:
                        item.status === "Out of Stock"
                          ? alpha("#E95050", 0.1)
                          : item.status === "Available"
                          ? alpha("#024EA2", 0.1)
                          : alpha("#151515", 0.1),
                    }}
                  />
                </BodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
}

const courseList = [
  {
    price: 19.0,
    status: "325",
    category: "Graphic",
    product: "Flat Line Illustration",
    image: "/static/courses/1.png",
    description: "Sketch App, Adobe Illustration",
    date: "Dec 06, 2023",
    brand: "Nike",
  },
  {
    price: 45.0,
    status: "325",
    product: "React Live",
    category: "Development",
    image: "/static/courses/2.png",
    description: "Visual Studio, React",
    date: "Dec 06, 2023",
    brand: "Nike",
  },
  {
    price: 35.0,
    status: "325",
    category: "Music",
    product: "Guitar Lessons",
    description: "Squarespace",
    image: "/static/courses/3.png",
    date: "Dec 06, 2023",
    brand: "Nike",
  },
  {
    price: 34.0,
    status: "325",
    category: "Editing",
    product: "Video Editing",
    description: "After Effects",
    image: "/static/courses/4.png",
    date: "Dec 06, 2023",
    brand: "Nike",
  },
];
