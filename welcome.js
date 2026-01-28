document.getElementById('openSettings').addEventListener('click', function() {
  if (chrome.runtime && chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    // Fallback: open options.html directly
    window.open('options.html', '_blank');
  }
});
