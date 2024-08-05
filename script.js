var flight_information = []; // the flights information of that day 
var name_municipality_list = {} ; //store the name and municipality from the code
let index_count = 0;                                //for the purpose of the expandtion of the button
let first_index = -1;                                //to mark the index that the output started on 

function showDisplay(){

    var flights_talbe = document.getElementById("flights_table");
    output = "";
    flight_information.forEach(flight => {

        output += "<div class='information_box'>";

        output += "<span> Flight No.: ";
        flight[1].forEach( flight_no => {

            output += flight_no + ' ';

        }) 
        output += "</span>";

        output += "Schedule Time: " + flight[0];

        output += "</div>";

    })
    flights_talbe.innerHTML = output;
    console.log("output done");

}

//get the incformation of the flights of that day
//also for the initialization for the web page
fetch("iata.json").then( async response => {

    await response.json().then( codes => {

        codes.forEach( code => { name_municipality_list[code.iata_code] = [code.municipality, code.name]; })
        console.log("iata done");

    })

    await fetch( "depart-20230301.json" ).then( response => {    //"flight.php?date=2023-03-01&lang=en&cargo=false&arrival=flase"

        response.json().then( schedules => {
    
            schedules.forEach( schedule => {
    
                let flight_no = [];            //tmp storage for flight no
                let tmp_destination = [];      //tmp storage for destination
                schedule.list.forEach( flight_time => {

                    flight_time.flight.forEach( airline => { flight_no.push(airline.no); })  //to store the flight bumber in to the list
    
                    flight_time.destination.forEach( dst => {tmp_destination.push(dst)} )    //to store the destination into the list
    
                    flight_information.push([flight_time.time, flight_no, tmp_destination, flight_time.status, flight_time.terminal, flight_time.aisle, flight_time.gate, schedule.date]);
                    flight_no = [];
                    tmp_destination = [];
    
                })
                
            })

            var flights_talbe = document.getElementById("flights_table");
            output = "";
            let ten_flight_count = 0;
            flight_information.forEach(flight => {

                index_count++;

                const currTime = new Date();
                var currYear = 2023; 
                var currMonth = 3;    
                var currDate = 1;      
                var currHour = 11;
                var currMin = 10;

                if( parseInt(flight[7].substr(0, 4)) < currYear || parseInt(flight[7].substr(5, 2)) < currMonth || parseInt(flight[7].substr(8, 2)) < 1){ return }   //date just for testing
                if( parseInt(flight[0].substr(0, 2)) < currHour ){ return }
                if( parseInt(flight[0].substr(0, 2)) == currHour && parseInt(flight[0].substr(3, 2)) < currMin ){return}
                if( ten_flight_count >= 10 ){return}
                if( first_index == -1 ){ first_index = index_count - 1; }

                output += "<div class='information_box'>";
        
                output += "<span class='item1'><b>Flight No.: </b>";
                flight[1].forEach( flight_no => { output += flight_no + ' '; }) 
                output += "</span>";
        
                output += "<span class='item2'><b>Schedule Time: </b>" + flight[0] + " </span>";

                output += "<span class='item3'><b>Destination(Airport): </b>";
                for(let i = 0; i < flight[2].length; i++){ output += name_municipality_list[flight[2][i]][0] + "(" + name_municipality_list[flight[2][i]][1] + ") "; }
                output += "</span>";
                
                output += "<span class='item4'><b>Terminal: </b>" + flight[4] + " </span>"
                output += "<span class='item5'><b>Aisle: </b>" + flight[5] + " </span>"
                output += "<span class='item6'><b>Gate: </b>" + flight[6] + " </span>"
                output += "<span class='item7'><b>Status: </b>" + flight[3] + " </span>"

                output += "</div>";

                ten_flight_count++;
        
            })
            flights_talbe.innerHTML = output;
            console.log("output done");
            console.log("depart done");
    
        })
        
    })

})

