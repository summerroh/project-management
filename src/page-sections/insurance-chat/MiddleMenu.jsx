import { Box, Button, Grid, useTheme } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import { H5, H6 } from "components/Typography";
import { Plus } from "lucide-react";

export default function MiddleMenu({ title }) {
  const theme = useTheme();

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.white,
          padding: "0 1rem",
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid #E1E1E1`,
        }}
      >
        <FlexBox gap={0.6} style={{ cursor: "pointer" }}>
          <FlexRowAlign
            gap={1}
            sx={{
              justifyContent: "flex-start",
              width: "100%",
              alignItems: "center",
            }}
          >
            <H5>{title}</H5>
          </FlexRowAlign>
        </FlexBox>

        <Button
          variant="contained"
          size="small"
          startIcon={<Plus size={16} />}
          sx={{
            backgroundColor: theme.palette.primary.darkBlue,
            "&:hover": { backgroundColor: theme.palette.primary.darkBlueHover },
          }}
        >
          Input
        </Button>
      </Box>
    </Grid>
  );
}
