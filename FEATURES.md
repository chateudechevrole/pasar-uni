# PasarUni Features Documentation

Complete guide to all features and functionality in the PasarUni marketplace.

## 🏠 Homepage Features

### Smart Filtering System

**University Filter**
- Filter items by specific universities (UM, USM, UKM, etc.)
- Card-style buttons with active state
- "All" option to view items from all universities
- Real-time filtering without page reload

**Category Pills**
- 7 categories: Textbooks, Electronics, Furniture, Clothing, Stationery, Sports, Other
- Plus "All" to show everything
- Clean pill design with hover states
- Instant filtering

### Item Grid Display

**Item Cards Show:**
- Primary image with aspect ratio 4:3
- Condition badge (overlay on image top-right)
- Large purple price with "Fixed Price" label
- Title (truncated to 2 lines)
- University and category badges
- Seller info with verification status
- SOLD/RESERVED overlay for unavailable items

**Responsive Grid:**
- 1 column on mobile
- 2 columns on small tablets
- 3 columns on tablets
- 4 columns on desktop

### Search Bar
- Prominent in navbar (desktop)
- Below navbar on mobile
- Icon-enhanced input field
- Ready for future search functionality

## 📦 Product Detail Page

### Image Gallery
- Large main image display
- Thumbnail strip (if multiple images)
- Click thumbnails to switch main image
- Responsive: stacked on mobile, side-by-side on desktop

### Product Information

**Price Display:**
- Extra large (4xl) purple text
- "Fixed Price" badge
- Clear "No bargaining" messaging

**Metadata:**
- Condition badge (green)
- University badge (blue)
- Category badge (gray)
- View count with eye icon
- Location with pin icon

**Description:**
- Full text in card format
- Preserves line breaks
- Clean, readable typography

### Seller Card

**Displays:**
- Avatar (gradient circle with initial)
- Username
- University
- Verified student badge (if applicable)
- "Public Q&A" button (yellow/golden)

### Public Q&A Section

**Key Features:**
- All questions are public and anonymous (optional)
- Only sellers can reply to questions
- Threaded view: Question → Seller Reply
- "Seller" badge on replies

**Ask a Question:**
- Text input with placeholder
- Yellow-themed section (matches design system)
- Send button with icon
- Questions visible to everyone

**Question Display:**
- Asker's avatar and name (or "Anonymous")
- Timestamp
- Question content
- Seller's reply in highlighted box (if answered)
- "Waiting for seller's reply" message (if not answered)

### Buy Now Button

**States:**
- **AVAILABLE:** Purple, clickable, shows "Buy Now"
- **RESERVED:** Disabled, shows "RESERVED"
- **SOLD:** Disabled, shows "SOLD"

**Functionality:**
- Opens QR payment modal
- Shows payment instructions
- Handles the entire purchase flow

## 💳 QR Payment Modal

This is a **unique feature** of PasarUni - direct peer-to-peer payments!

### Modal Flow

**Step 1: Validation**
- Checks if user is logged in
- Checks if seller has QR code uploaded
- Shows error if QR not found

**Step 2: Payment Instructions**
- Blue instruction box with numbered steps
- Clear payment amount highlighted
- Instructions to scan QR code

**Step 3: QR Code Display**
- Large, centered QR code image
- Seller's name shown
- Price displayed prominently
- Real seller's payment QR (not public until checkout)

**Step 4: Upload Proof**
- File upload section with drag-and-drop UI
- Visual feedback when file selected
- Accepts images only (PNG, JPG)
- 10MB file size limit

**Step 5: Submission**
- "I Have Paid" button (requires proof upload)
- Loading state during submission
- Success screen with confirmation

**Step 6: Success State**
- Green checkmark icon
- Success message
- Information about next steps
- Item automatically marked as RESERVED

### Security Features
- QR codes are private until checkout
- Warning about fake submissions
- Payment proof required for order creation

## 🛍️ Sell Item Page

### Photo Upload

**Features:**
- Upload up to 5 photos
- First photo becomes cover image
- Preview all uploaded images
- Remove individual images with X button
- Visual "Cover" badge on first image
- Drag-and-drop interface

### Form Fields

**Required Fields:**
1. **Title** (100 char limit)
   - Character counter
   - Single line input

2. **Description** (500 char limit)
   - Multi-line textarea
   - Character counter
   - AI Assist button (mockup for future)

3. **Price**
   - Numeric input with RM prefix
   - 2 decimal places
   - "No bargaining" note

4. **Category**
   - Dropdown select
   - 7 options available

5. **Condition**
   - Button grid layout
   - 6 condition options (New → 5/10 or Below)
   - Visual active state

6. **University Location**
   - Dropdown select
   - 8 Malaysian universities

### AI Assist Feature (Mockup)
- Sparkle icon button
- Next to description field
- Shows alert explaining future functionality
- Placeholder for AI-powered description writer

### Validation System

**Payment QR Requirement:**
- Red warning banner if QR not set up
- Disables form submission
- Provides link to profile settings
- Ensures sellers can receive payments

