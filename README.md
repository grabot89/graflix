# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list



---
# H.Dip in Computer Science - Full Stack Development 2 (Movie App "Graflix")

- **Student Number:** 20104297
- **Name:** Grainne Moran
- **Video:** [https://youtu.be/AJqX59JAPgg](https://youtu.be/AJqX59JAPgg)
- **Git:** [https://github.com/grabot89/graflix](https://github.com/grabot89/graflix)
- **Deployed URL:** [https://graflix.vercel.app/](https://graflix.vercel.app/)

## Features:

### Theme (Independent Learner)
- I adapted the original application and changed the colour scheme.
- For any pages with new form fields, I adapted the style of the original changes from the filter form.

### UI

#### List Views:
- Upcoming Movies
- Top Movies (new)
- Popular Movies (new)
- Discover TV Shows (new)
- Popular Actors (new)
- Favourite Movies
- Favourite TV Shows (new)
- Favourite Actors (new)
- Anniversary Movie (new)

#### Detail Views:
- Movie Detail View
- TV Show View (new)
- Actor View/Bio (new)

#### Extensive Data Hyperlinking:
- 20 plus routes comprising of login, logout, multiple pages for movies, TV shows and actors, playlists, favourites, search, and My fantasy record.

#### Pagination:
- Pagination present on list views on multiple pages with default eight results per page.
- Search page has pagination with default four results per page for movies, actors, and TV shows.

### Routing
- Data hyperlinking present for many pages (see above).
- Multiple new parameterised URLs:
  - Playlists, TV shows, actors, movies, reviews.
- Basic authentication using Supabase.
- Public and Private Routes Present:
  - **Private:**
    - Favourite Movies Page
    - Playlist Movies Page
    - Favourite Actors Page
    - Favourite TV Shows Page
    - Anniversary Page
    - Playlist Page
    - Playlist Movies Page
    - Fantasy Movies Page

#### Premium Functionality:
- Add to themed playlist is only accessible if logged in; otherwise, the button is hidden.

### Data Model
- Additional Data Entities:
  - BaseActorsProps
  - BaseTvShowProps
  - BaseTVShowlistProps
  - BaseMediaProps, and more.

#### Server State Caching:
- Present on list views.

### Functionality
- Favourite Actors (Following)
- Favourite TV Shows
- Search – searches within movies, TV shows, and actors, and retrieves all results on one page with four items per page to improve readability of the page.
- My Fantasy Movie Record – Can create a fantasy movie record that exists in local storage, since TMDB does not have a POST to create new movie records.
- Additional filtering criteria – filter by Quality in movie list pages, to see movie scores between 1 - 10.

### Other Features:
- Login
- Signup
- 3rd Party Authentication using Supabase
- Anniversary Movie (Cake icon) – This chooses a random year and constructs a date using today’s day and month. This displays movies from the year on this day in history.
- Fuzzy Matching Search using fuse.js in filter forms for movies, TV shows, and actors, searching on title for movies and name for TV shows and actors.
- Deployment using Vercel.
- Local storage persistence.
- Toast messages throughout the app using react-toastify.
- Storybook support - extra storybooks added for new components.
- Themed Playlists – can add to themed playlists, a playlist is created based on the movie’s genres, can view all playlists through playlists page, including original personal playlist and each existing themed playlist.
- Improved UI, changed colour scheme, built multiple pages using Material components to reflect the look and feel of the original app.
- Rich feature set.
- Can hyperlink into actor’s bio based on the cast list added to movie detail view.

## AI Declaration:
AI was used in this assignment. I have Copilot installed on Visual Studio Code to help me with troubleshooting and to highlight syntax errors. I also used ChatGPT when debugging particularly frustrating pages.
