# Smart Khmer Sign Language Learning Platform

Static front-end prototype for a Smart Khmer Sign Language Learning platform. The project is built with plain HTML, CSS, and JavaScript, so it does not require project initialization, package installation, or a development server.

## Project Flow

The platform is designed as a simple multi-page learning experience:

1. `index.html` - Login page
2. `home.html` - Learner homepage
3. `finger-spelling.html` - Finger Spelling learning track
4. `word-detection.html` - Word Detection learning track
5. `dictionary.html` - Searchable sign dictionary
6. `dictionary-detail.html` - Dictionary detail page
7. `lesson.html` - Real-time lesson practice page
8. `admin.html` - Simple admin dashboard mockup

## Features

- Learner login options for Facebook, Telegram, Google, and Guest
- Admin login form with email or username, password, and remember me
- Homepage for learners after login
- Unit -> Chapter -> Lesson learning structure
- Locked lessons to prevent learners from skipping ahead
- Separate Finger Spelling and Word Detection learning pages
- Dictionary page with search, type filter, and A-Z/Z-A ordering
- Dictionary detail page with image/video sample areas
- Real-time practice UI mockup with camera/keypoint overlay
- Simulated probability feedback percentages
- Continue lesson interaction
- Toast feedback messages
- Simple animations and interactive states
- Static admin dashboard layout for content management

## File Structure

```text
Playground/
  index.html      Login page
  home.html       Learner homepage
  finger-spelling.html
                  Finger Spelling units, chapters, and lessons
  word-detection.html
                  Word Detection units, chapters, and lessons
  dictionary.html Searchable word and character dictionary
  dictionary-detail.html
                  Dictionary detail page with media samples
  lesson.html     Lesson practice page
  admin.html      Admin dashboard mockup
  styles.css      Shared styling for all pages
  app.js          Shared JavaScript interactions
  README.md       Project documentation
```

## How To Open

Open this folder on your computer:

```text
C:\Users\ASUS\Documents\Playground
```

Then double-click:

```text
index.html
```

Start from the login page and continue through the platform.

## Page Details

### Login Page

File:

```text
index.html
```

The first page of the platform. It includes:

- Learner/Admin tab switching
- Facebook, Telegram, Google login buttons
- Join as Guest button
- Admin username/email and password form

Learner and guest login buttons move to:

```text
home.html
```

Admin login moves to:

```text
admin.html
```

### Homepage

File:

```text
home.html
```

The learner homepage after login. It shows the main learning modes:

- Finger Spelling
- Word Detection
- Chapter readiness progress

### Finger Spelling Page

File:

```text
finger-spelling.html
```

This page is the character learning track. It shows:

- Finger Spelling units
- Chapters with 5 lessons each
- Locked future lessons
- Practice after each chapter

### Word Detection Page

File:

```text
word-detection.html
```

This page is the word/video learning track. It starts with 20 word classes and shows:

- Word Detection units
- Video-based word lessons
- Locked future lessons
- Practice after each chapter

Both track pages follow this learning order:

```text
Unit -> Chapter -> Lesson -> Practice -> Quiz
```

Learners must study step by step. Future lessons are disabled and locked.

### Dictionary Page

File:

```text
dictionary.html
```

The dictionary lets learners browse signs outside the lesson path. It includes:

- Search bar
- A-Z and Z-A sorting
- All, Characters, and Words filters
- Cards for each word or character

### Dictionary Detail Page

File:

```text
dictionary-detail.html
```

The detail page shows:

- Word or character name
- Type and learning track
- Image sample area with keypoints
- Video sample preview area
- Difficulty, status, learning suggestion, and practice link

### Lesson Page

File:

```text
lesson.html
```

The lesson page includes:

- Sample hand/sign preview
- Real-time camera/keypoint mockup
- Match confidence percentage
- Hand angle percentage
- Finger position percentage
- Correction result
- Track-aware lesson content for Finger Spelling or Word Detection

The `REC` button simulates real-time detection feedback. Lesson links can pass a track, for example:

```text
lesson.html?track=finger&lesson=kho
lesson.html?track=word&lesson=hello
```

### Admin Page

File:

```text
admin.html
```

Simple static dashboard mockup for managing:

- Units
- Chapters
- Lessons

## Current Status

This is a static front-end prototype. It does not include:

- Real authentication
- Real webcam access
- Real AI/keypoint model connection
- Backend database
- Admin CRUD logic

Those can be added later when the project moves from static prototype to a real application.

## Primary Color

The main brand color is:

```css
#1f9f6f
```

The darker accent color is:

```css
#147b55
```

## Next Development Steps

- Add real Khmer alphabet and word class data
- Connect webcam access with JavaScript
- Connect a keypoint/sign detection model
- Add real authentication for Google, Facebook, and Telegram
- Add backend content management for admin users
- Store learner progress in a database
- Add quiz and exercise result tracking
