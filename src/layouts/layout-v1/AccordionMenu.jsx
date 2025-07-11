import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  styled,
  useTheme,
} from "@mui/material";
import React, { useState, Children, cloneElement } from "react";
// ---------------------------------------------------
// styled components
const Accordion = styled(MuiAccordion)(({ theme }) => ({
  marginBottom: 8,
  color: theme.palette.text.disabled,
  "&:before": {
    display: "none",
  },
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&.Mui-expanded": {
    borderRadius: 4,
  },
}));

const AccordionMenu = ({
  title,
  children,
  path,
  expandedItem,
  handleChange,
  accordionHeader,
  active,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMenuItem = (path) => {
    if (path) navigate(path);
  };

  return (
    <Accordion
      square
      disableGutters
      elevation={0}
      // expanded={expandedItem === title}
      expanded={expanded}
      onChange={handleChange(title)}
      sx={{
        left: "0 !important",
      }}
    >
      <MuiAccordionSummary
        // onClick={() => handleMenuItem(path)}
        expandIcon={
          <>
            <Box
              onClick={(event) => {
                // Toggle the expanded state
                setExpanded((prevExpanded) => !prevExpanded);
              }}
              sx={{
                width: 24,
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ArrowForwardIosSharpIcon
                sx={{
                  fontSize: "1rem",
                  color: "secondary.300",
                  transform: expanded ? "rotate(180deg)" : "none",
                  // borderLeft: "1.5px solid #E1E1E1",
                  // width: 25,
                }}
              />
            </Box>
          </>
        }
        sx={{
          padding: "12px 24px",
          color: theme.palette.text.primary,
          borderRadius: 2.5,
          "&.Mui-expanded": {
            backgroundColor: theme.palette.primary.lightBlueBackground,
          },
          "& .MuiListItemButton-root": {
            padding: 0,
          },
          "& .MuiSvgIcon-root": {
            color: theme.palette.text.secondary,
          },
          "& .Mui-expanded": {
            color: theme.palette.primary.dark,
            "& .MuiSvgIcon-root": {
              color: theme.palette.primary.darkBlue,
            },
          },
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
          },
        }}
      >
        {active && (
          <Box
            sx={{
              width: "6px",
              height: "24px",
              background: theme.palette.gradient.purpletobluetobottom,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              position: "absolute",
              left: 0,
            }}
          />
        )}

        {accordionHeader}
      </MuiAccordionSummary>

      <MuiAccordionDetails
        sx={{
          padding: 0,
          backgroundColor: theme.palette.primary.lightBlueBackground,
        }}
      >
        {Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          const isActive = Boolean(child.props.active);

          return (
            <div
              key={index}
              style={{
                position: "relative",
                paddingLeft: "24px",
              }}
            >
              {isActive && (
                <Box
                  sx={{
                    width: "6px",
                    height: "24px",
                    background: theme.palette.gradient.purpletobluetobottom,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    position: "absolute",
                    left: 0,
                    top: "10px",
                  }}
                />
              )}
              {cloneElement(child, { key: index })}
            </div>
          );
        })}
      </MuiAccordionDetails>
    </Accordion>
  );
};

export default AccordionMenu;
