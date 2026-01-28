// Listen for extension installation or update
chrome.runtime.onInstalled.addListener(function(details) {
  console.log('GUC Downloader: onInstalled triggered', details.reason);
  
  if (details.reason === 'update') {
    console.log('Update detected from version:', details.previousVersion);
    
    // Open welcome page to show new features
    chrome.tabs.create({
      url: 'welcome.html'
    });
    
    // Mark that user has been notified about v1.3
    chrome.storage.sync.set({ hasSeenV13Update: true });
    
  } else if (details.reason === 'install') {
    console.log('Fresh install detected');
    
    // Open welcome page for new users
    chrome.tabs.create({
      url: 'welcome.html'
    });
    
    // Set default preferences for new users
    chrome.storage.sync.set({
      removeCourseNameFromFile: false,
      removeParenthesesFromCourseName: true,
      removeNumberPrefix: false,
      hasSeenV13Update: true
    });
  }
});
