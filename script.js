let element;

function fillSection(sectionName) {
    if (!(sectionName in data)) {
        return;
    }

    let section = document.getElementsByClassName(sectionName)[0];
    for (let i=0; i<data[sectionName].length; i++) {
        let item = data[sectionName][i];
        if (item.display){
            let row = document.createElement("div");
            row.setAttribute("class","tableRow");
            let lCell = document.createElement("div");
            let rCell = document.createElement("div");
            let entry = document.createElement("div");
            entry.setAttribute("class","listEntry");
            lCell.setAttribute("class","tableCell  tableCell-left");
            rCell.setAttribute("class","tableCell");
            
            for (let key in item) {
                if (["where", "date", "journal"].indexOf(key) > -1) {
                    element = document.createElement("p");
                    element.setAttribute("class", key + "Item");
                    element.innerHTML = item[key];
                    lCell.appendChild(element);
                    continue;
                }
                if (item[key] && ["display","url"].indexOf(key) < 0) {
                    element = document.createElement("p");
                    element.setAttribute("class", key + "Item");
                    if (key == "paperTitle") {
                        item[key] = `"${item[key]}"`;
                    }
                    if (item["url"]) {
                        let url = item["url"];
                        element.innerHTML = `<a class="publication" href="${url}" target="blank">${item[key]}<\a>`;
                    } else {
                        element.innerHTML = item[key];
                    }
                    entry.appendChild(element);
                }
            }
            row.appendChild(lCell);
            rCell.appendChild(entry);
            row.appendChild(rCell);
            section.appendChild(row);
        }
    }
}

let specialSections = ["educationList", "experienceList", "several"];
for (let i=0; i<specialSections.length;i++) {
    sectionName = specialSections[i];
    if (document.getElementsByClassName(sectionName).length == 1) {
        fillSection(sectionName);
    }
}


let nodes = document.getElementsByTagName("*");
for (i=0; i<nodes.length; i++) {
    node = nodes[i];
    if (node.id) {
        src = node.id.split("-");
        try {
            content = data[src[0]][src[1]];
            if (content) {
              node.removeAttribute("hidden");
            }
            if (node.localName == "img") {
              node.src = content;
              continue;
            }
            if (node.localName == "a") {
                if (content.indexOf('@') > -1) {
                    node.href = "mailto:"+content;
                } else {
                    node.href = content;
                };
                if (node.innerHTML == "") {
                    node.innerHTML = content;
                }
                continue;
            }
            if (content) {
              node.innerHTML = content;
            }
        }
        catch(error) {
            if (node.id.indexOf('-') > -1) {
                console.log(`<${node.localName}> has an invalid id: "${node.id}"`);
            }
            continue;
        }

    }
}
