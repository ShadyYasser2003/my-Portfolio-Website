# DevOps Engineer Portfolio

A modern, animated portfolio website with a secure admin dashboard for content management.

## Features

- 🎨 Ultra-smooth animations with Motion (Framer Motion)
- 📱 Fully responsive design
- 🔐 Password-protected admin dashboard
- 📝 Dynamic content management
- 📸 Photo and resume upload
- 📬 Contact form with message storage
- 💾 Persistent data storage with Supabase

## Admin Dashboard

Access the dashboard at: **`/admin`**

**Default Password:** `admin123`

⚠️ **IMPORTANT:** Change the default password immediately!

### To Change Password:

1. Open `/App.tsx`
2. Find the line: `const ADMIN_PASSWORD = 'admin123';`
3. Replace `'admin123'` with your secure password
4. Save the file

### Dashboard Features:

- **Profile:** Upload photo & resume, edit personal info
- **About:** Manage about section paragraphs and highlights
- **Skills:** Add/edit skill categories with proficiency levels
- **Projects:** Showcase your projects with tech stacks
- **Experience:** Work history and achievements
- **Certifications:** Professional certifications
- **Contact Page:** Edit contact section text
- **Messages:** View contact form submissions

### Security:

- Session-based authentication
- Auto-logout after 2 hours of inactivity
- Hidden route (not linked publicly)
- Password validation with brute-force delay

## Accessing the Dashboard

1. Navigate to `yoursite.com/admin`
2. Enter your password
3. Manage your portfolio content
4. Click "Save Changes" to persist updates
5. Use "Logout" when finished

## Best Practices

- ✅ Never share the `/admin` URL publicly
- ✅ Use a strong, unique password
- ✅ Clear browser data after using public computers
- ✅ Logout when finished editing
- ✅ Keep the password secure and private

## File Upload Limits

- **Photos:** Image files, recommended 400x400px or larger
- **Resume:** PDF only, max 10MB
- Files stored securely in Supabase Storage

## Contact Form

Messages submitted through the contact form are:
- Stored in the database
- Viewable in the "Messages" tab
- Include sender name, email, message, and timestamp

## Deployment

This portfolio is ready to deploy as-is. The admin dashboard is:
- Protected by password
- Accessible only via direct URL
- Session-managed for security
- Not indexed or linked publicly

---

**Remember:** Change the default password before deploying to production!