**Form Validation:**
- At least 1 image required
- All fields must be filled
- Price must be > 0
- Shows specific error messages

### Submission Flow
1. Click "List Item"
2. Loading state ("Listing...")
3. Success alert
4. Redirect to homepage
5. Item appears in feed

## 👤 Profile Page

### Profile Information

**User Card:**
- Large avatar with gradient
- Username (editable)
- University (editable)
- Verified student badge
- Edit profile button

**Edit Mode:**
- Toggle between view and edit
- Change username
- Change university
- Save/Cancel buttons

### Statistics Dashboard

**Metrics Shown:**
- Total listed items
- Number of sold items
- Total views across all items

### Payment QR Management

**This is CRITICAL for sellers!**

**Upload Section:**
- Drag-and-drop interface
- Click to browse files
- Image format validation
- 5MB file size limit

**Preview Section:**
- Shows current uploaded QR
- Large, clear display
- "Buyers will scan this" message
- Empty state if not uploaded

**Instructions Card:**
- Blue highlight box
- Step-by-step guide to get QR code
- Works for DuitNow and Touch 'n Go

**Warning:**
- Yellow warning if QR not uploaded
- Prevents listing items
- Prominent "Action Required" message

### My Listings

**Item List View:**
- Thumbnail image
- Title (truncated)
- Price
- Status badge (Available/Reserved/Sold)
- View count
- Hover effect

**Item States:**
- Available (default gray badge)
- Reserved (yellow badge)
- Sold (yellow badge)

## 🎨 Design System

### Colors

**Primary (Indigo/Purple):**
- `bg-indigo-600` - Main actions, prices
- Used for: Buy button, active filters, links

**Secondary (Yellow):**
- `bg-yellow-400` - Public Q&A specific
- Used for: Q&A button, Q&A section accents

**Semantic Colors:**
- Green: Condition badges, success states
- Blue: University badges, info boxes
- Red: Warnings, errors
- Gray: Default, disabled states

### Typography

**Font:** Inter (Google Fonts)
- Clean, modern, excellent readability
- Variable font weights (300-800)

**Scale:**
- Headings: Bold weights (600-800)
- Body: Regular (400) and Medium (500)
- Small text: 400 weight

### Components

**Button Variants:**
- `primary` - Indigo background
- `secondary` - Yellow background
- `outline` - White with border
- `ghost` - Transparent with hover

**Button Sizes:**
- `sm` - Compact for tight spaces
- `md` - Default size
- `lg` - Prominent actions

**Badges:**
- University (blue)
- Condition (green)
- Status (yellow)
- Verified (indigo)
- Default (gray)

### Spacing & Layout
- Container: max-width with responsive padding
- Card padding: 6 units (24px)
- Grid gaps: 6 units (24px)
- Section spacing: 8-12 units

## 🔒 Security & Privacy

### Row Level Security (RLS)

**Profiles:**
- Everyone can view profiles
- Users can only edit their own
- Payment QR visible to everyone (needed for checkout)

**Items:**
- Everyone can view all items
- Users can only create/edit/delete their own
- Status changes validated

**Questions:**
- Everyone can view public Q&A
- Authenticated users can ask
- Only item sellers can reply

**Orders:**
- Only buyers and sellers see their orders
- Payment proof private to transaction parties

### Data Privacy

**What's Public:**
- User profiles (username, university, verified status)
- Listed items and details
- Public Q&A conversations
- Payment QR codes (needed for checkout)

**What's Private:**
- Email addresses
- Payment proof screenshots
- Order details
- Messages between buyer and seller (in orders)

## 📱 Responsive Design

### Breakpoints
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md/lg)
- Desktop: > 1024px (xl)

### Mobile Optimizations
- Stacked layouts instead of side-by-side
- Hamburger menu (if needed)
- Touch-friendly buttons (minimum 44px)
- Search bar moves below navbar
- Single column item grid

### Desktop Enhancements
- Side-by-side layouts
- 4-column item grid
- Persistent search in navbar
- Hover states on cards

## 🚀 Future Enhancements

### Planned Features

1. **Real Authentication**
   - Email/password login
   - Social login (Google, Facebook)
   - Email verification

2. **Real-time Notifications**
   - New questions on your items
   - Payment confirmations
   - Order status updates

3. **AI Description Writer**
   - Analyze item photos
   - Generate compelling descriptions
   - Suggest pricing based on condition

4. **Advanced Search**
   - Full-text search
   - Price range filters
   - Sort by date, price, popularity

5. **User Ratings**
   - Rate sellers after purchase
   - Trust scores
   - Review system

6. **Messaging System**
   - For post-purchase coordination
   - Still no pre-purchase chat
   - Logistics and meetup planning

7. **Analytics Dashboard**
   - Views over time
   - Popular items
   - Best selling times

8. **Mobile App**
   - React Native version
   - Push notifications
   - Camera integration

---

This documentation covers all current features. For setup and installation, see `SETUP.md`.

