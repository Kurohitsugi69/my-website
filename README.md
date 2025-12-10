# my-website

A simple static website with an interactive music player and envelope/letter interface.

## Project Structure

```
my-website/
├── index.html          # Main/home page
├── assets/
│   ├── css/
│   │   └── style.css   # Stylesheets
│   ├── js/
│   │   └── script.js   # JavaScript functionality
│   ├── audio/          # Audio files
│   └── img/            # Images
└── README.md
```

## How to Create a New Page

This is a static website that doesn't require a build process. You can create new pages by following these steps:

### Step 1: Create the HTML File

Create a new HTML file in the root directory (e.g., `about.html`, `contact.html`, `gallery.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Your Page Title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
  <!-- Your page content goes here -->
  
  <div class="container">
    <h1>Welcome to My New Page</h1>
    <p>Add your content here.</p>
  </div>

  <!-- Optional: Include JavaScript if needed -->
  <script src="assets/js/script.js"></script>
</body>
</html>
```

### Step 2: Add Navigation (Optional)

To link pages together, add navigation links to your pages:

```html
<nav>
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
</nav>
```

### Step 3: Create Custom Styles (Optional)

If your new page needs specific styling:

1. Either add styles directly in a `<style>` tag in your HTML:
```html
<style>
  .my-custom-class {
    color: #ff69b4;
  }
</style>
```

2. Or create a new CSS file in `assets/css/`:
```html
<link rel="stylesheet" href="assets/css/my-page.css" />
```

### Step 4: Add JavaScript (Optional)

If your page needs custom functionality:

1. Either add inline JavaScript:
```html
<script>
  // Your JavaScript code here
</script>
```

2. Or create a new JS file in `assets/js/`:
```html
<script src="assets/js/my-page.js"></script>
```

## Example: Creating an "About" Page

Here's a complete example of creating an about page:

**File: `about.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>About - My Website</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
  <nav class="navigation">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
  </nav>

  <div class="container">
    <h1>About This Website</h1>
    <p>This is a personal website with a music player and special messages.</p>
  </div>
</body>
</html>
```

## Tips for Page Creation

1. **Consistency**: Use the same `<head>` structure across all pages for consistency
2. **Responsive Design**: Always include the viewport meta tag for mobile responsiveness
3. **File Organization**: Keep related assets organized in their respective folders
4. **Relative Paths**: Use relative paths for assets (e.g., `assets/css/style.css`) so pages work when opened directly
5. **Testing**: Open the HTML file in a browser to test your page before deployment

## Running the Website

Since this is a static website, you can:

1. **Open files directly**: Double-click any `.html` file to open it in your browser
2. **Use a local server** (recommended for testing):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have npx)
   npx http-server
   ```
   Then visit `http://localhost:8000` in your browser

## Deployment

To deploy your website:

1. **GitHub Pages**: Push to GitHub and enable GitHub Pages in repository settings
2. **Netlify/Vercel**: Drag and drop the folder or connect your repository
3. **Any Static Host**: Upload all files to your web hosting service

## Adding Assets

### Adding Images
1. Place image files in `assets/img/`
2. Reference in HTML: `<img src="assets/img/your-image.jpg" alt="Description">`

### Adding Audio
1. Place audio files in `assets/audio/`
2. Reference in HTML: `<audio src="assets/audio/your-audio.mp3"></audio>`

## Current Pages

- `index.html` - Home page with music player and envelope interface