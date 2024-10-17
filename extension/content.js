try {
  console.log("GUC downloader working");
  const title = document.getElementById(
    "ContentPlaceHolderright_ContentPlaceHoldercontent_LabelCourseName"
  );

  const courseNameRaw = title.innerText;
  const regex = /\(.*?\)/;
  const match = courseNameRaw.match(regex);
  const courseName = match ? match[0] : courseNameRaw;

  const buttons = document.querySelectorAll(".contentbtn");
  buttons.forEach((button) => {
    let attribute_id = button.getAttribute("data-contentid");
    string = "#" + "content" + attribute_id;
    let firstGrandchild = document.querySelectorAll(string);
    let buttonContent = firstGrandchild[0].innerText;
    let title = courseName + " " + buttonContent;
    button.setAttribute("download", title);
  });
} catch (e) {
  console.log("Sorry Something went wrong");
}
