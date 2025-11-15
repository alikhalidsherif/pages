# Ali Ahmed - Portfolio Website

A modern, creative, and fully dockerized portfolio website showcasing full-stack development and AI engineering projects.

## Features

- 🎨 Modern gradient design with smooth animations
- 📱 Fully responsive (mobile, tablet, desktop)
- 🐳 Fully containerized with Docker
- ⚡ Optimized performance with Nginx
- 🎯 Interactive UI with smooth scrolling
- 💻 Code-themed design elements
- 🔒 Security headers configured

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Web Server:** Nginx (Alpine)
- **Containerization:** Docker, Docker Compose
- **Fonts:** Inter, JetBrains Mono

## Quick Start

### Prerequisites

- Docker installed on your system
- Docker Compose (usually comes with Docker Desktop)

### Running Locally

1. Clone or download this repository

2. Navigate to the project directory:
```bash
cd portfolio-website
```

3. Build and run with Docker Compose:
```bash
docker-compose up -d
```

4. Access the website:
```
http://localhost:8080
```

### Alternative: Build and Run with Docker

```bash
# Build the image
docker build -t ali-ahmed-portfolio .

# Run the container
docker run -d -p 8080:80 --name portfolio ali-ahmed-portfolio
```

## Project Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles with gradients and animations
├── script.js           # Interactive JavaScript functionality
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
├── nginx.conf          # Nginx server configuration
└── README.md          # This file
```

## Deployment Options

### Option 1: Deploy to Your Own Server

1. Copy files to your server
2. Run `docker-compose up -d`
3. Configure reverse proxy (Nginx/Apache) if needed
4. Set up SSL with Let's Encrypt

### Option 2: Deploy to Cloud Platforms

**Render:**
- Connect your GitHub repository
- Choose "Docker" as environment
- Deploy automatically

**Railway:**
- Connect repository
- Deploy with one click

**DigitalOcean App Platform:**
- Create new app from GitHub
- Select Dockerfile deployment
- Configure domain

**Google Cloud Run:**
```bash
gcloud run deploy portfolio \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Option 3: Traditional Hosting

Simply upload `index.html`, `styles.css`, and `script.js` to any web hosting service.

## Customization

### Update Personal Information

Edit `index.html`:
- Personal details in hero section
- Project information in projects section
- Contact information in contact section

### Modify Colors and Theme

Edit `styles.css` CSS variables:
```css
:root {
    --primary: #6366f1;
    --secondary: #8b5cf6;
    /* Add your custom colors */
}
```

### Add New Projects

Add a new `.project-card` div in the projects section of `index.html`.

## Performance Optimizations

- Gzip compression enabled
- Static asset caching (1 year)
- Minimal HTTP requests
- Optimized CSS and JavaScript
- Lazy loading ready for images

## Security Features

- X-Frame-Options header
- X-Content-Type-Options header
- X-XSS-Protection header
- Referrer-Policy configured

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Docker Commands

**Start the container:**
```bash
docker-compose up -d
```

**Stop the container:**
```bash
docker-compose down
```

**View logs:**
```bash
docker-compose logs -f
```

**Rebuild after changes:**
```bash
docker-compose up -d --build
```

**Remove everything:**
```bash
docker-compose down -v
```

## Development

To make changes:

1. Edit the HTML, CSS, or JS files
2. Rebuild the container:
```bash
docker-compose up -d --build
```
3. Refresh your browser

## Production Checklist

- [ ] Update all personal information
- [ ] Add your actual project links
- [ ] Update contact information
- [ ] Test on multiple devices
- [ ] Optimize images (if you add any)
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Test performance (Lighthouse)

## License

This portfolio template is free to use and modify for your own personal portfolio.

## Contact

**Ali Khalid Ahmed**
- Email: alikhalidsherif@gmail.com
- Business: ali@ashreef.com
- LinkedIn: [linkedin.com/in/alikhalidsherif](https://linkedin.com/in/alikhalidsherif)
- GitHub: [github.com/alikhalidsherif](https://github.com/alikhalidsherif)

---

Built with ❤️ and lots of ☕ by Ali Ahmed
