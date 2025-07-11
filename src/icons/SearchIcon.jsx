import { SvgIcon } from "@mui/material";

const SearchIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#B187FF", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#5C92D2", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient)"
        d="M20.85,19.44l-4-4a2.44,2.44,0,0,0-.43-.35l-1-.69h0A7,7,0,1,0,10,17a7,7,0,0,0,4.37-1.53h0l.75,1a2.6,2.6,0,0,0,.3.36l4,4a.5.5,0,0,0,.71,0l.7-.7A.5.5,0,0,0,20.85,19.44ZM10,15a5,5,0,1,1,5-5A5,5,0,0,1,10,15Z"
      />
    </SvgIcon>
  );
};

export default SearchIcon;
