// context.js - Manages application context and persistent memory

// Default application context document - Edit this with your application details
const DEFAULT_APP_CONTEXT = `
# Application UI Functionality Documentation

## Overview
This document describes the UI components and functionality of our application to help generate better test cases.

## Core Features
- User authentication (login/logout/registration)
- Dashboard with summary statistics
- User profile management
- Content creation workflow
- Search functionality
- Notification system
- Settings and preferences

## UI Components
### Navigation Bar
- Logo (top left): Clickable, returns to dashboard
- Profile menu (top right): Dropdown with profile, settings, logout
- Main navigation: Dashboard, Content, Analytics, Help

### Dashboard
- Summary cards: Show key metrics
- Recent activity feed: Scrollable list of recent actions
- Quick action buttons: Create new content, view reports
- Notification center: Shows unread notifications with badge count

### Content Section
- Grid/list view toggle
- Sorting options (date, name, type)
- Filter panel (left sidebar)
- Content cards with preview thumbnails
- Pagination controls

### Profile Page
- Profile picture with upload capability
- Editable user information
- Activity history tabs
- Connected accounts section

### Settings
- Theme selection (light/dark mode)
- Notification preferences
- Privacy settings
- Account management options

## User Workflows
### Content Creation
1. User clicks "Create New" button
2. Select content type from options
3. Enter content details in form
4. Upload attachments if needed
5. Preview content before publishing
6. Publish or save as draft

### Search Process
1. Click search icon in navigation
2. Enter search term in expanded search bar
3. Results appear in dropdown or dedicated page
4. Filter results by type, date, or other attributes
5. Click result to navigate to content

## Error Handling
- Form validation with inline error messages
- Toast notifications for system errors
- Friendly error pages for 404, 500 errors
- Confirmation dialogs for destructive actions

## Responsive Behavior
- Desktop: Full featured interface
- Tablet: Condensed navigation, optimized layouts
- Mobile: Hamburger menu, stacked layouts, touch-optimized controls

## Photo Uploading
- Files can be uploaded to collections from either a computer or a mobile device
- Uploads can be JPEG, PNG, or RAW files up to 100 MB, or GIF files up to 85 MB. 
- On a computer, images can also be uploaded by dragging the files directly into the collection
- After files are added to the upload queue, the overall progress will be displayed in the Upload Bar
- Each image should have a unique filename, as it is not possible to have images with the same filename in the same set. While it is possible to upload images with the same filename to different sets in the same collection, it is not recommended as it can cause issues when it comes to favorites and downloads

## Video Uploading
 - Users can upload videos in MP4, MOV, AVI, or M4V. Video files are not limited by file size or dimensions, so users can upload videos of any size

 - Video Resolutions: up to 4K
 - On the Basic or Plus [Client Gallery plans](https://pixieset.com/pricing/), videos will be delivered up to 1080p (1920 x 1080px).

- On the Pro or Ultimate [Client Gallery](https://pixieset.com/pricing/) or [Suite plans](https://pixieset.com/pricing-suite/), videos will be delivered up to 4K resolution (3840 x 2160px).

 - Upload Process: Videos can be uploaded to any account with an upgraded Client Gallery or Suite plan, and will automatically appear at the top of the collection (above any uploaded photos) in the users dashboard. 

 ## Uploading Video Steps

1. Go to any collection in the [dashboard](https://pixieset.com/collection/)
2. Click **+ Add Media** on the top right to open the Upload Modal - this appears by default when there are no files in the set. 
3. Drag video files into the modal or click **Browse Files ** to select files locally

 - On a computer, videos can also be uploaded by dragging the files directly into the collection

### Processing
 - After files are added to the upload queue, the overall progress will be displayed in the Upload Bar on the bottom right

## Invalid Video
 - If the user has tried to upload a video file with export settings (resolution, codec, bitrate) that are not supported & playable by their browser, and/or are not supported by Pixieset, they will run into a File isnt a valid video error

 ## Client Side for Video
 # End Client Side

Uploaded videos will automatically appear within the set they were uploaded to, separately above the photos in that set. If multiple videos have been uploaded, they will appear stacked above each other, above the photos.

The video in the gallery is shown at the full/original size the user uploaded, up to the limit of their current plan. (i.e. 1080p for CG Basic/Plus and Suite Starter, 4K for CG Pro/Ultimate and Suite Pro/Ultimate)

## Agent Side Video 
You can view uploaded videos in any collection in the Admin dashboard.

1. Locate the users account
2. Click into **Collections**
3. Open the collection in question. The number of videos in each set will be listed. Click **View** to open any specific set.
4. Video files will be listed at the bottom, below all the photos.
5. Clicking on the ID # for the video will take you to that video file directly, where you can review file details such as the duration (in seconds), size, dimensions, and when the file was created/uploaded. 

## User Side Embedding Videos

Users can embed a video into any set within their collections. They will first upload their video to YouTube or Vimeo, and then add the URL to the video to embed it into their gallery.

<aside>
The privacy settings for the videos must *allow embedding* and be set to **Public** or **Unlisted** (YouTube) or **Public**, **Unlisted** or **Hidden from Vimeo but Embeddable everywhere** (Vimeo).

</aside>
Once the video has been uploaded to YouTube or Vimeo, the user can:

1. Go to any collection in their dashboard
2. Click **+ Add Media** and select **Embed** to open the video embedding modal.
3. Add the video URL from YouTube or Vimeo, then click Add Video. Embedded videos will appear at the top of the collection, above the photos.

## End Client Side Embeddding Videos

 - Embedded videos will appear in the gallery, above the photo grid. If multiple videos have been added, they will appear stacked on top of each other, above the photo grid.
 - Embedded videos cannot be downloaded directly from the gallery.

 ## Agent Side Embedding Videos

You can view embedded videos in any collection in the Admin dashboard.

1. Locate the users account
2. Click into **Collections**
3. Open the collection in question. The number of videos in each set will be listed. Click **View** to open any specific set.
    
    ![sets.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6af1d910-b3cc-4b0b-9dc7-3e41663423ec/sets.png)
    
4. Video files will be listed at the bottom, below all the photos.
    
    ![embedded-videos.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3894a033-6cac-4a05-ae21-49caf86206ca/embedded-videos.png)
    
5. Clicking on the ID # for the video will take you to that videos information directly, where you can review details such as the video URL, and when the video was added to the gallery.
`;

