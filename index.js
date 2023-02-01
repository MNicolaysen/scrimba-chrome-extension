let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function() {
    deleteBtn.textContent = "CONFIRM DELETE"
    deleteBtn.style.color="red"
    deleteBtn.style.border="1px solid red"

      deleteBtn.addEventListener("click", function() {
        localStorage.clear()
        myLeads = []
        render(myLeads)
        resetBtn()
      })
})

function resetBtn() {
  deleteBtn.textContent = "DELETE ALL"
  deleteBtn.style.color="#ff9400"
  deleteBtn.style.border="1px solid #ff9400"
}

inputBtn.addEventListener("click", function() {
    for (i = 0; i < myLeads.length; i++) {
      if (inputEl.value != myLeads[i]) {
          myLeads.push(inputEl.value)
          inputEl.value = ""
          localStorage.setItem("myLeads", JSON.stringify(myLeads) )
          render(myLeads)
      } else if (inputEl.value === myLeads[i]) {
          alert("This link already exists")
      }
    }
   window.location.reload()
})
