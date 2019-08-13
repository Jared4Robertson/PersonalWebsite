var root_url ="http://comp426.cs.unc.edu:3001/"
var airports;
var airport_names = [];
var flight_num = 420420;
var login_name;
var First_Name;
var Last_Name;
var instances;
var flights;
var age;
var yup;
var existing_flight_num=825646;

$(document).ready(()=>{
    var Bar = function(a, b) {
        if (a > b) {
          this.a = a-b;
          this.m1 = function() {
            return this.b * a;
          };
        } else {
          this.b = b-a;
          this.m2 = function() {
            return this.a / b;
          };
        }
      }
      
      Bar.prototype.a = 3;
      Bar.prototype.b = 5;
      Bar.prototype.m1 = function() {
        return this.a * this.b;
      }
      Bar.prototype.m2 = function() {
        return this.a / this.b;
      }
      var Foo = function(a, b) {
        this.a = a;
        this.b = b;
        Bar.prototype.a = a + b;
        Bar.prototype.b = a - b;
        Bar.prototype.m1 = Bar.prototype.m2;
        Bar.prototype.m2 = function() {
          return this.a * a + this.b * b;
        }
      }
      
      Foo.prototype.m1 = Bar.prototype.m1;
      Foo.prototype.m2 = Bar.prototype.m2;
      
      o1 = new Bar(1, 5); o2 = new Foo(2, 3);
      o3 = new Bar(5, 1); o4 = new Foo(3, 2);
      
      r1 = o1.m1(); r2 = o1.m2(); r3 = o2.m1();
      r4 = o3.m1(); r5 = o3.m2();
     yup   = document.getElementById('pop');
    $(document).on("click",".login_button",function(){
        build_login_page();
      });
    $(document).on("click",".yuh_button",function(){
        build_pilot_page();
      });
    $(document).on("click",".home_button",function(){
        build_home_page();
      });
    $(document).on("click",".pass_log",function(){
        build_passenger_page();
      });
    $(document).on("click",".pilot_log",function(){
        build_pilot_page();
      });
    $(document).on("click",".twitter_log",function(){
        build_twitter_page();
      });
    $(document).on("click","#login_btn",function(){
        check_login();
      });
    $(document).on("click","#Search_btn",function(){
        show_results();
      });
    $(document).on("click",".flight_div",function(){
        book_flight(this);
    });
    $.ajax(root_url + 'sessions',
    {
        type: 'POST',
        xhrFields: {withCredentials: true},
        data:{
        "user": {
            username: "jaredrob",
            password: "730093312"
        }
        },
        success: () => {
        },
        error: () => {
        }
    });
    $.ajax(root_url + '/airports',
    {
        type: 'GET',
        xhrFields: {withCredentials: true},
        success: (response) => {
            airports=response;
            for(i=0;i<airports.length;i++){
                airport_names.push(airports[i].name);
            }
        },
        error: () => {
        }
    });
    $.ajax(root_url + '/flights',
    {
        type: 'GET',
        xhrFields: {withCredentials: true},
        success: (response) => {
            flights=response;
            // for(i=0;i<flights.length;i++){
            //     airport_names.push(airports[i].name);
            // }
        },
        error: () => {
        }
    });
})
login_name = "guest";
let pilot_boolean = false;
let logged_in = false;
let log_label = "Log in";

