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