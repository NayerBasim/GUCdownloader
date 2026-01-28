// Load saved options when the page loads
document.addEventListener('DOMContentLoaded', restoreOptions);

// Save options when the save button is clicked
document.getElementById('save').addEventListener('click', saveOptions);

// Reset options when the reset button is clicked
document.getElementById('reset').addEventListener('click', resetOptions);

function saveOptions() {
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
      // Show success message
      showStatus('Settings saved successfully!', 'success');
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
      showStatus('Settings reset to default!', 'success');
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
  }, 3000);
}
