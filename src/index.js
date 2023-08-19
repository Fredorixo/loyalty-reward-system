import data from "./data.js"

const buttons = document.getElementsByClassName("dashboard--menu--icons")
const displayTitle = document.getElementById("dashboard--display--title")
const displayContent = document.getElementById("dashboard--display--content")

let id = "ONE"

function createDataItem(dataItems) {
    dataItems.forEach(dataItem => {
        const item = document.createElement("div")
        item.classList.add("dashboard--display--content--item")

        const imageOne = document.createElement("span")
        imageOne.classList.add("material-symbols-outlined")
        imageOne.textContent = `${dataItem.image}`
        
        const paraOne = document.createElement("p")
        paraOne.appendChild(imageOne)
        item.appendChild(paraOne)

        const paraTwo = document.createElement("p")
        paraTwo.textContent = dataItem.name
        item.appendChild(paraTwo)
        
        const paraThree = document.createElement("p")

        if("method" in dataItem && !("param" in dataItem)) {
            const input = document.createElement("input")
            paraThree.appendChild(input)
        } else {
            const imageTwo = document.createElement("span")
            imageTwo.classList.add("material-symbols-outlined")
            imageTwo.textContent = dataItem.currency
            paraThree.append(imageTwo, ` ${dataItem.value}`)
        }

        item.appendChild(paraThree)

        if("action" in dataItem) {
            const button = document.createElement("button")
            button.textContent = dataItem.action
            button.addEventListener("click", async () => {
                if(dataItem.action === "Switch") {
                    id = dataItem.id
                }

                if("method" in dataItem) {
                    let param

                    if(dataItem.method === "setPoints") {
                        const input = document.querySelector("input")
                        param = input.value
                    } else {
                        param = dataItem.param
                    }

                    const query = `method=${dataItem.method}&param=${param}&id=${id}`
                    await fetch(`/.netlify/functions/transaction?${query}`)
                }
            })
    
            item.appendChild(button)
        }

        displayContent.appendChild(item)
    })
}

function deleteDataItem() {
    while(displayContent.hasChildNodes()) {
        displayContent.removeChild(displayContent.lastChild)
    }
}

Array.from(buttons).forEach(button => {
    button.addEventListener("click", async () => {
        const key = button.textContent.trim()
        displayTitle.textContent = data[key].title.toUpperCase()
        deleteDataItem()

        if(data[key].title === "wallet" || data[key].title === "home") {
            const dataItem = data[key].data[0]
            const query = `method=${dataItem.method}&param=${dataItem.param}&id=${id}`
            const res = await fetch(`/.netlify/functions/transaction?${query}`)

            if(res.status === 200) {
                const value = await res.json()
                data[key].data[0].value = value
            } else {
                data[key].data[0].value = undefined
            }
        }

        else if(data[key].title === "history") {
            const res = await fetch(`/.netlify/functions/get-history?id=${id}`)
            const points = await res.json()
            const list = document.createElement("ul")

            points.forEach(point => {
                const listItem = document.createElement("li")

                if(point >= 0) {
                    listItem.textContent = `A sum of ${point} points were added to your account`
                } else {
                    listItem.textContent = `${-point} points were deducted from your account`
                }

                list.appendChild(listItem)
            })

            displayContent.appendChild(list)
        }

        createDataItem(data[key].data)
    })
})