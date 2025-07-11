import { Box, styled } from "@mui/material";
import clsx from "clsx";
const StyledBox = styled(Box)(({ ellipsis }) => ({
  ...(ellipsis && {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  }),
}));
export const H0 = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={44}
      component="h1"
      fontWeight={700}
      lineHeight={1.4}
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const H1 = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={36}
      component="h1"
      fontWeight={600}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const H2 = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={22}
      component="h2"
      fontWeight={700}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const H3 = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={18.5}
      component="h3"
      fontWeight={600}
      color="#151515"
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const H4 = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={19}
      component="h4"
      fontWeight={700}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const ButtonText = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={15}
      component="h5"
      // lineHeight={1}
      whiteSpace={"nowrap"}
      fontWeight={500}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const H5 = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={17}
      component="h5"
      lineHeight={1.5}
      fontWeight={600}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const H6 = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={15.5}
      component="h6"
      fontWeight={500}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const H7 = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={15}
      component="h7"
      fontWeight={500}
      ellipsis={ellipsis ? 1 : 0}
      color="text.secondary"
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const H8 = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={16}
      component="h8"
      fontWeight={500}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const Paragraph = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={16}
      component="p"
      fontWeight={500}
      ellipsis={ellipsis ? 1 : 0}
      color="#808187"
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const TableContent = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={15}
      component="p"
      fontWeight={500}
      ellipsis={ellipsis ? 1 : 0}
      whiteSpace={"nowrap"}
      // color="text.disabled"
      color="#808187"
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const Small = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={14.5}
      component="small"
      fontWeight={400}
      lineHeight={1.6}
      color={"#151515"}
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const Span = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={14.5}
      fontWeight={600}
      component="span"
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
export const Tiny = (props) => {
  const { ellipsis, children, className, ...others } = props;
  return (
    <StyledBox
      fontSize={14}
      fontWeight={500}
      lineHeight={1.55}
      color={"#808187"}
      component="p"
      ellipsis={ellipsis ? 1 : 0}
      className={clsx({
        [className || ""]: true,
      })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
