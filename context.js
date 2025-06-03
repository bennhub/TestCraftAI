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

######################
PRIVACY
######################

######################
COLLECTION PRIVACY
######################

# Overview
 - Photographers can set privacy levels for their collections to control client access.
 - A **Collection Password** ensures that only people with both the collection link **and** the password can access the gallery.

# User Side
 - Privacy settings are accessed from **Collection > Settings > Privacy**.
 - A custom password can be entered into the **Collection Password** field.
 - A password can also be generated using the **Generate** button.
 - Users can view or copy the password using icons beside the field.
 - Clicking the password field reveals the password.

## Individual Image Links
 - Direct links to individual images can be shared regardless of the collection password.
 - These shared images:
    • Cannot be downloaded, purchased, or favorited.
    • Prompt users for the collection password if they click “Back to Collection.”

# End Client Side
 - When a collection has a password, clients must enter it before viewing.
 - Incorrect passwords will trigger an error message.
 - If Email Registration is enabled:
    • Clients must enter both a valid email address **and** the correct password.
 - Multiple failed attempts result in a captcha prompt.
 - Clients can bypass captcha issues by:
    • Clearing browser data.
    • Using incognito/private mode.
    • Trying a different browser or device.

# Agent Side
 1. Open the user’s account in the [admin dashboard](https://pixieset.com/user/admin/).
 2. Navigate to the **Collections** tab.
 3. Click the collection and scroll to the **Collection Password** field.
     • If it says **Not Set**, no password is applied to that collection.

######################
 PRIVACY -> CLIENT EXCLUSIVE ACCESS
######################

# Overview
 - Client Exclusive Access lets users hide specific sets from guests while granting full collection access to clients via a **Client Private Password**.
 - This is useful when users want to publicly share only certain sets (e.g. "Highlights") while keeping others (e.g. "Getting Ready") private for clients.
 - Clients can also mark individual photos as Private so they remain hidden from guests.

💡 The **Client Private Password** is separate from the **Collection Password**:
   - Client Private Password = full access to all sets.
   - Collection Password = access to public sets only.

# Setup Options
 - No password, no client access
 - Client Private Password only
 - Collection Password only
 - Both passwords enabled

# User Side

## Client Exclusive Access
 - Navigate to **Collection > Settings Icon > Privacy**
 - Toggle **Client Exclusive Access** ON/OFF
 - By default, a Client Private Password is generated
    • Can be customized or regenerated
    • Use icons to view or copy the password

## Client-Only Photo Sets
 - Users can mark specific sets as client-only
 - These sets will only appear after entering the **Client Private Password**

Example:
 - Guest using Collection Password → sees "Highlights"
 - Client using Client Password → sees "Getting Ready" + "Highlights"

## Allow Clients to Mark Photos as Private
 - Enable setting to let clients hide specific images from guests
 - Private photos will remain visible only to those using the Client Password
 - Shared links to private photos will still require Client Password

# End Client Side

## Client Exclusive Access
 - Visitors choose between guest or client access (based on setup)
   • Collection Password → Guest Access only
   • Client Private Password → Client Access
   • Both set → Visitors select one, then enter the corresponding password
 - If Email Registration is enabled, users must also enter an email address

## Photo Sets Visibility
 - Clients see all sets
 - Guests see only public sets
 - Example:
    • Client sees "Getting Ready", "Reception", etc.
    • Guest sees only "Highlights"

## Private Photos
 - Clients can mark any image as Private from:
    • Gallery view
    • Enlarged photo view
 - Private photos are visible to the client only and hidden from guests

# Agent Side

## Client Exclusive Access
 1. Go to the [admin dashboard](https://pixieset.com/user/admin/)
 2. Navigate to the **Collections** tab
 3. Click into the relevant collection
 4. Scroll to **Client Access Password**
     • If blank, no client access password is set

## Photo Sets Visibility
 - Visibility status is shown under the **Private?** column in the Sets list at the bottom of the page

## Private Photos
 - Click the **Private Photo Activity** button to view all client-marked private images
 - To check an individual photo:
   1. From the collection, click **View** next to a set
   2. Select the image
   3. Check the **visibility status**

######################
PRIVACY -> SHOW ON HOMEPAGE
######################

# Overview
 - The **Show on Homepage** setting controls whether a published collection appears on the user's Client Gallery Homepage.

# User Side

## Enabling/Disabling Show on Homepage
 - Go to **Collection > Settings > Privacy** tab to toggle **Show on Homepage** ON or OFF.
 - Alternatively, go to the main Dashboard, click **(…) > Quick Edit** on the collection thumbnail, and toggle it there.

## Using Folders with Show on Homepage
 - Users can also manage the visibility of **Folders** on the homepage.

| Folder Visibility | Show on Homepage Toggle |
|-------------------|-------------------------|
| Public Folder     | ON                      |
| Private Folder    | OFF                     |

## Behavior When Moving Collections Between Folders

| Action | Target | Result |
|--------|--------|--------|
| Public collection → Public folder | (1) Collection moved from homepage to folder<br>(2) Folder shown on homepage<br>(3) Collection visible within folder |
| Public collection → Private folder | (1) Collection removed from homepage<br>(2) Folder hidden<br>(3) Collection no longer visible |
| Private collection → Private folder | (1) Collection hidden<br>(2) Folder hidden<br>(3) Collection not visible |
| Private collection → Public folder | (1) Warning shown: “Public folder is shown on Homepage”<br>(2) Collection visible inside folder<br>(3) Folder visible<br>(4) Collection visible to homepage visitors |

# End Client Side

## Resulting Homepage Visibility
 - If **Show on Homepage = ON**, the collection will appear on the homepage.
 - If **Show on Homepage = OFF**, the collection will not appear on the homepage.

# Agent Side

## Check Show on Homepage Status
 1. Open the user’s [admin dashboard](https://pixieset.com/user/admin/)
 2. Navigate to the **Collections** tab
 3. Click into the relevant collection
 4. Scroll to **Show on Homepage** to confirm the setting status (either *‘Show’* or *‘Hide’*)

## Check Folder Visibility
 - From the **Collections** tab, click into the **Parent Folder**
 - Review the folder’s visibility settings to confirm if it appears on the homepage


######################
DESIGN SETTINGS
######################

# Overview
 - Pixieset provides customizable design options that allow users to personalize each collection’s appearance.
 - This helps photographers create unique, brand-forward experiences tailored to their clients.

# User Side

## Accessing Design Settings
 - Go to **Collection > Design Tab**, or click the **Cover Photo > Change Cover**.
 - Preview panel on the right shows Desktop/Mobile toggle.

## Design Options

### Cover
 - Users can choose the preferred **Cover Design** and select a photo or video.
 - Learn more: [Photo Cover](https://www.notion.so/Photo-Cover-7d5a780345f44786a2afaed9663c7369?pvs=21)

### Typography
 - Select from available **font packs** to match branding or client preferences.
 - Preview updates in real time in the collection design panel.
💡 Typography changes do **not** apply to older Cover Photo templates (any after the “None” option).

### Color
 - Choose from preset **color palettes** to match brand/client identity.
 - Selection affects gallery background, text, and highlights.

### Grid
 - **Grid Style:**
    • *Vertical* emphasizes portrait orientation
    • *Horizontal* emphasizes landscape orientation
 - **Thumbnail Size** and **Grid Spacing:**
    • Controls image size and spacing within the gallery
 - **Navigation Style:**
    • Choose between *Icons Only* or *Icons & Text*

### Mobile Access
 - On mobile, go to **≡ > Design Icon** on the collection dashboard.
 - All design options are available, but preview is not shown due to screen size.

# End Client Side

## Client-Facing Design Effects

### Typography
 - Affects all visible text in the client collection:
   • Cover, navigation, and Print Store text reflect selected font

### Color
 - The selected palette affects the overall mood and tone:
   • Light, dark, subtle, and brand-aligned palettes available

### Grid Style
 - Adjusts layout emphasis:
   • *Vertical* = portrait-focused
   • *Horizontal* = landscape-focused

### Thumbnail Size
 - Affects size of preview images shown to clients:
   • Choose between *Regular* or *Large*

### Grid Spacing
 - Controls spacing between images:
   • *Regular* or *Large* spacing options

### Navigation Style
 - Defines how clients navigate the collection:
   • *Icons Only* for minimal UI
   • *Icons & Text* for improved accessibility
💡 *Icons & Text* may help less tech-savvy clients (e.g. elderly relatives) understand the interface more easily.

# Agent Side

## Reviewing Design Settings
 1. Go to the [admin dashboard](https://pixieset.com/user/admin/)
 2. Navigate to the **Collections** tab
 3. Click into the relevant collection
 4. Scroll to the **Design** section to review the following:
   • Cover Design
   • Typography
   • Color Palette
   • Grid Style
   • Thumbnail Size
   • Grid Spacing
   • Navigation Style

######################
DESIGN → PHOTO COVER
######################

# Overview
 - The Cover Photo is the first visual clients see when entering a collection.
 - Users can select a standout image to create a strong first impression.
💡 To use a video instead, see: [Video Cover](https://www.notion.so/Video-Cover-daa7fefe28a6414aac79fbccf7268a01?pvs=21)

# User Side

## Setting a Cover Photo

### Option 1: Use a Photo from the Collection
 - From the **main Collection view**:
   1. Click the **(…)** icon on a photo or use the toolbar
   2. Select **Set Cover**
 - From the **Design Tab**:
   1. Click **Cover Photo** at the top of the Cover section
   2. Select a photo from the collection and click **Select**

💡 Any watermark applied to a selected photo will also appear on the cover.

### Option 2: Upload a New Image
 - Go to the **Design Tab > Cover** or click the Cover preview
 - Click **Cover Photo > Upload**
 - Choose an image from your computer to set as the new cover

## Cover Photo Design
 - Under the **Cover** section in the **Design Tab**, users can pick from available layout designs.
 - Preview updates in real-time on the right
 - Selecting **None** removes the cover from the collection view but retains it in:
   • Share emails
   • Client Gallery Homepage (if shown there)

💡 To reuse preferred design settings, update or create a [Collection Preset](https://www.notion.so/Presets-559d7634d7bc4aa6a6bdd91cd62de0dc?pvs=21) under the **Design** section.

## Focal Point
 - Users can customize the crop focus:
   1. Go to **Design Tab > Cover > Focal**
   2. Drag the focal point to the desired spot
   3. Click outside the modal to save

## Mobile
 - Access by going to **≡ > Design Icon > Cover** in the top right corner
 - Cover photo settings are available, but the live preview is not shown on mobile

# End Client Side

 - The selected Cover Photo will be visible at the top of the client’s collection gallery.

# Agent Side

## Reviewing Cover Settings
 1. Log in to [admin dashboard](https://pixieset.com/user/admin/) and open the user’s account
 2. Go to **Collections**, select the relevant collection
 3. Scroll to view cover photo settings
 4. Click **View** to open and download the image file (right-click > Save Image As...)

 ######################
DESIGN → VIDEO COVER
######################

# Overview
 - Pixieset users can add a **Video Cover** to enhance the visual impact of their collections.
 - Embedded videos play in a loop without sound by default and can be played fullscreen with audio.
 - Videos must be embedded via **YouTube** or **Vimeo**—uploaded videos are not supported.

# User Side

## Adding a Video Cover

1. Go to **Collection > Design Tab > Cover**
2. Click **More** under the default Cover Options to view Video Covers
3. Select a **Video Cover** marked with a camera icon
4. Click **Set Video** and enter a valid YouTube or Vimeo URL in the modal
5. (Optional) Check the box to add a different video for fullscreen playback

💡 You cannot upload video files directly—only embedded URLs from YouTube or Vimeo are supported.

## Setting a Mobile Cover Photo

 - The **Cover Photo** will replace the video on mobile devices and act as the preview when sharing the collection URL.
 - To set this:
   • Go to **Design Tab > Set Cover**
   • Choose an existing image or upload a new one
 - Learn more: [Photo Cover](https://www.notion.so/Photo-Cover-7d5a780345f44786a2afaed9663c7369?pvs=21)

## Uploading Tips

### YouTube:
 - Use a **Public** or **Unlisted** video
 - Ensure **embedding is enabled**
 - Avoid overlay ads to minimize distractions
 - Use the standard YouTube share URL

### Vimeo:
 - Use a **Public**, **Unlisted**, or **Hidden but Embeddable** video
 - Make sure **embedding is enabled**
 - Use the Vimeo share URL

# End Client Side

 - Video Cover settings will reflect immediately in the client’s gallery
 - Clients will see either:
   • A background video on loop, or
   • A fullscreen player when “Play Video” is clicked (if enabled)

# Agent Side

## Reviewing Video Cover Settings

1. Log into the [admin dashboard](https://pixieset.com/user/admin/)
2. Navigate to the **Collections** tab
3. Select the relevant collection
4. Scroll to view current **Video Cover** configuration

######################
SHARING A COLLECTION
######################

# Overview
 - Pixieset provides built-in tools for users to share collections with clients via email, direct link, QR code, or social media.
 - Sharing options are accessible from both the collection view and the dashboard.

# User Side

## Accessing Share Options
 - Click **(…) > Share** from the collection thumbnail on the dashboard
 - Or use the **Share** button within the collection (top right)

💡 Users can send a collection to up to **15 email addresses** at once.

## Share by Email

### Email Content
 - Editable in the left-side panel
 - Preview updates in real time on the right
 - Optional fields to include in the email:
   • Collection Password
   • Download PIN
   • Expiry Date
   • Client Private Password
 - Users can send themselves a copy by checking a box after clicking **Send**

### Email Templates
 - Click **Insert Email Template** to load a saved template
 - Users can also manage templates from the [Email Templates page](https://www.notion.so/Email-Templates-b551e6de6476446fb4ce427e4e9d0b1d?pvs=21)

### Email Designs
 - 4 visual themes available via **More > Choose theme**:
   • Classic
   • Night
   • Heart
   • Blossom

### Email History
 - View all sent share emails via **More > View Email History**
 - Details include:
   • Recipient email, subject, status, and send date
💡 Users can view a guide to email delivery statuses [here](https://help.pixieset.com/hc/en-us/articles/115003769012-My-client-has-not-received-their-Email-Invite)

## Share via Direct Link

 - Click **Share > Get Direct Link** to copy the URL
 - Collection Password, Download PIN, and Client Private Password (if enabled) will appear for quick copy
 - Copy buttons are available for easy sharing

### Social Sharing
 - Share collections directly to:
   • Facebook
   • Twitter/X
   • Pinterest

## Share via QR Code

 - Click **Share > Get QR Code** to generate a QR image
 - Can be downloaded as a PNG file
💡 QR Codes are tied to the current collection URL. If the URL slug or username changes, the code will stop working and must be re-generated.

# End Client Side

## Email
 - Clients receive emails from **mailer@pixiesetmail.com**
 - Emails include any passwords or PINs added by the user
 - If a client replies, the message is sent to the user's contact email

# Agent Side

## Reviewing Shared Email Delivery

1. Go to [admin dashboard](https://pixieset.com/user/admin/) > **View Email History**
2. Search the client’s email address using CMD + F
3. Review:
   • **Email Type:** Look for "Collection Share"
   • **Record ID:** Collection identifier
   • **Email / Subject / Status / Created At**
   • **Opened:** Yes/No
   • **Reject Reason:** e.g., spam, bad_mailbox
      - For spam: Recommend client add **mailer@pixiesetmail.com** to Safe Senders
      - For bad_mailbox: TL may need to unblock manually in Mandrill

💡 Email opened ≠ collection viewed. Enable [Email Registration](https://www.notion.so/Email-Registration-6e9d10bbdb334d8d8b38a8ec421815a7?pvs=21) to track collection access instead.

######################
ERRORS → ERROR 7156
######################

## What is Error 7156?
 - Error 7156 may occur when a user attempts to share a collection via email through the Pixieset dashboard.

## When Does It Occur?

There are 3 primary scenarios where this error appears:

1. **Repeated Characters in Email List**
   • If the email list contains too many recipients with identical starting characters (e.g., 8+ emails that begin with the same letter), it may trigger spam protection.
   • Suggested actions:
     - Break emails into smaller batches (e.g., 5 recipients at a time)
     - Share using a third-party tool (e.g., Mailchimp)
     - Send the collection to themselves and forward manually

2. **Email Sending Limit Reached (Free Users)**
   • Free plan users can send a limited number of emails per day.
   • Suggested actions:
     - Upgrade to a paid Pixieset plan
     - Use an external email marketing tool

3. **Unverified Account Email**
   • New users who haven’t confirmed their email address will be blocked after sending 10 emails.
   • Suggested action:
     - Verify/activate the Pixieset account email

💡 Even after confirming their account, Free users will still be subject to daily email limits.

## Key Reminders

 - This error is part of Pixieset's anti-abuse system to prevent misuse of the email sharing feature.
 - Do **not disclose the exact reason or internal logic** behind the error (e.g., matching character counts or 24-hour rolling windows).
 - When assisting users:
   • Be vague but helpful
   • Recommend general best practices such as sending smaller batches or using external tools
   • Encourage them to confirm their email address if unverified

 ######################
CLIENT GALLERY HOMEPAGE
######################

# Overview
 - The **Client Gallery Homepage** is a customizable landing page that displays all of a user’s **published, non-hidden collections** in one place.
 - It can serve as a portfolio hub and includes options to show:
   • Photographer’s logo
   • Business/contact info
   • Social media links
 - The page can be made public or [password-protected](https://www.notion.so/Homepage-Privacy-db7890bcb03f4f6f8828e060ba16e1e9?pvs=21)

# User Side

## Accessing Homepage Settings
 - Go to **Client Gallery > Homepage** to configure homepage visibility and layout
 - Click **My Homepage** (top right) to preview the live page in a new tab

## Features
 - Customize what is shown:
   • Collection thumbnails
   • Logo and branding
   • Business information and links
 - Users can control homepage visibility (Public or Password-Protected)
 - Hidden or unpublished collections will not appear

# End Client Side

 - Clients visiting the homepage will see a grid of collections along with any additional branding or messaging configured by the user
 - This can act as a professional storefront or proofing portal, depending on user preference

# Agent Side

## Accessing the Client Gallery Homepage

1. In the [admin dashboard](https://pixieset.com/user/admin/), go to the user’s account
2. Click the URL next to **Username** to open their Client Gallery Homepage
3. If an error page is shown:
   - Check **Homepage Enabled** status in admin
     • **Yes** = Homepage is active and should load properly
     • **No** = Homepage is disabled and an error is expected
################
HOME PAGE INFO
################

# Overview
 - Users can choose what business and contact info to display publicly on their **Client Gallery homepage**
 - Displayed information is pulled from the user’s [Profile section](https://pixieset.com/account/profile/)
 - All entries are optional — if left blank, they will not appear on the homepage

# User Side

## Accessing Homepage Info
 - Go to **Client Gallery > Homepage**
 - Scroll to the **Homepage Info** section
 - Users can toggle which elements they want shown

## Display Options (if filled in via Profile)
 - 📖 **Biography**: Custom message or business intro
 - 🔗 **Social Links**: Facebook, Instagram, etc.
 - ✉️ **Contact Email**: Shows contact email if added, otherwise defaults to account email
 - ☎️ **Phone Number**
 - 🏠 **Business Address**
 - 🌐 **Website**: Defaults to homepage URL if left blank

💡 Info can be edited anytime via **Profile icon > Profile**

# End Client Side

 - Info shown here is public and will appear at the bottom of the homepage
 - Interactions:
   • Clicking email opens default mail app
   • Clicking phone prompts call (on supported devices)
   • Social/website links open in a new tab
   • Address links to Google Maps in a new tab

# Agent Side

1. Go to [admin dashboard](https://pixieset.com/user/admin/)
2. Scroll to view **Homepage Info** section
3. Review:
   - What display options are enabled
   - Which contact email is listed (contact vs. account email)
  
################
HOMEPAGE PRIVACY
################

# Overview
 - Users can choose to make their **Client Gallery homepage** public or private by setting a password
 - Collections can still have individual passwords regardless of homepage privacy

# User Side

## Setting a Homepage Password
 - Go to **Client Gallery > Homepage**
 - The **Homepage Password** section is at the top
 - Enter a custom password, or click **Generate** for a random one
 - Changes save automatically when clicking outside the field (toast confirmation shown)

### UI Options
 - Click the **Eye icon** to toggle visibility of the password field (Show/Hide)
 - Password can be changed or cleared at any time

# End Client Side

 - Visitors to a password-protected homepage will be prompted to enter the password
 - Incorrect password attempts will trigger an error message

# Agent Side

1. Open the user’s account in the [admin dashboard](https://pixieset.com/user/admin/)
2. Scroll down to the **Homepage Password** section to:
   - View if a password has been set
   - Review the value if needed (shown encrypted in admin)

#######################
HOMEPAGE ORGANIZATION
#######################

# Overview
 - Users can choose the display order of their **published, non-hidden collections** on the **Client Gallery homepage**
 - This does not affect the internal dashboard view order (see: Dashboard Management)

# User Side

## Accessing Sort Settings
 - Go to **Client Gallery > Homepage**
 - Scroll to the **Collection Sort Order** section at the bottom
 - Click the dropdown to select from these options:
   - Created (New —> Old)
   - Created (Old —> New)
   - Name (A —> Z)
   - Name (Z —> A)

💡 If **Category Tags** are enabled, clients can also filter the homepage view based on those tags — learn more [here](https://www.notion.so/Category-Tags-381f2c2f16fc4742b473cca80af9f359?pvs=21)

# End Client Side

 - Visitors to the Client Gallery homepage will see collections displayed in the sort order selected by the user
 - If **Category Tags** are present, they’ll appear as filter buttons at the top of the page
 - Filtering helps clients quickly narrow down collections by type, year, or other tags

# Agent Side

1. Open the user’s account in the [admin dashboard](https://pixieset.com/user/admin/)
2. Scroll down to the **Collection Homepage Order** section
   - Review the selected display order for their collections

   ###########################
HOMEPAGE → DASHBOARD MANAGER
###########################

# Overview
 - Users can customize how **collections are displayed in their internal dashboard** for personal organization
 - This does **not** affect the public-facing homepage view

# User Side

## Accessing the Sort Options
 - Navigate to [Client Gallery > Collections](https://galleries.pixieset.com/collections)
 - Click the **Sort icon** on the top right of the dashboard
 - Select from the available sort options for internal viewing preferences

# End Client Side

 - This setting **only affects the user’s internal dashboard view**
 - It does **not** influence how collections are shown to clients on the Client Gallery homepage

# Agent Side

 - This is a user-facing dashboard preference
 - It is **not visible or accessible from the admin dashboard**

 ####################
LOGO & BRANDING
####################

# Overview
 - Upgraded Client Gallery or Suite users can upload a **custom logo** for branding purposes
 - Logos appear on the **Client Gallery homepage**, **collection share emails**, and in the **Gallery Cover**

# User Side

## Access Location
 - Go to [Client Gallery > Settings > Branding](https://galleries.pixieset.com/settings)

## Logo Upload
 - Click the **plus symbol** to upload a logo (PNG with transparent background recommended)
 - Used for branding in homepage & client emails

## Gallery Cover Logo
 - Upload manually or click **Use auto-generated logo**
 - Displayed in full-screen gallery view
 - Light/white logo with transparent background works best

💡 Best practices:
 - Avoid overly detailed logos
 - Recommend trimming negative space in the logo file if display is off
 - Be sensitive to how suggestions about logo design are communicated

# End Client Side

## Logo Display
 - Shown on the Client Gallery homepage and in emails (desktop & mobile views)

## Gallery Cover Logo
 - Appears on desktop/mobile full-screen gallery covers

# Agent Side

 - In [admin dashboard](https://pixieset.com/user/admin/), scroll to **Logo & Branding Images**
 - View/download both logo and gallery cover logo
 - Note will indicate if logo is **auto-generated**
 - Hover over logos to download them

 ####################
FAVICON
####################

# Overview
 - Upgraded Client Gallery or Suite users can upload a **custom favicon**
 - The favicon is a small icon shown in the browser tab when visiting the Client Gallery or collections
 - Helps maintain consistent brand presence

# User Side

## Access Location
 - Go to [Client Gallery > Settings > Branding](https://galleries.pixieset.com/settings)
 - Click the **plus symbol** under Favicon to upload a file

## File Requirements
 - Accepts: PNG, GIF, ICO
 - Max dimensions: 32x32px

💡 If the favicon does not appear:
 - The browser may have cached the old Pixieset favicon
 - Instruct user to **clear cookies and cache**
 - If bookmarked, they may need to **delete and re-save** the bookmark

# End Client Side

## Favicon Display
 - Shown in browser tabs when viewing:
   - Client Gallery homepage
   - Individual collection pages

# Agent Side

 - In the [admin dashboard](https://pixieset.com/user/admin/), scroll to **Logo & Branding Images > Favicon**
 - Hover over uploaded favicon to **download** the file

 
####################
PIXIESET BRANDING TOGGLE
####################

# Overview
 - Users on upgraded Client Gallery or Suite plans can **hide the “Powered by Pixieset”** message
 - Helps maintain a clean, branded experience for clients

# User Side

## Access Location
 - Go to [Client Gallery > Settings > Branding](https://pixieset.com/collection/settings/)
 - Scroll to **Pixieset Branding**
 - Toggle **On** to show branding or **Off** to hide it

# End Client Side

## Branding Placement
 - When enabled, “Powered by Pixieset” will appear at the bottom of:
   - The Client Gallery homepage
   - Each individual collection page

# Agent Side

 - In the [admin dashboard](https://pixieset.com/user/admin/), scroll to **Pixieset Branding**
 - Field values:
   - 1 = branding **enabled**
   - 0 = branding **disabled**

   ####################
LIGHTROOM PLUGIN INSTALL & SETUP
####################

# Overview
 - Users on any plan can install the **Pixieset Lightroom Plugin**
 - Enables direct upload from Lightroom Classic to Pixieset Client Gallery
 - Available from:
   1. [pixieset.com > Plugins](https://pixieset.com/tools/)
   2. [Client Gallery > Settings > Integrations > Lightroom Plugin](https://galleries.pixieset.com/settings/integrations)

# User Side

## Install Instructions

1. Download the plugin
2. Extract the .zip file to get Pixieset.lrplugin
3. **Move the file** to a safe, permanent folder (e.g. Documents)
4. Open **Lightroom Classic > File > Plugin Manager**
5. Click **Add**, select Pixieset.lrplugin, click **Add Plug-in**
6. Click **Done**

## Setup Instructions

1. In Lightroom Classic > left panel > **Publish Services > Set Up**
2. Enter Pixieset login credentials under **Pixieset Account > Login**
3. Optional: Configure the following settings:
   - **Pixieset Sync**: Syncs collection/set structure (no photos)
   - **File Settings**: Plugin upload limit = **50MB per image**
   - **Image Sizing**: Resize/resolution export preferences
   - **Output Sharpening**: Screen/paper-type sharpening options
4. Click **Save**
5. To edit later: right-click the Pixieset service > **Edit Settings**

💡 **Note**: To upload files over 50MB (up to 100MB), export manually and upload via browser instead.

# End Client Side

# Agent Side

 - Go to [admin dashboard](https://pixieset.com/user/admin/) > **View Apps**
 - Shows:
   - Whether plugin is **installed**
   - Date/time of **authorization**
 - Useful for:
   - Troubleshooting upload/setup issues
   - Understanding how a user uploads their images
 - ⚠️ Do **not** click Delete All or Delete buttons

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