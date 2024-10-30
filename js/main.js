var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submitButton = document.getElementById("submit");
var currentIndex;
var websiteList = [];
if (JSON.parse(localStorage.getItem("sites")) != null) {
  websiteList = JSON.parse(localStorage.getItem("sites"));
  showData();
} else {
  websiteList = [];
}

submitButton.addEventListener("click", function () {
  addData();
});
function addData() {
  var webSite = {
    name: siteName.value,
    url: siteURL.value,
  };
  websiteList.push(webSite);
  localStorage.setItem("sites", JSON.stringify(websiteList));
  clearForm();
  showData();
}

function showData() {
  var temp = "";
  for (i = 0; i < websiteList.length; i++) {
    temp += ` <tr>
        <td>${i}</td>
        <td>${websiteList[i].name}</td>
        <td>
          <a href="${websiteList[i].url}" target = "_blank">
            <button type="button" class="btn btn-success">
              <i class="fa-solid fa-eye me-2"></i>Visit
            </button>
          </a>
        </td>
        <td>
          <button type="button" onclick = "updateData(${i})" class="btn btn-warning">
            Update
          </button>
        </td>
        <td>
          <button type="button" onclick = "deleteData(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash me-2"></i>Delete
          </button>
        </td>
      </tr>`;
  }
  document.getElementById("tableData").innerHTML = temp;
}

function deleteData(i) {
  websiteList.splice(i, 1);
  localStorage.setItem("sites", JSON.stringify(websiteList));
  showData();
}

function clearForm() {
  siteName.value = "";
  siteURL.value = "";
}

function updateData(i) {
  siteName.value = websiteList[i].name;
  siteURL.value = websiteList[i].url;
  currentIndex = i;
  document.getElementById("submit").classList.remove("z-1");
}

function addUpdatedData() {
  var updatedName = siteName.value;
  var updatedURL = siteURL.value;

  var updatedData = {
    name: updatedName,
    url: updatedURL,
  };

  websiteList.splice(currentIndex, 1, updatedData);

  localStorage.setItem("sites", JSON.stringify(websiteList));
  clearForm();
  showData();
  document.getElementById("submit").classList.add("z-1");
}
