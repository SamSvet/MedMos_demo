import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Avatar, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

export const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const [personName, setPersonName] = React.useState<string[]>(["RU"]);

  const countries: readonly CountryType[] = React.useMemo(
    () => [
      {
        code: "US",
        label: t("language.us.value"),
        phone: "1",
        suggested: true,
      },
      { code: "RU", label: t("language.ru.value"), phone: "7" },
    ],
    [t],
  );

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
    if (typeof value === "string") {
      i18n.changeLanguage(value.toLowerCase());
    }
  };

  return (
    <FormControl sx={{ "& fieldset": { border: "none" } }}>
      {/* <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> */}
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        size="small"
        value={personName}
        sx={{ height: "100%" }}
        onChange={handleChange}
        // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          // <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          //   {selected.map((value) => (
          //     <Chip key={value} label={value} />
          //   ))}
          // </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Avatar
                sx={{ "& > img": { height: 24 } }}
                variant="square"
                alt={value}
                key={value}
                // srcSet={`https://flagcdn.com/w40/${value.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w80/${value.toLowerCase()}.png`}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {countries.map((country) => (
          <MenuItem
            key={country.code}
            value={country.code}
            sx={{ "& > img": { mr: 1, flexShrink: 0 } }}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
              alt=""
            />
            <ListItemText primary={country.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