//add the eventListener for the "departure-arrival" switch button
let switchButton = document.getElementById("switch_button");
switchButton.addEventListener("change", SwitchDepAri);
function SwitchDepAri(){

    if(switchButton.checked){

        flight_information = [];     //reset the informarion in flight_infomration, and fetch all things again

        fetch( "arrival-20230301.json" ).then( response => { 
            let count = 0

            response.json().then( schedules => {
        
                schedules.forEach( schedule => {
        
                    let flight_no = [];            //tmp storage for flight no
                    let tmp_origin = [];      //tmp storage for origin
                    schedule.list.forEach( flight_time => {
    
                        flight_time.flight.forEach( airline => { flight_no.push(airline.no); })  //to store the flight bumber in to the list
        
                        flight_time.origin.forEach( ori => {tmp_origin.push(ori)} )    //to store the destination into the list
        
                        flight_information.push([flight_time.time, flight_no, tmp_origin, flight_time.status, flight_time.stand, flight_time.hall, flight_time.baggage, schedule.date]);
                        console.log(flight_information[count])
                        count++
                        flight_no = [];
                        tmp_origin = [];
        
                    })
                    
                })
    
                //initailize the index_count and first_index
                index_count = 0;
                first_index = -1;

                var flights_talbe = document.getElementById("flights_table");
                output = "";
                let ten_flight_count = 0;
                flight_information.forEach(flight => {
    
                    index_count++;
    
                    const currTime = new Date();
                    var currYear = 2023; 
                    var currMonth = 3;    
                    var currDate = 1;      
                    var currHour = 11;
                    var currMin = 10;
    
                    if( parseInt(flight[7].substr(0, 4)) < currYear || parseInt(flight[7].substr(5, 2)) < currMonth || parseInt(flight[7].substr(8, 2)) < 1){ return }   //date just for testing
                    if( parseInt(flight[0].substr(0, 2)) < currHour ){ return }
                    if( parseInt(flight[0].substr(0, 2)) == currHour && parseInt(flight[0].substr(3, 2)) < currMin ){return}
                    if( ten_flight_count >= 10 ){return}

                    if( first_index == -1 ){ first_index = index_count - 1; }
    
                    output += "<div class='information_box'>";
            
                    output += "<span class='item1'><b>Flight No.: </b>";
                    flight[1].forEach( flight_no => { output += flight_no + ' '; }) 
                    output += "</span>";
            
                    output += "<span class='item2'><b>Schedule Time: </b>" + flight[0] + " </span>";
    
                    output += "<span class='item3'><b>Origin(Airport): </b>";
                    for(let i = 0; i < flight[2].length; i++){ output += name_municipality_list[flight[2][i]][0] + "(" + name_municipality_list[flight[2][i]][1] + ") "; }
                    output += "</span>";
                    
                    output += "<span class='item4'><b>Parking Stand: </b>" + flight[4] + " </span>"
                    output += "<span class='item5'><b>Hall: </b>" + flight[5] + " </span>"
                    output += "<span class='item6'><b>Belt: </b>" + flight[6] + " </span>"
                    output += "<span class='item7'><b>Status: </b>" + flight[3] + " </span>"
    
                    output += "</div>";
    
                    ten_flight_count++;
            
                })
                flights_talbe.innerHTML = output;
                console.log("output done");
                console.log("depart done");
        
            })
            
        })


    }

    else{
        flight_information = [];     //reset the informarion in flight_infomration, and fetch all things again

        fetch( "depart-20230301.json" ).then( response => { 
            let count = 0

            response.json().then( schedules => {
        
                schedules.forEach( schedule => {
        
                    let flight_no = [];            //tmp storage for flight no
                    let tmp_destination = [];      //tmp storage for destination
                    schedule.list.forEach( flight_time => {
    
                        flight_time.flight.forEach( airline => { flight_no.push(airline.no); })  //to store the flight bumber in to the list
        
                        flight_time.destination.forEach( dst => {tmp_destination.push(dst)} )    //to store the destination into the list
        
                        flight_information.push([flight_time.time, flight_no, tmp_destination, flight_time.status, flight_time.terminal, flight_time.aisle, flight_time.gate, schedule.date]);
                        console.log(flight_information[count])
                        count++
                        flight_no = [];
                        tmp_destination = [];
        
                    })
                    
                })
    
                //initailize the index_count and first_index
                index_count = 0;
                first_index = -1;

                var flights_talbe = document.getElementById("flights_table");
                output = "";
                let ten_flight_count = 0;
                flight_information.forEach(flight => {
    
                    index_count++;
    
                    const currTime = new Date();
                    var currYear = 2023; 
                    var currMonth = 3;    
                    var currDate = 1;      
                    var currHour = 11;
                    var currMin = 10;
    
                    if( parseInt(flight[7].substr(0, 4)) < currYear || parseInt(flight[7].substr(5, 2)) < currMonth || parseInt(flight[7].substr(8, 2)) < 1){ return }   //date just for testing
                    if( parseInt(flight[0].substr(0, 2)) < currHour ){ return }
                    if( parseInt(flight[0].substr(0, 2)) == currHour && parseInt(flight[0].substr(3, 2)) < currMin ){return}
                    if( ten_flight_count >= 10 ){return}
                    if( first_index == -1 ){ first_index = index_count - 1; }
    
                    output += "<div class='information_box'>";
            
                    output += "<span class='item1'><b>Flight No.: </b>";
                    flight[1].forEach( flight_no => { output += flight_no + ' '; }) 
                    output += "</span>";
            
                    output += "<span class='item2'><b>Schedule Time: </b>" + flight[0] + " </span>";
    
                    output += "<span class='item3'><b>Destination(Airport): </b>";
                    for(let i = 0; i < flight[2].length; i++){ output += name_municipality_list[flight[2][i]][0] + "(" + name_municipality_list[flight[2][i]][1] + ") "; }
                    output += "</span>";
                    
                    output += "<span class='item4'><b>Terminal: </b>" + flight[4] + " </span>"
                    output += "<span class='item5'><b>Aisle: </b>" + flight[5] + " </span>"
                    output += "<span class='item6'><b>Gate: </b>" + flight[6] + " </span>"
                    output += "<span class='item7'><b>Status: </b>" + flight[3] + " </span>"
    
                    output += "</div>";
    
                    ten_flight_count++;
            
                })
                flights_talbe.innerHTML = output;
                console.log("output done");
                console.log("depart done");
        
            })
            
        })

    }

}

