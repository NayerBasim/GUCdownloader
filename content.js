// Helper function to remove parentheses from course name if present
function removeParentheses(courseName) {
  // Check if the string starts with "(|" and contains "|)"
  // Example: "(|CSEN605|)" becomes "CSEN605"
  // Note: The "|" appears as "_" in downloads but is "|" in the HTML
  if (courseName.startsWith("(|") && courseName.includes("|)")) {
    // Remove "(|" from the start and "|)" from anywhere in the string
    let result = courseName.replace(/^\(\|/, ""); // Remove opening "(|"
    result = result.replace(/\|\)/, "");          // Remove closing "|)"
    result = result + " - ";
    return result.trim();
  }
  return courseName;
}

// Helper function to remove leading number and separator from content
function removeLeadingNumber(content) {
  // Check if content starts with a number followed by space and dash or just dash
  // Matches patterns like: "3 - ", "10 - ", "3- ", etc.
  const match = content.match(/^\s*(\d+)\s*-\s*/);
  if (match) {
    return content.substring(match[0].length).trim();
  }
  return content;
}

// Main execution
try {
  console.log("GUC downloader working");
  
  // Load user preferences from storage
  chrome.storage.sync.get(
    {
      removeCourseNameFromFile: false,
      removeParenthesesFromCourseName: true,
      removeNumberPrefix: false
    },
    function (options) {
      const title = document.getElementById(
        "ContentPlaceHolderright_ContentPlaceHoldercontent_LabelCourseName"
      );

      const courseNameRaw = title.innerText;
      const regex = /\(.*?\)/;
      const match = courseNameRaw.match(regex);
      let courseName = match ? match[0] : courseNameRaw;

      // Apply user preferences to course name
      if (options.removeParenthesesFromCourseName) {
        courseName = removeParentheses(courseName);
      }

      const buttons = document.querySelectorAll(".contentbtn");

      buttons.forEach((button) => {
        let attribute_id = button.getAttribute("data-contentid");
        string = "#" + "content" + attribute_id;
        let firstGrandchild = document.querySelectorAll(string);
        let buttonContent = firstGrandchild[0].innerText;

        // Apply user preferences to button content
        if (options.removeNumberPrefix) {
          buttonContent = removeLeadingNumber(buttonContent);
        }

        let fileExtension = button.href ? button.href.split(".").pop() : "";
        
        // Build the title based on user preferences
        let finalTitle;
        if (options.removeCourseNameFromFile) {
          finalTitle = buttonContent + "." + fileExtension;
        } else {
          finalTitle = courseName + " " + buttonContent + "." + fileExtension;
        }
        
        button.setAttribute("download", finalTitle);
      });
    }
  );
} catch (e) {
  console.log("Sorry Something went wrong: " + e.message);
}