// Functions to save and load context from localStorage
const saveContext = (context) => {
  try {
    localStorage.setItem('appContext', JSON.stringify(context));
    console.log('Context saved to localStorage');
    return true;
  } catch (error) {
    console.error('Failed to save context to localStorage:', error);
    return false;
  }
};

const loadContext = () => {
  try {
    const savedContext = localStorage.getItem('appContext');
    if (savedContext) {
      return JSON.parse(savedContext);
    }
    // If no saved context exists, initialize with default
    saveContext({
      appDocumentation: DEFAULT_APP_CONTEXT,
      conversations: [],
      lastUpdated: new Date().toISOString()
    });
    return {
      appDocumentation: DEFAULT_APP_CONTEXT,
      conversations: [],
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to load context from localStorage:', error);
    return {
      appDocumentation: DEFAULT_APP_CONTEXT,
      conversations: [],
      lastUpdated: new Date().toISOString()
    };
  }
};

// Function to update app documentation
const updateAppDocumentation = (newDocumentation) => {
  const context = loadContext();
  context.appDocumentation = newDocumentation;
  context.lastUpdated = new Date().toISOString();
  return saveContext(context);
};

// Function to add a conversation to history
const addConversation = (userPrompt, aiResponse) => {
  const context = loadContext();
  context.conversations.push({
    timestamp: new Date().toISOString(),
    userPrompt,
    aiResponse
  });
  
  // Limit to last 50 conversations to prevent localStorage overflow
  if (context.conversations.length > 50) {
    context.conversations = context.conversations.slice(-50);
  }
  
  return saveContext(context);
};

// Function to clear conversation history
const clearConversations = () => {
  const context = loadContext();
  context.conversations = [];
  context.lastUpdated = new Date().toISOString();
  return saveContext(context);
};

// Function to clear all context data (reset to default)
const resetContext = () => {
  const newContext = {
    appDocumentation: DEFAULT_APP_CONTEXT,
    conversations: [],
    lastUpdated: new Date().toISOString()
  };
  return saveContext(newContext);
};

// Export all functions and data
export {
  DEFAULT_APP_CONTEXT,
  loadContext,
  saveContext,
  updateAppDocumentation,
  addConversation,
  clearConversations,
  resetContext
};