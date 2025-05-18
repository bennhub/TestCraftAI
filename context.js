// context.js - Manages application context and persistent memory

// Default application context document - Edit this with your application details
const DEFAULT_APP_CONTEXT = `
# Application UI Functionality Documentation

## Overview
This document describes the UI components and functionality of our application to help generate better test cases.

########################
PHOTOS
########################

## Photo Uploading
- Files can be uploaded to collections from either a computer or a mobile device
- Uploads can be JPEG, PNG, or RAW files up to 100 MB, or GIF files up to 85 MB. 
- On a computer, images can also be uploaded by dragging the files directly into the collection
- After files are added to the upload queue, the overall progress will be displayed in the Upload Bar
- Each image should have a unique filename, as it is not possible to have images with the same filename in the same set. 
- While it is possible to upload images with the same filename to different sets in the same collection, it is not recommended as it can cause issues when it comes to favorites and downloads

########################
VIDEO
########################

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

######################
COLLECTIONS
######################
# User Side
 - Users can access the collection’s general settings on Desktop by going to **Settings Icon > General.** On mobile devices, settings can be opened by clicking **≡ > Settings Icon > General** on the top right of the collection dashboard.
 - General settings can be adjusted from all devices.

## Settings Overview

### Collection Name
 - The **Collection Name** will be used on the homepage (if the collection is shown there), on the collection cover, and in collection-related emails. The Collection URL is based on the name entered at the time the collection is created. 
 - You can edit the collection name within the collection by clicking directly on the name on the top left:
 - You can also edit the name using the … icon from the main gallery page > Quick Edit:

 ### Event Date
**Event Dates** will be displayed on the homepage and the collection cover when set. To change the date, click on the Event Date section on the top left and select the date from the calendar drop down. 
 - Clearing this section using the X Icon will remove the date.

 ### Status
If a collection has not been published, it will be in **Draft** status, meaning it is only visible to the user while logged in to their dashboard. Collections can be published using the **Publish** button on the top right, or by selecting **Publish** from the drop-down menu.
When the collection is in Published status, the privacy settings will determine where it is shown and who can view it. The Publish button updates to a Share button, and the Status can be changed from Published to Hidden in the drop-down menu. 

Hidden collections are only visible to the user, and cannot be shared publicly - the collection URL will return a 404 error. Collections can be Hidden manually by changing the status, or automatically by adding an auto-expiry date to their collection. If the user cancels their subscription, all collections will be set to Hidden status and must be republished manually.
### Collection Contact

Users can connect Studio Manager [Contact Profiles](https://www.notion.so/97d8ae3ba5c54ab0a2170ebd10de98ad?pvs=21) to their collections to keep their work organized. Any collections linked to a specific contact will appear on their Profile in Studio Manager.

### Collection URL

The default Collection URL will be based on the Latin characters in the collection name. Any **‘&’** will be changed to **‘and’**, and special characters will be removed from the URL completely. For example:

- “Sasha & Miriam” → sashaandmiriam
- “voilà” → voil
- “Eloise (proofs)” → eloiseproofs

If a new collection uses the exact same name as an existing one, the newer collection will have a number added to the end to differentiate between URLs. 

When the entire collection name uses unsupported characters or non-Latin alphabets (e.g. Cyrillic, Traditional Chinese), the default URL will always be **collection**, or a sequential variation of this (**collection-1**, **collection-2**, etc).

Editing the name after the collection has been created will not update the URL slug, so users will need to edit it manually as needed. Changing the URL slug will break the previous URL, so the collection will need to be re-shared with clients in these cases.

### Category Tags

Users can create Category Tags to help them organize their collections on their dashboard, and to help clients quickly locate collections on their Homepage

### Default Watermark

The Default Watermark will be applied to all images uploaded to the collection, unless another one is selected from the Upload Modal. Changing the Default watermark will not update the watermark on existing images in the collection.

### Auto Expiry

Users can set an expiration date for their collections, which will automatically set the status to **Hidden** on a specific date. Here, they can also set up email reminders to ensure clients are aware  that their photos will be taken offline soon.

### Email Registration

When Email Registration is turned on, visitors to the collection will be prompted to enter an email address before they can view their photos. These emails can be used to track when clients view the collection, and can be exported for use outside Pixieset (e.g. mailing lists).

### Gallery Assist

Users can use the Gallery Assist feature to provide helpful walkthrough cards to their clients based on the settings in place in their collections.

### Slideshow

This option allows clients to view their photos in a Slideshow format - this will show their photos in full screen one at a time, and will automatically switch to the next image. The Additional Options allow users to control the speed of the slideshow and what happens at the end of the collection.

### Social Sharing Buttons

Users can toggle the social sharing buttons On/Off for their collections. This allows clients to share individual images, the collection, or favorite lists, along with the option to share the favorite list with their photographer. Clients can share to Facebook, Twitter, or Pinterest, and also will have the option to send an email or generate a shareable URL.

### Language

Users can select which language they would like their collection displayed in from the available supported languages. This impacts automatically generated text on the client-facing aspects of collections only.
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