// add the eventListener to the "Load Early Flights" button
let early_flight_button = document.getElementById("early_flight_button");
early_flight_button.addEventListener("click", Laod_early_flight);
function Laod_early_flight(){

    var flights_talbe = document.getElementById("flights_table");
    output = ""
    for( let i = 0; i < first_index ; i++ ){

        output += "<div class='information_box'>";
        
        output += "<span class='item1'><b>Flight No.: </b>";
        flight_information[i][1].forEach( flight_no => { output += flight_no + ' '; }) 
        output += "</span>";

        output += "<span class='item2'><b>Schedule Time: </b>" + flight_information[i][0] + " </span>";

        if( switchButton.checked ){ output += "<span class='item3'><b>Origin(Airport): </b>"; }
        else{output += "<span class='item3'><b>Destination(Airport): </b>";}
        for(let dstCode = 0; dstCode < flight_information[i][2].length; dstCode++){ output += name_municipality_list[flight_information[i][2][dstCode]][0] + "(" + name_municipality_list[flight_information[i][2][dstCode]][1] + ") "; }
        output += "</span>";
        
        if( switchButton.checked ){

            output += "<span class='item4'><b>Parking Stand: </b>" + flight_information[i][4] + " </span>"
            output += "<span class='item5'><b>Hall: </b>" + flight_information[i][5] + " </span>"
            output += "<span class='item6'><b>Belt: </b>" + flight_information[i][6] + " </span>"

        }

        else{
            
            output += "<span class='item4'><b>Terminal: </b>" + flight_information[i][4] + " </span>"
            output += "<span class='item5'><b>Aisle: </b>" + flight_information[i][5] + " </span>"
            output += "<span class='item6'><b>Gate: </b>" + flight_information[i][6] + " </span>"
            
        }
        output += "<span class='item7'><b>Status: </b>" + flight_information[i][3] + " </span>"
        output += "</div>";

    }
    flights_talbe.innerHTML = output + flights_talbe.innerHTML;

}

// add the eventListener to the "Load More Flghts" button
let more_flight_button = document.getElementById("more_flight_button");
more_flight_button.addEventListener("click", Laod_more_flight);
function Laod_more_flight(){

    if( first_index+10 > flight_information.length ){ return }

    var flights_talbe = document.getElementById("flights_table");
    output = ""
    for( let i = first_index+10; i < flight_information.length ; i++ ){

        output += "<div class='information_box'>";
        
        output += "<span class='item1'><b>Flight No.: </b>";
        flight_information[i][1].forEach( flight_no => { output += flight_no + ' '; }) 
        output += "</span>";

        output += "<span class='item2'><b>Schedule Time: </b>" + flight_information[i][0] + " </span>";

        if( switchButton.checked ){ output += "<span class='item3'><b>Origin(Airport): </b>"; }
        else{output += "<span class='item3'><b>Destination(Airport): </b>";}
        for(let dstCode = 0; dstCode < flight_information[i][2].length; dstCode++){ output += name_municipality_list[flight_information[i][2][dstCode]][0] + "(" + name_municipality_list[flight_information[i][2][dstCode]][1] + ") "; }
        output += "</span>";
        
        if( switchButton.checked ){

            output += "<span class='item4'><b>Parking Stand: </b>" + flight_information[i][4] + " </span>"
            output += "<span class='item5'><b>Hall: </b>" + flight_information[i][5] + " </span>"
            output += "<span class='item6'><b>Belt: </b>" + flight_information[i][6] + " </span>"

        }

        else{
            
            output += "<span class='item4'><b>Terminal: </b>" + flight_information[i][4] + " </span>"
            output += "<span class='item5'><b>Aisle: </b>" + flight_information[i][5] + " </span>"
            output += "<span class='item6'><b>Gate: </b>" + flight_information[i][6] + " </span>"
            
        }
        output += "<span class='item7'><b>Status: </b>" + flight_information[i][3] + " </span>"
        output += "</div>";

    }
    flights_talbe.innerHTML += output;
    
}

fetch("http://localhost:9080/flight.php?date=2023-02-25&lang=en&cargo=false&arrival=true").then( response => {
    //clear the data in flight_informantion first

    if (response.status == 200){
        console.log("200 passed " + response.status);
        response.json().then( schedules => {
            console.log("json set");

            schedules.forEach( schedule => {

                console.log( schedule.date );

            })

        })

    }

    else{

        console.log("HTTP return status: "+response.status);

    }
    

}

)