function build_home_page (){
    $("body").empty();
    add_navbar();
    add_homepage();   
    $("body").append(yup);
}
function build_passenger_page(){
    $('body').empty();
    add_navbar();
    add_passpage();
}    
function build_pilot_page(){
    $("body").empty();
    add_navbar();
    add_pilotpage();
}
function build_twitter_page(){
    $("body").empty();
    add_navbar();
    add_twitterpage();
}
function build_login_page(){
    $('body').empty();
    log_label="Log in";
    login_name="guest";
    logged_in=false;
    add_navbar();
    add_loginpage();
}
function add_twitterpage() {
    $('body').append('<div class = background_div></div>');
    $('.background_div').append('<div class = base_div_pilot></div>');
    $('.base_div_pilot').append('<div class="">\
    <div class = "title2">Popular Tweets</div><br>\
    <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Fluber is a great company!<br>..and deserves an A :)</p>&mdash; Austin Redenbaugh (@aredenbaugh11) <a href="https://twitter.com/aredenbaugh11/status/1072213457502646275?ref_src=twsrc%5Etfw">December 10, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\
    </div>');
}
function add_navbar(){
    $('body').append('<div id="navbar_div">\
    <a class = "home_button">FLUBER</a>\
    <a class = "pass_log">Passenger</a>\
    <a class = "pilot_log">Pilot</a>\
    <a class = "twitter_log">Twitter</a>\
    <a class = "login_button">'+log_label+'</a>\
    <a class = "user">'+login_name+'</a>\
</div>')
}

function add_homepage(){
    $('body').append( $('body').append('<div id="Passenger_login_div"> \
    <div class = "Advertisement"><br>Fly The Way <br> You Want</div>\
        <div class="button_holder1">Find and Book a Flight<br><br><br><br> \
        <div class = "blue_button pass_log">Passenger</div></div>\
        <div class = "button_holder2">Captain an Aircraft<br><br><br><br>\
        <div class = "blue_button pilot_log">Pilot</div></div>\
      </div>\
      <div id="mesg_div"></div>\
      <div id="Pilot_login_div">\
      </div>'))
}

function add_passpage(){
    if(logged_in){
        pilot_boolean=false;
        add_pass_div();
    }
    else{
        pilot_boolean = false;
        build_login_page();
    }
}

function add_pilotpage(){
    if(logged_in){
        pilot_boolean=true;
        add_pilot_div();
        
    }
    else{
        pilot_boolean=true;
        build_login_page();
    }
}

