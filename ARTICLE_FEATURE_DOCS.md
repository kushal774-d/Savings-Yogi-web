# Article Feature Documentation

## Overview
A complete article management system with a public-facing article page and a protected admin panel for creating, editing, and managing articles.

---

## Features

### Public Features
- **Article List Page** (`/articles`)
  - Grid view of all published articles
  - Article cards with images, titles, excerpts, and metadata
  - Responsive design for all screen sizes
  - Click to read full article

- **Full Article View** (`/article/:slug`)
  - Complete article content with rich formatting
  - Author information and publication date
  - Estimated read time
  - Share functionality
  - Related navigation

### Admin Features
- **Protected Admin Panel** (`/admin-article`)
  - Login-protected with hardcoded credentials
  - Create new articles
  - Edit existing articles
  - Delete articles
  - Rich text editor with formatting options
  - Instant preview and updates

---

## How to Run the Project

### 1. Start the Development Server
```bash
npm run dev
```

The server will start at: `http://localhost:8080/savingsyogi/`

### 2. Access the Articles
- **Public Articles**: Navigate to `/articles` or click "Articles" in the navigation menu
- **Admin Panel**: Navigate to `/admin-article`

---

## How to Use the Admin Panel

### Login Credentials
```
Username: admin
Password: admin123
```

### Step-by-Step Guide

#### 1. Login to Admin Panel
1. Go to `http://localhost:8080/savingsyogi/#/admin-article`
2. Enter the username and password
3. Click "Login"

#### 2. Create a New Article
1. Click the **"New Article"** button
2. Fill in the article details:
   - **Title** (required): Your article title
   - **Author** (optional): Your name
   - **Image URL** (optional): Direct link to an image
   - **Content** (required): Write your article using the rich text editor

3. **Using the Rich Text Editor**:
   - **Formatting**: Bold, Italic, Underline
   - **Headings**: H1, H2, H3
   - **Lists**: Bullet points, Numbered lists
   - **Insert**: Images, Links, Code blocks
   - **Other**: Quotes, Undo/Redo

4. Click **"Publish Article"** to save

#### 3. Edit an Article
1. Find the article in the list
2. Click the **"Edit"** button
3. Make your changes
4. Click **"Update Article"**

#### 4. Delete an Article
1. Find the article in the list
2. Click the **"Delete"** button
3. Confirm deletion

#### 5. Logout
- Click the **"Logout"** button in the top right corner

---

## Technical Details

### File Structure
```
src/
├── pages/
│   ├── Article.jsx          # Public article list page
│   ├── ArticlePost.jsx      # Full article view page
│   └── AdminArticle.jsx     # Admin panel with login
├── components/
│   └── ArticleEditor.jsx    # Rich text editor component
└── App.jsx                  # Routes configuration
```

### Data Storage
- All articles are stored in **localStorage**
- Data persists across page refreshes
- No backend required

### Article Data Structure
```javascript
{
  title: "Article Title",
  content: "<p>HTML content here</p>",
  author: "Author Name",
  image: "https://example.com/image.jpg",
  slug: "article-title",
  date: "2026-04-14T12:00:00.000Z"
}
```

### Routes
- `/articles` - Public article list
- `/article/:slug` - Full article view
- `/admin-article` - Admin panel (protected)

---

## Rich Text Editor Features

### Available Tools
1. **Text Formatting**
   - Bold (Ctrl+B)
   - Italic (Ctrl+I)
   - Underline (Ctrl+U)

2. **Headings**
   - H1 - Main heading
   - H2 - Subheading
   - H3 - Section heading

3. **Lists**
   - Bullet list
   - Numbered list

4. **Insertions**
   - Images (via URL)
   - Links (via URL)
   - Code blocks

5. **Other**
   - Blockquotes
   - Undo/Redo

---

## Security Notes

⚠️ **Important**: This is a frontend-only implementation for demonstration purposes.

### Current Limitations
- Admin credentials are hardcoded in the frontend (not secure)
- No real authentication system
- Data stored in localStorage (browser-specific)
- No server-side validation

### For Production Use
To make this production-ready, you should:
1. Implement a real backend (Node.js, Firebase, etc.)
2. Use proper authentication (JWT, OAuth)
3. Store credentials securely (hashed passwords)
4. Add server-side validation
5. Use a database (MongoDB, PostgreSQL)
6. Implement image upload functionality
7. Add role-based access control

---

## Troubleshooting

### Articles Not Showing?
- Make sure you've created at least one article
- Check browser console for errors
- Try refreshing the page

### Can't Login?
- Verify credentials: `admin` / `admin123`
- Clear browser cache and try again
- Check if localStorage is enabled

### Editor Not Working?
- Ensure you're logged in
- Try refreshing the page
- Check browser console for errors

### Images Not Loading?
- Use direct image URLs (ending in .jpg, .png, etc.)
- Make sure the URL is accessible
- Some sites block hotlinking

---

## Example Article Content

### Title
```
5 Smart Money-Saving Tips for Beginners
```

### Content (using editor)
```
# Introduction

Saving money doesn't have to be complicated. Here are five proven strategies to help you get started.

## 1. Create a Budget

Track your income and expenses to understand where your money goes.

## 2. Set Clear Goals

Define what you're saving for:
- Emergency fund
- Vacation
- New car
- Retirement

## 3. Automate Your Savings

Set up automatic transfers to your savings account every month.

> "A penny saved is a penny earned." - Benjamin Franklin

## 4. Reduce Unnecessary Expenses

Look for subscriptions and services you don't use regularly.

## 5. Review and Adjust

Review your budget monthly and adjust as needed.
```

---

## Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Clear browser cache and localStorage
3. Restart the development server
4. Verify all files are properly saved

---

## Future Enhancements

Potential improvements for the future:
- [ ] Search functionality
- [ ] Article categories/tags
- [ ] Comments system
- [ ] Social sharing integration
- [ ] Article drafts
- [ ] Image upload (not just URLs)
- [ ] SEO optimization
- [ ] RSS feed
- [ ] Newsletter integration
- [ ] Analytics dashboard

---

**Last Updated**: April 14, 2026
