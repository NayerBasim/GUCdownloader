// Load saved options when the popup opens
document.addEventListener('DOMContentLoaded', function() {
  restoreOptions();
  checkFirstTimeUser();
});

// Add change listeners to all checkboxes for auto-save
document.getElementById('removeCourseNameFromFile').addEventListener('change', autoSaveOptions);
document.getElementById('removeParenthesesFromCourseName').addEventListener('change', autoSaveOptions);
document.getElementById('removeNumberPrefix').addEventListener('change', autoSaveOptions);

// Reset button
document.getElementById('reset').addEventListener('click', resetOptions);

// Full options button
document.getElementById('fullOptions').addEventListener('click', function() {
  chrome.runtime.openOptionsPage();
});

function autoSaveOptions() {
  const removeCourseNameFromFile = document.getElementById('removeCourseNameFromFile').checked;
  const removeParenthesesFromCourseName = document.getElementById('removeParenthesesFromCourseName').checked;
  const removeNumberPrefix = document.getElementById('removeNumberPrefix').checked;
  
  chrome.storage.sync.set(
    {
      removeCourseNameFromFile: removeCourseNameFromFile,
      removeParenthesesFromCourseName: removeParenthesesFromCourseName,
      removeNumberPrefix: removeNumberPrefix
    },
    function() {
      // Show success message briefly
      showStatus('Saved!', 'success');
    }
  );
}

function restoreOptions() {
  chrome.storage.sync.get(
    {
      removeCourseNameFromFile: false,
      removeParenthesesFromCourseName: true,
      removeNumberPrefix: false
    },
    function(items) {
      document.getElementById('removeCourseNameFromFile').checked = items.removeCourseNameFromFile;
      document.getElementById('removeParenthesesFromCourseName').checked = items.removeParenthesesFromCourseName;
      document.getElementById('removeNumberPrefix').checked = items.removeNumberPrefix;
    }
  );
}

function resetOptions() {
  // Reset all checkboxes to false
  document.getElementById('removeCourseNameFromFile').checked = false;
  document.getElementById('removeParenthesesFromCourseName').checked = false;
  document.getElementById('removeNumberPrefix').checked = false;
  
  // Save the reset settings
  chrome.storage.sync.set(
    {
      removeCourseNameFromFile: false,
      removeParenthesesFromCourseName: false,
      removeNumberPrefix: false
    },
    function() {
      // Show success message
      showStatus('Reset to default!', 'success');
    }
  );
}

function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = 'status ' + type;
  status.style.display = 'block';
  
  setTimeout(function() {
    status.style.display = 'none';
  }, 2000);
}

function checkFirstTimeUser() {
  chrome.storage.sync.get(['hasSeenV13Update'], function(result) {
    if (!result.hasSeenV13Update) {
      // Show welcome message
      showStatus('🎉 New! Customize file naming below', 'success');
      
      // Mark as seen
      chrome.storage.sync.set({ hasSeenV13Update: true });
      
      // Keep message visible longer for first-time users
      setTimeout(function() {
        const status = document.getElementById('status');
        status.style.display = 'none';
      }, 5000);
    }
  });
}
