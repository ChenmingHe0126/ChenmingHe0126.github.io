# PersonalWebsite

Static local rebuild of [chenminghe.com](https://chenminghe.com/) for future GitHub Pages hosting.

## Structure

- `index.html` - project grid / homepage
- `project.html` - shared project-detail page; renders the full case study (text + gallery)
- `publications.html` - localized publication covers and PDFs
- `cv.html` - localized CV page images
- `contact.html` - contact/profile page
- `assets/js/projects.js` - project list metadata (`window.PROJECTS`) for the grid
- `assets/js/project-content.js` - full per-project case-study content (`window.PROJECT_CONTENT`): ordered text blocks + gallery image references, scraped from the live project pages
- `assets/js/site.js` - rendering logic for the grid and project detail pages
- `assets/img/projects/*.{jpg,png}` - project cover images used by the grid
- `assets/img/projects/<slug>/` - full image gallery per project (originals, in page order)
- `assets/img/cv`, `assets/img/publications` - CV and publication images
- `assets/pdf` - downloaded publication PDFs

All images are the original-format uploads from the live site (PNG/JPG/GIF, not Squarespace's re-encoded WebP).

Open `index.html` directly in a browser, or serve the folder with any static server.
