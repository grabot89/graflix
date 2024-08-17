import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const SearchBar = ({ onSearch }: { onSearch: (term: string) => void }) => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (!search) {
        setError('Search field cannot be empty');
        return;
      }
      setError(null);
      onSearch(search);
    };

    return (
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">Search Media</Typography>
            <Box component="form" onSubmit={handleSearch} sx={{ mt: 3 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="search"
                label="Search"
                name="search"
                autoComplete="search"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                Search
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    );
};

export default SearchBar;
