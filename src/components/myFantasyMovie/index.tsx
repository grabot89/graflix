import React, { useState, useEffect } from "react";
import { getMovieGenres } from "../../api/tmdb-api";
import { Genre } from "../../types/interfaces";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material";

const MyFantasyMovie: React.FC = () => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [runtime, setRuntime] = useState<number | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [productionCompanies, setProductionCompanies] = useState<string[]>([]);
  const [poster, setPoster] = useState<File | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData = await getMovieGenres();
        // Ensure genreData.genres is an array
        if (Array.isArray(genreData.genres)) {
          setGenres(genreData.genres);
          console.log("Genres fetched:", genreData.genres);
        } else {
          console.error("Genres data is not an array:", genreData.genres);
        }
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[];
    setSelectedGenres(value);
  };

  const handleProductionCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductionCompanies(e.target.value.split(",").map((company) => company.trim()));
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPoster(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMovie = {
      id: Date.now(), //These aren't real movies, so just create a fake ID
      title,
      overview,
      release_date: releaseDate,
      runtime,
      genre_ids: selectedGenres,
      production_companies: productionCompanies,
      poster: poster ? URL.createObjectURL(poster) : null,
    };

    const storedMovies = JSON.parse(localStorage.getItem("fantasyMovies") || "[]");
    storedMovies.push(newMovie);
    localStorage.setItem("fantasyMovies", JSON.stringify(storedMovies));

    setTitle("");
    setOverview("");
    setReleaseDate("");
    setRuntime(null);
    setSelectedGenres([]);
    setProductionCompanies([]);
    setPoster(null);

    toast.success("Movie created successfully!");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a New Fantasy Movie
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Overview"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              multiline
              rows={4}
              fullWidth
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Release Date"
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Runtime (minutes)"
              type="number"
              value={runtime || ""}
              onChange={(e) => setRuntime(Number(e.target.value))}
              fullWidth
              required
            />
          </Box>
          <Box mb={3}>
            <FormControl fullWidth required>
              <InputLabel id="genres-label">Genres</InputLabel>
              <Select
                labelId="genres-label"
                id="genres"
                multiple
                value={selectedGenres}
                onChange={handleGenreChange}
                input={<OutlinedInput id="select-multiple-chip" label="Genres" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={genres?.find((g) => g.id === value)?.name || "Unknown"}
                      />
                    ))}
                  </Box>
                )}
              >
                {Array.isArray(genres) && genres.length > 0 ? (
                  genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No genres available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
          <Box mb={3}>
            <TextField
              label="Production Companies (comma-separated)"
              onChange={handleProductionCompanyChange}
              fullWidth
              required
            />
          </Box>
          <Box mb={3}>
            <Button variant="contained" component="label" fullWidth>
              Upload Poster
              <input type="file" accept="image/*" hidden onChange={handlePosterChange} />
            </Button>
          </Box>
          <Box mt={4}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Fantasy Movie
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default MyFantasyMovie;