function add_loginpage(){
    $('body').append('<div class = "background_div3"></div>')
    $('.background_div3').append('<div class="login_div">Log into to Fluber<br>\
    <input type="text" tabindex="3" class = "textbox" id="login_user" placeholder = "Username"><br>\
    <input type="password" tabindex="2" class = "textbox" id="login_pass" placeholder = "Password"><br>\
    <button tabindex="1" id="login_btn">Log in</button>\
    <div id ="mesg_div"</div>\
  </div>')
}
function check_login(){
    let user = $('#login_user').val();
    let pass = $('#login_pass').val();
    if(user.toLowerCase()=="jaredrob"){
        if(pass.toLowerCase()=="7"){
            login_name="Jared";
            logged_in = true;
            first_name = "Jared";
            last_name ="Robertson";
            age=21;
            flight_num=0;

        }
    }
    else if(user.toLowerCase()=="tin"){
        if(pass.toLowerCase()=="730093313"){
            login_name="Tin";
            logged_in=true;
            first_name = "Austin";
            last_name ="Redenbaugh";
            age=20;
        }
    }
    else{
        $('#mesg_div').html("Login failed. Try again.");
    }
    if(logged_in){
    log_label = "Log out";    
    console.log(user);
    if(pilot_boolean){
        build_pilot_page();
    }
    else{
        build_passenger_page();
    }
}
}
function add_pilot_div(){
    
    $('body').append('<div class = background_div></div>');
    $('.background_div').append('<div class = base_div_pilot></div>');
    $('.base_div_pilot').append('<div class="">\
    <div class = "title">Create and Captain a Flight</div><br>\
    <input type="text" class = "textbox searchbox" id="from" placeholder = "Flying From">\
    <input type="text" class = "textbox searchbox" id = "to"  placeholder = "Flying To"><br>\
    <input type="time" class = "textbox searchbox d_time" id = "departure">\
    <text class="depart_text">- Departure Time</text><br>\
    <input type="time" class = "textbox searchbox a_time" id = "arrival">\
    <text class="depart_text">- Arrival Time</text><br>\
    <input type="date" class = "textbox searchbox d_date" id = "date">\
    <text class="depart_text">- Date</text><br>\
    <button id="Search_btn">Create</button>\
    <div id ="mesg_div"</div>\
  </div>')
  autocomplete(document.getElementById("from"), airport_names);
  autocomplete(document.getElementById("to"), airport_names);
}
function add_pass_div(){
    $('body').append('<div class = background_div2></div>');
    $('.background_div2').append('<div class = base_div_passenger></div>');
    $('.base_div_passenger').append('<div class="">\
    <div class = "title">Find a Flight</div><br>\
    <input type="text" class = "textbox searchbox" id="from" placeholder = "Flying From">\
    <input type="text" class = "textbox searchbox" id = "to" placeholder = "Flying To"><br>\
    <input type="date" class = "textbox searchbox" id = "departure" placeholder = "Departure"><br>\
    <button id="Search_btn">Search</button>\
    <div id ="mesg_div"</div>\
  </div>');
  autocomplete(document.getElementById("from"), airport_names);
  autocomplete(document.getElementById("to"), airport_names);

}
function show_results(){
    let flight;
    if(pilot_boolean){
        create_pilot_shit()
    }
    else{
    
    let body;
    let from = $('#from').val();
    let to = $('#to').val();
    let departure = $('#departure').val();
    
    let is_date=(!departure=="")

    for(i=0;i<airports.length;i++){
         if(airport_names[i].toUpperCase()==to.toUpperCase()){
             to_id =airports[i].id;
         }
         if(airport_names[i].toUpperCase()==from.toUpperCase()){
            from_id =airports[i].id;
        }
        }

    $.ajax(root_url + '/flights?filter[departure_id]='+from_id+'&filter[arrival_id]='+to_id,
	       {
		   type: 'GET',
           xhrFields: {withCredentials: true},
		   success: (response) => {
               flight=response;
               if(is_date){
                   b=flight.length;
               date_filter(flight);
           }
           else{
           fill_div(flight);}

        },
		   error: () => {
		   }
           });
    if (pilot_boolean){
        body = $(".background_div");
    }
    else{
        body = $(".background_div2");
    }
    body.empty();
    function date_filter(flight){
        let realflight=[];
        $.ajax(root_url + '/instances?filter[date]='+departure,
	       {
		   type: 'GET',
           xhrFields: {withCredentials: true},
		   success: (response) => {
               instances=response;
               let instances_id=[];
               
               for(j=0;j<instances.length;j++){
                   instances_id.push(instances[j].flight_id)
               }
               for(k=0;k<flight.length;k++){
                if(instances_id.includes(flight[k].id)){
                    realflight.push(flight[k]);
                   

                }
            }
            fill_div(realflight);
               
               
    

        },
		   error: () => {
		   }
           });

    }
    function fill_div(flight){
        body.append('<div id="flight_Title">Book Your Flight...</div>');
        body.append('<div id="flight_div_holder"></div>');
        for(let i=0;i<flight.length;i++){
            $('#flight_div_holder').append('<div id ="'+flight[i].id+'"class="flight_div" flight='+flight[i]+'></div>');
            $('#'+flight[i].id).append('<div id ="number'+flight[i].id+'"class="flight_number_div">Flight Number: '+flight[i].number+'</div>');
            let date = departure.slice(5,7)+"/"+departure.slice(8,10)+"/"+departure.slice(2,4);
            $('#'+flight[i].id).append('<div id ="Date'+flight[i].id+'"class="flight_date_div">'+date+'</div>');
            
            let depart_from = flight[i].departure_id;
            let arrive_to = flight[i].arrival_id;
            let a_pid;
            let d_pid;
                for(j=0;j<airports.length;j++){
                    if(airports[j].id==arrive_to){
                          a_pid = airports[j].code;
                        }
                    if(airports[j].id==depart_from){
                        d_pid = airports[j].code;
                        }
                    }
        
        
            $('#'+flight[i].id).append('<div id ="Date'+flight[i].id+'"class="flight_from-to_div">'+d_pid+' to '+a_pid+'</div>');






            //$('#'+flight[i].id).append('<div id ="Date'+flight[i].id+'"class="flight_date_div">'+flight[i].code+' to '+'</div>');
            let airline = flight[i].info;
            if(airline==""){
                airline ="Jared";
            }
        
            let departure_time = flight[i].departs_at.slice(11,19);
            departure_time=convert_time(departure_time);
            let arrival_time = flight[i].arrives_at.slice(11,19);
            arrival_time = convert_time(arrival_time);
            
            $('#'+flight[i].id).append('<div id ="Time'+flight[i].id+'"class="flight_time_div">'+departure_time+" - "+arrival_time+'</div>');
        }
    }

}
}

