function loadXMLFile(xmlFile) {
    
    xmlhttp = new XMLHttpRequest();

    //load the xml fileand return an XML object
    xmlhttp.open("GET", xmlFile, false);
    xmlhttp.send();
    return(xmlhttp.responseXML);



}


let nextItem = 0; // index of item added
let currentCart = new Array(); // contains current items cart




function loadXMLFile(fileName) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", fileName, false);
    xhttp.send();
    return xhttp.responseXML;
}

function displayBooks() {
    // Load the XML file that contains the information for all the books
    var xmlDoc = loadXMLFile("books.xml");

    // Construct a table that contains the key information for all the books
    var txt = "<table border='0px' id='tblBook' cellpadding='3px' cellspacing='0px'>";
    txt += "<tr><th>Item</th><th>Title</th><th>Author</th><th>Price</th><th>Add</th></tr>";

    // Retrieve all the BOOK elements from the XML file
    var books = xmlDoc.documentElement.getElementsByTagName("BOOK");
    for (var i = 0; i < books.length; i++) {
        txt += "<tr>";

        txt += "<td align='left'>" + (i + 1) + "</td>";
        var bookChildren = books[i].getElementsByTagName("TITLE");
        txt += "<td align='left' id='title" + i + "'>" + bookChildren[0].firstChild.nodeValue + "</td>";

        bookChildren = books[i].getElementsByTagName("AUTHOR");
        txt += "<td align='left'>" + bookChildren[0].firstChild.nodeValue + "</td>";

        bookChildren = books[i].getElementsByTagName("PRICE");
        txt += "<td align='left' id='price" + i + "'>" + bookChildren[0].firstChild.nodeValue + "</td>";

        txt += "<td align='right'><img src='book-icon.jpg'/></td>";
        txt += "<td align='right'><button type='button' id='btnAddToCart' onclick='addToCart(" + i + ")'>Add to Cart</button></td>";

        txt += "</tr>";
    }
    txt += "</table>";

    // Display book table in <div id='txtBookInfo'>
    document.getElementById("txtBookInfo").innerHTML = txt;
}

window.onload = function () {
    displayBooks();
    displayCart();
}


function displayCart() {
    // Construct shopping cart table heading
    var txt = "<table id='tblCart' border='5px' cellpadding='1px' cellspacing='0px' align='center' style='margin:0px;border:#606 solid;'>";
    txt += "<tr><th>Item</th><th>Title</th><th>Price</th><th>Quantity</th></tr>";

    var totalCost = 0;

    // Construct shopping cart table body
    for (var i = 0; i < nextItem; i++) {
        txt += "<tr>";

        txt += "<td align='left'>" + currentCart[i][0] + "</td>";
        txt += "<td align='left'>" + currentCart[i][1] + "</td>";
        txt += "<td align='left'>" + currentCart[i][2] + "</td>";
        txt += "<td align='right'>" + currentCart[i][3] + "</td>";

        totalCost += currentCart[i][2] * currentCart[i][3];

        txt += "</tr>";
    }

    // Display the total cost
    txt += "<td align='center' colspan='4' style='color:#900;'> Total Cost: " + parseFloat(totalCost).toFixed(2) + "</td>";

    // Close shopping cart table
    txt += "</table>";

    // Display shopping cart table in <div id='txtCart'>
    document.getElementById("txtCart").innerHTML = txt;
}

function addToCart(selectedItem) {
    let addedIndex = -1;

    // Check if the selected item has been added once
    for (i = 0; i < nextItem; i++) {
        if (currentCart[i][0] == selectedItem) {
            // The selected item has been added once, record the index
            addedIndex = i;
            break; // stop looping
        }
    }

    // If the selected item has not been added, add a new item to the shopping cart,
    // otherwise, simply increase the quantity for the item by one.
    if (addedIndex == -1) {
        // Create a new item in the shopping cart
        currentCart[nextItem] = new Array();

        // Put the item details into the shopping cart
        currentCart[nextItem][0] = selectedItem;
        currentCart[nextItem][1] = document.getElementById("title" + selectedItem).innerHTML;
        currentCart[nextItem][2] = document.getElementById("price" + selectedItem).innerHTML;
        currentCart[nextItem][3] = 1; // set the quantity

        // Get ready to add next item
        nextItem += 1;
    } else {
        currentCart[addedIndex][3] += 1;
    }

    // Refresh the shopping cart
    displayCart();
}



function clearCart() {

    nextItem = 0;
    currentCart = new Array();

    displayCart();


}


function checkOut() {

    txt = "<ITEMS>";


    for (i = 0; i < nextItem; i ++) {

        txt = txt + "<ITEM>";
        txt = txt + "<TITLE>" + currentCart[i][1] + "</TITLE>";
        txt = txt + "<PRICE>" + currentCart[i][2] + "</PRICE>";
        txt = txt + "<QUANTITY>" + currentCart[i][3] + "</QUANTITY>";
        txt = txt + "</ITEM>";


}

txt = txt + "</ITEMS>";


parser = new DOMParser();
xmlDoc = parser.parseFromString(txt, "text/xml");

xmlhttp = new XMLHttpRequest();

let url="ProcesingOrder.php?XMLStr=" + txt;
xmlhttp.open("GET", url, false);
xmlhttp.send(null);

clearCart();

}