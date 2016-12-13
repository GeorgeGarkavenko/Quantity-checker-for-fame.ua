
 var sizes_table = {
  "40":"XS",
  "42":"S",
  "44":"M",
  "46":"L",
  "48":"XL",
  "50":"2XL",
  "52":"3XL",
  "54":"4XL" };

 $( document ).ready( signUpArticles ); 

function signUpArticles() {
 
 var all_elements = document.getElementsByClassName("tovar-one"); 
 var base_url = "http://www.fame.ua";

 var title = document.getElementsByTagName("title")[0];
 
 for(var i = 0; i < all_elements.length; i++) {
  var current_element = all_elements[i];
  
  
  deleteItem(current_element.getElementsByClassName("foto-icon")[0]);
  deleteItem(current_element.getElementsByClassName("price")[0]);
  
  var current_title = current_element.getElementsByClassName("title")[0];
  var current_name = current_title.getElementsByTagName("span")[0];
  deleteItem(current_title);
  
  
  var tale_url = current_element.getElementsByTagName("a")[0].getAttribute("href");
  
  var product_url = base_url + tale_url;
  
  var foto = current_element.getElementsByClassName("foto")[0];
  var article = /(\d{7})\d[.]jpg/.exec(foto.getAttribute("rel"))[1];

  title.innerHTML = article;
  
  current_element.innerHTML += "<div>" +
   article + ": " +
   current_name.textContent +
   "<br/><br/>" +
   getArticleQuantitys(product_url) +
   "</div>";

 }
 title.innerHTML = "Articles: " + all_elements.length;
}


function getArticleQuantitys(page_url) {
 var request = new XMLHttpRequest();

 request.open("GET", page_url, false);

 request.send();  

 if(request.status == 200) {
  var position_page = document.createElement( "html" );
  position_page.innerHTML = request.responseText;

  var sizes_element = position_page.getElementsByClassName( "size" )[0]; 
  var sizes = sizes_element.getElementsByTagName( "a" ); 
  var result = "";
  
  for(var i = 0; i < sizes.length; i++) {
   var size_name = sizes_table[sizes[i].textContent];
   if (sizes[i].getAttribute("class") == "select") {
    result += size_name + " ";
   } else {
    result += "<b>" + size_name + "</b> ";
   }
  }
  return result;
 } else {
 return "Load error";
 }
}

function deleteItem(item) { 
 item.parentNode.removeChild(item); 
}