function create_pilot_shit() {
    let d_time = $('.d_time')[0].value;
    let a_time = $('.a_time')[0].value;
    let d_date = $('.d_date')[0].value;
    let depart_from = document.getElementById("from").value;
    let arrive_to = document.getElementById("to").value;
    let d_id = 0;
    let a_id = 0;
    let bool = false;
    let existing_flight_id;

    for(i=0;i<airports.length;i++){
        if(airport_names[i].toUpperCase()==arrive_to.toUpperCase()){
            a_id =airports[i].id;
        }
        if(airport_names[i].toUpperCase()==depart_from.toUpperCase()){
           d_id =airports[i].id;
        }
    }

    for (i=0; i<flights.length; i++) {
        if (flights[i].departs_at.slice(11,16) == d_time) {
            if (flights[i].arrives_at.slice(11,16) == a_time) {
                if (flights[i].departure_id == d_id) {
                    if (flights[i].arrival_id == a_id) {
                        bool = true;
                        existing_flight_id=flights[i].id;
                        existing_flight_num=flights[i].number;
                    }
                }
            }
        }
    }
    if (bool) {
        $.ajax(root_url + '/instances',
        {
            type: 'POST',
            xhrFields: {withCredentials: true},
            data:{
                "instance":
                {"flight_id":existing_flight_id,
                "date":d_date,
                "is_cancelled":true,
                "info":null,"user_id":null,
                "created_at":null,
                "updated_at":null
                }

            
            },
                success: (response) => {
                    create_confirm_pilot_flight_div();
                },
            error: () => {
            }
         });
    
    }
    else {
        $.ajax(root_url + '/flights',
	       {
		   type: 'POST',
           xhrFields: {withCredentials: true},
           data:{
            "flight": {
                "departs_at":   d_time,
                "arrives_at":   a_time,
                "number":       flight_num,
                "departure_id": d_id,
                "arrival_id":   a_id,
                "info": "Captain " + login_name
            }},
		   success: (response) => {
                existing_flight_num=flight_num;
               create_instance(response,d_date);
               create_confirm_pilot_flight_div();
               
            },
		   error: () => {
		   }
        });
        
    }
}
function create_instance(response,d_date){
    $.ajax(root_url + '/instances',
	        {
		    type: 'POST',
            xhrFields: {withCredentials: true},

            data:{
                "instance":
                {
                "flight_id":response.id,
                "date":d_date,
                "is_cancelled":true,
                "info":null,"user_id":null,
                "created_at":null,
                "updated_at":null
                }

            
            },
		    success: (response) => {
                
                flight_num++;
                
            },
		    error: () => {
		    }
        });
}
function create_confirm_pilot_flight_div() {
    let d_pid = "ABC";
    let a_pid = "123";
    // let d_lat = 0;
    // let d_long = 0;
    // let a_lat = 0;
    // let a_long = 0;
    let d_time = $('.d_time')[0].value;
    let a_time = $('.a_time')[0].value;
    let d_date = $('.d_date')[0].value;
    let depart_from = document.getElementById("from").value;
    let arrive_to = document.getElementById("to").value;
    for(i=0;i<airports.length;i++){
        if(airport_names[i].toUpperCase()==arrive_to.toUpperCase()){
            a_pid = airports[i].code;
            // a_lat = airports[i].latitude;
            // a_long = airports[i].longitude;
        }
        if(airport_names[i].toUpperCase()==depart_from.toUpperCase()){
            d_pid = airports[i].code;
            // d_lat = airports[i].latitude;
            // d_long = airports[i].longitude;
        }
    }

    body = $(".background_div");
    body.empty();
    $('body').append('<div class = background_div></div>');
    $('.background_div').append('<div class = base_div_pilot></div>');
    $('.base_div_pilot').append('<div class="">\
    <div class = "title">Have a nice flight captain.</div><br>\
    <div class = base_div_pilot2>\
    <br><text class="depart_text2">Flight #'+existing_flight_num+'</text><br><br>\
    <text class="depart_text2">'+d_pid+' to '+a_pid+'</text><br>\
    <text class="depart_text2">'+d_date+'</text><br>\
    <text class="depart_text2">Depart: '+d_time+'</text><br>\
    <text class="depart_text2">Arrive: '+a_time+'</text><br>\
    <text class="depart_text2">Flight Confirmed.</text>\
    </div>\
    <br><button class = "yuh_button">Add Another Flight</button>\
    </div>');
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        $(this).after(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].toUpperCase().indexOf(val.toUpperCase())> -1) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = arr[i].substr(0,arr[i].toUpperCase().indexOf(val.toUpperCase()));
            b.innerHTML += "<strong>" + arr[i].substr(arr[i].toUpperCase().indexOf(val.toUpperCase()), val.length) + "</strong>";
            b.innerHTML += arr[i].substr(arr[i].toUpperCase().indexOf(val.toUpperCase())+val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  function convert_time(time){

    time = time.split(':'); // convert to array

    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
    } else if (hours > 12) {
    timeValue= "" + (hours - 12);
    } else if (hours == 0) {
    timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
    timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
    return timeValue.slice(0,4)+timeValue.slice(7,13);
  }

  function book_flight(flight_div){
    $.ajax(root_url + '/tickets',
    {
    type: 'POST',
    xhrFields: {withCredentials: true},
    data:{
            "ticket": {
              "first_name":   first_name,
              "middle_name":  "",
              "last_name":    last_name,
              "age":          age,
              "gender":       "male",
              "is_purchased":  true,
              "price_paid":   "290.11",
            },
    success: (response) => {
        build_confirm_ticket(flight_div)
     },

 },
    error: () => {
    }
});
  }
function build_confirm_ticket(flight){
    body = $(".background_div2");
    body.empty();
    $('body').append('<div class = background_div></div>');
    $('.background_div2').append('<div class = base_div_pilot></div>');
    $('.base_div_pilot').append('<div class="">\
    <div class = "title">Booking Confirmed.</div><br>\
    <div class = base_div_pass2>\
    </div>\
    <br><button class = "pass_log yup">Book Another Flight</button>\
    </div>');
    $(".base_div_pass2").append('<div class = "ticket"><strong>Ticket</strong><br>\
        First Name:   '+first_name+'<br>\
        Last Name:    '+last_name+'<br>\
        Age:          '+age+'<br>\
        Gender:       Male<br>\
        Date:         '+$(flight).find( ".flight_date_div").text()+'<br>\
        Time:         '+$(flight).find( ".flight_time_div").text()+'<br>\
        '+$(flight).find( ".flight_number_div").text()+'<br>\
        From-To:         '+$(flight).find( ".flight_from-to_div").text()+'<br>\
        </div>');



}