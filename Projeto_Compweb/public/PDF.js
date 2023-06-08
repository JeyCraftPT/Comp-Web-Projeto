$( document ).ready(function() {
  const userData = Cookies.get('userData');
  const user = JSON.parse(userData);

  var button1 = document.getElementById("pdfButton1");
  var makepdf1 = document.getElementById("escola");

  if (button1) {
    button1.addEventListener("click", function () {
      console.log("a")
      var mywindow = window.open("", "PRINT", "height=600,width=600");
      document.getElementById("um").style.display= "none"
      mywindow.document.write(makepdf1.innerHTML);
      mywindow.document.close();
      mywindow.focus();
      mywindow.print();
      if (user.username === "sraprof"){
        console.log("a")
        document.getElementById("acti_gym").style.display ="none";
        document.getElementById("acti_home").style.display ="none";
        document.getElementById("um").style.display= "block"
        
      }
      return true;
    });
  }
  

  var button2 = document.getElementById("pdfButton2");
  var makepdf2 = document.getElementById("gym");

  button2.addEventListener("click", function () {
    console.log("b")
    var mywindow = window.open("", "PRINT", "height=600,width=600");
    mywindow.document.write(makepdf2.innerHTML);
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    if (user.username === "jackedpt"){
      console.log("b")
      document.getElementById("acti_school").style.display ="none";
      document.getElementById("acti_home").style.display ="none";
      document.getElementById("dois").style.display= "block"

    }
    return true;
  });

  var button3 = document.getElementById("pdfButton3");
  var makepdf3 = document.getElementById("casa");

  button3.addEventListener("click", function () {
    console.log("c")
    var mywindow = window.open("", "PRINT", "height=600,width=600");
    mywindow.document.write(makepdf3.innerHTML);
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    if (user.username === "srpai"){
      console.log("c")
      document.getElementById("acti_gym").style.display ="none";
      document.getElementById("acti_school").style.display ="none";
      document.getElementById("tres").style.display= "block"

    }
    return true;
  });
});