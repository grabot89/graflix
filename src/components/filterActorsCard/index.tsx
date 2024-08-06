import React, { ChangeEvent } from "react";
import { ActorFilterOption } from "../../types/interfaces";
import { Checkbox, FormControlLabel, SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterActorsCardProps {
  onUserInput: (type: ActorFilterOption, value: string | boolean) => void;
  nameFilter: string;
  adultFilter: boolean;
  genderFilter: string;
}

const FilterActorsCard: React.FC<FilterActorsCardProps> = ({ nameFilter, adultFilter, genderFilter, onUserInput }) => {
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUserInput("name", e.target.value);
  };

  const handleAdultChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUserInput("adult", e.target.checked);
  };

  const handleGenderChange = (e: SelectChangeEvent<string>) => {
    onUserInput("gender", e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the actors.
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={nameFilter}
            variant="filled"
            onChange={handleTextChange}
          />
          <FormControlLabel
            control={<Checkbox checked={adultFilter} onChange={handleAdultChange} />}
            label="Adult"
          />
          <FormControl sx={styles.formControl}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender-select"
              value={genderFilter}
              onChange={handleGenderChange}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="2">Male</MenuItem>
              <MenuItem value="1">Female</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the actors.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterActorsCard;
